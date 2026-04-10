import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Alert, Animated} from 'react-native';
import {Text, Button, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CameraView, useCameraPermissions} from 'expo-camera';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {scanQRCode, fetchScanStatus, clearScanResult} from '../store/slices/qrSlice';
import {parseQRCodeData} from '../services/qrService';

interface QRScanScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

export function QRScanScreen({navigation}: QRScanScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {isScanning, lastScanResult, scanStatus} = useAppSelector(state => state.qr);

  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);
  const [scanLineAnim] = useState(new Animated.Value(0));

  // Fetch scan status on mount
  useEffect(() => {
    dispatch(fetchScanStatus());
  }, [dispatch]);

  // Animate scan line
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [scanLineAnim]);

  // Handle successful scan result
  useEffect(() => {
    if (lastScanResult?.success) {
      navigation.navigate('QRScanSuccess', {
        pointsEarned: lastScanResult.pointsEarned,
        restaurantName: lastScanResult.restaurantName,
      });
    }
  }, [lastScanResult, navigation]);

  // Handle barcode scanned
  const handleBarcodeScanned = useCallback(
    async ({data}: {data: string}) => {
      if (hasScanned || isScanning) {
        return;
      }

      setHasScanned(true);

      // Parse QR code data
      const payload = parseQRCodeData(data);
      if (!payload) {
        Alert.alert('Invalid QR Code', 'This QR code is not a valid Foodie points code.', [
          {text: 'Try Again', onPress: () => setHasScanned(false)},
        ]);
        return;
      }

      // Scan the QR code
      try {
        await dispatch(scanQRCode(payload)).unwrap();
      } catch (error) {
        // Error handled by Redux, show alert
        Alert.alert('Scan Failed', error as string, [
          {text: 'Try Again', onPress: () => setHasScanned(false)},
        ]);
      }
    },
    [hasScanned, isScanning, dispatch],
  );

  // Reset scan state
  const handleReset = useCallback(() => {
    setHasScanned(false);
    dispatch(clearScanResult());
  }, [dispatch]);

  // Permission not determined yet
  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredContent}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
        </View>
      </SafeAreaView>
    );
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredContent}>
          <Text style={styles.permissionIcon}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionDescription}>
            We need camera access to scan QR codes and earn points.
          </Text>
          <Button mode="contained" onPress={requestPermission} style={styles.permissionButton}>
            Grant Permission
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // Check rate limit
  if (scanStatus && !scanStatus.canScan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredContent}>
          <Text style={styles.limitIcon}>⏰</Text>
          <Text style={styles.limitTitle}>Daily Limit Reached</Text>
          <Text style={styles.limitDescription}>
            You've used all 10 scans for today. Come back tomorrow to scan more codes!
          </Text>
          <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.limitButton}>
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan QR Code</Text>
        {scanStatus && (
          <Text style={styles.remaining}>{scanStatus.remaining} scans remaining today</Text>
        )}
      </View>

      {/* Camera */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={hasScanned ? undefined : handleBarcodeScanned}
        />

        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Top overlay */}
          <View style={styles.overlayTop} />

          {/* Middle section with scan frame */}
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanFrame}>
              {/* Corner decorations */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* Animated scan line */}
              <Animated.View
                style={[styles.scanLine, {transform: [{translateY: scanLineTranslateY}]}]}
              />
            </View>
            <View style={styles.overlaySide} />
          </View>

          {/* Bottom overlay */}
          <View style={styles.overlayBottom} />
        </View>

        {/* Loading overlay */}
        {isScanning && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.text.inverse} />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        )}
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Point your camera at the QR code on your receipt or at the checkout counter
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.actionButton}>
          Cancel
        </Button>
        {hasScanned && !isScanning && (
          <Button mode="contained" onPress={handleReset} style={styles.actionButton}>
            Scan Again
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

const FRAME_SIZE = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  remaining: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  cameraContainer: {
    flex: 1,
    margin: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.primary.freshAvocadoGreen,
    borderWidth: 4,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: colors.primary.freshAvocadoGreen,
    shadowColor: colors.primary.freshAvocadoGreen,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.inverse,
    marginTop: spacing.md,
  },
  instructions: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  instructionText: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  permissionIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  permissionTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  permissionDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  permissionButton: {
    minWidth: 200,
  },
  limitIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  limitTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  limitDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  limitButton: {
    minWidth: 200,
  },
});
