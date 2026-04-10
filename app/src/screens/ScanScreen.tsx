import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Text, Button, ActivityIndicator, SegmentedButtons} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {scanReceipt, clearCurrentScan} from '../store/slices/receiptSlice';

interface ScanScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

type ScanMode = 'receipt' | 'qr';

export function ScanScreen({navigation}: ScanScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {isScanning, scanError} = useAppSelector(state => state.receipt);

  const [scanMode, setScanMode] = useState<ScanMode>('receipt');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Pick image from camera
  const takePhoto = useCallback(async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow camera access to scan receipts.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  }, []);

  // Pick image from gallery
  const pickFromGallery = useCallback(async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow photo library access to select receipts.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  }, []);

  // Handle scan
  const handleScan = useCallback(async () => {
    if (!selectedImage) {
      return;
    }

    try {
      const result = await dispatch(scanReceipt({imageUri: selectedImage})).unwrap();

      if (result.status === 'COMPLETED') {
        navigation.navigate('ReceiptConfirmation', {
          receiptId: result.receiptId,
          pointsEarned: result.pointsEarned,
          restaurantName: result.matchedRestaurant?.name,
        });
      } else if (result.needsReview) {
        navigation.navigate('ReceiptReview', {
          receiptId: result.receiptId,
          extractedData: result.extractedData,
          matchedRestaurant: result.matchedRestaurant,
        });
      }
    } catch {
      // Error is handled by Redux
    }
  }, [selectedImage, dispatch, navigation]);

  // Reset and try again
  const handleReset = useCallback(() => {
    setSelectedImage(null);
    dispatch(clearCurrentScan());
  }, [dispatch]);

  // Navigate to QR scanner
  const openQRScanner = useCallback(() => {
    navigation.navigate('QRScan');
  }, [navigation]);

  // Render receipt scanning options
  const renderReceiptOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.sectionTitle}>Scan Receipt</Text>
      <Text style={styles.sectionDescription}>
        Take a photo of your receipt to earn points automatically
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.optionButton} onPress={takePhoto} activeOpacity={0.8}>
          <Text style={styles.optionIcon}>📷</Text>
          <Text style={styles.optionTitle}>Take Photo</Text>
          <Text style={styles.optionDescription}>Use your camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={pickFromGallery} activeOpacity={0.8}>
          <Text style={styles.optionIcon}>🖼️</Text>
          <Text style={styles.optionTitle}>Choose Photo</Text>
          <Text style={styles.optionDescription}>From your gallery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.historyLink}
        onPress={() => navigation.navigate('ReceiptHistory')}
        activeOpacity={0.8}>
        <Text style={styles.historyLinkText}>View Receipt History</Text>
      </TouchableOpacity>
    </View>
  );

  // Render QR scanning options
  const renderQROptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.sectionTitle}>Scan QR Code</Text>
      <Text style={styles.sectionDescription}>Scan the QR code at checkout for instant points</Text>

      <TouchableOpacity style={styles.qrButton} onPress={openQRScanner} activeOpacity={0.8}>
        <View style={styles.qrIconContainer}>
          <Text style={styles.qrIcon}>📱</Text>
        </View>
        <View style={styles.qrButtonContent}>
          <Text style={styles.qrButtonTitle}>Open QR Scanner</Text>
          <Text style={styles.qrButtonDescription}>
            Point camera at QR code to earn points instantly
          </Text>
        </View>
        <Text style={styles.qrArrow}>→</Text>
      </TouchableOpacity>

      <View style={styles.qrBenefits}>
        <View style={styles.benefitItem}>
          <Text style={styles.benefitIcon}>⚡</Text>
          <Text style={styles.benefitText}>Instant points credit</Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.benefitIcon}>🔒</Text>
          <Text style={styles.benefitText}>Secure & verified</Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.benefitIcon}>📊</Text>
          <Text style={styles.benefitText}>10 scans per day</Text>
        </View>
      </View>
    </View>
  );

  // Render selected image preview
  const renderPreview = () => (
    <View style={styles.previewContainer}>
      <Image source={{uri: selectedImage!}} style={styles.previewImage} />

      {scanError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{scanError}</Text>
        </View>
      )}

      <View style={styles.previewActions}>
        <Button
          mode="outlined"
          onPress={handleReset}
          style={styles.actionButton}
          disabled={isScanning}>
          Retake
        </Button>

        <Button
          mode="contained"
          onPress={handleScan}
          style={styles.actionButton}
          loading={isScanning}
          disabled={isScanning}>
          {isScanning ? 'Scanning...' : 'Scan Receipt'}
        </Button>
      </View>

      {isScanning && (
        <View style={styles.scanningOverlay}>
          <ActivityIndicator size="large" color={colors.text.inverse} />
          <Text style={styles.scanningText}>Analyzing receipt...</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Earn Points</Text>
          <Text style={styles.subtitle}>Scan receipts or QR codes to earn rewards</Text>
        </View>

        {/* Mode Toggle */}
        {!selectedImage && (
          <SegmentedButtons
            value={scanMode}
            onValueChange={value => setScanMode(value as ScanMode)}
            buttons={[
              {value: 'receipt', label: 'Receipt'},
              {value: 'qr', label: 'QR Code'},
            ]}
            style={styles.segmentedButtons}
          />
        )}

        {/* Content */}
        {selectedImage
          ? renderPreview()
          : scanMode === 'receipt'
            ? renderReceiptOptions()
            : renderQROptions()}

        {/* Tips */}
        {!selectedImage && scanMode === 'receipt' && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for best results:</Text>
            <Text style={styles.tipText}>- Make sure the receipt is well-lit and flat</Text>
            <Text style={styles.tipText}>- Include the restaurant name and total amount</Text>
            <Text style={styles.tipText}>- Avoid blurry or cut-off images</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  segmentedButtons: {
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  optionButton: {
    flex: 1,
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  optionTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  optionDescription: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  historyLink: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  historyLinkText: {
    ...textStyles.body,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.freshAvocadoGreen + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  qrIcon: {
    fontSize: 32,
  },
  qrButtonContent: {
    flex: 1,
  },
  qrButtonTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  qrButtonDescription: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  qrArrow: {
    fontSize: 24,
    color: colors.primary.freshAvocadoGreen,
  },
  qrBenefits: {
    gap: spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitIcon: {
    fontSize: 20,
  },
  benefitText: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  previewContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.background.white,
  },
  previewImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    backgroundColor: colors.background.lightGray,
  },
  errorContainer: {
    backgroundColor: colors.status.errorLight,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: 8,
  },
  errorText: {
    ...textStyles.body,
    color: colors.status.error,
    textAlign: 'center',
  },
  previewActions: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    ...textStyles.h3,
    color: colors.text.inverse,
    marginTop: spacing.md,
  },
  tipsContainer: {
    backgroundColor: colors.background.lightGray,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  tipsTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  tipText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
});
