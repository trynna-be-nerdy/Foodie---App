import React, {useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Image, Alert, TouchableOpacity} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Avatar,
  Switch,
  Divider,
  ActivityIndicator,
  Portal,
  Dialog,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {updateUserProfile, uploadUserPhoto, logoutUser} from '../store/slices/userSlice';
import {
  setPushNotificationsEnabled,
  setExpirationAlertsEnabled,
  setPromotionsEnabled,
} from '../store/slices/appSlice';
import {
  checkBiometricAvailability,
  isBiometricEnabled,
  enableBiometric,
  disableBiometric,
  getBiometryTypeName,
} from '../services/biometricService';
import {requestPushPermission} from '../services/notificationService';

export function ProfileScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {user, isLoading} = useAppSelector(state => state.user);
  const {pushNotificationsEnabled, expirationAlertsEnabled, promotionsEnabled} = useAppSelector(
    state => state.app,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricModalVisible, setBiometricModalVisible] = useState(false);
  const [biometricPassword, setBiometricPassword] = useState('');
  const [isBiometricSaving, setIsBiometricSaving] = useState(false);

  // Check biometric availability on mount
  React.useEffect(() => {
    async function checkBiometric() {
      const status = await checkBiometricAvailability();
      setBiometricAvailable(status.available);
      setBiometricType(status.biometryType);

      const enabled = await isBiometricEnabled();
      setBiometricEnabled(enabled);
    }
    checkBiometric();
  }, []);

  const handleImagePick = useCallback(() => {
    Alert.alert('Update Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (permission.status !== 'granted') {
            Alert.alert('Permission required', 'Please allow camera access.');
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: false,
          });

          const asset = result.canceled ? null : result.assets[0];
          if (asset?.uri) {
            try {
              await dispatch(
                uploadUserPhoto({
                  uri: asset.uri,
                  fileName: asset.fileName ?? 'photo.jpg',
                  type: asset.type ?? 'image/jpeg',
                }),
              ).unwrap();
            } catch {
              Alert.alert('Error', 'Failed to upload photo');
            }
          }
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (permission.status !== 'granted') {
            Alert.alert('Permission required', 'Please allow photo library access.');
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: false,
          });

          const asset = result.canceled ? null : result.assets[0];
          if (asset?.uri) {
            try {
              await dispatch(
                uploadUserPhoto({
                  uri: asset.uri,
                  fileName: asset.fileName ?? 'photo.jpg',
                  type: asset.type ?? 'image/jpeg',
                }),
              ).unwrap();
            } catch {
              Alert.alert('Error', 'Failed to upload photo');
            }
          }
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  }, [dispatch]);

  const handleSaveProfile = async () => {
    try {
      await dispatch(
        updateUserProfile({
          name: editName,
          phone: editPhone || null,
        }),
      ).unwrap();
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleBiometricToggle = async (value: boolean) => {
    if (value) {
      setBiometricModalVisible(true);
    } else {
      await disableBiometric();
      setBiometricEnabled(false);
    }
  };

  const handlePushNotificationsToggle = async (value: boolean) => {
    if (value) {
      const granted = await requestPushPermission();
      if (!granted) {
        Alert.alert('Notifications Disabled', 'Enable notifications in system settings.');
        dispatch(setPushNotificationsEnabled(false));
        return;
      }
      dispatch(setPushNotificationsEnabled(true));
      return;
    }
    dispatch(setPushNotificationsEnabled(false));
  };

  const handleBiometricEnableConfirm = async () => {
    if (!user?.email || !biometricPassword) {
      Alert.alert('Missing Password', 'Please enter your password to continue.');
      return;
    }

    setIsBiometricSaving(true);
    const enabled = await enableBiometric({
      email: user.email,
      password: biometricPassword,
    });
    setIsBiometricSaving(false);

    if (!enabled) {
      Alert.alert(
        'Biometric Setup Failed',
        `Unable to enable ${getBiometryTypeName(biometricType)} on this device.`,
      );
      return;
    }

    setBiometricEnabled(true);
    setBiometricPassword('');
    setBiometricModalVisible(false);
  };

  const handleBiometricEnableCancel = () => {
    setBiometricPassword('');
    setBiometricModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Not Logged In</Text>
          <Text style={styles.description}>Please sign in to view your profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImagePick} style={styles.avatarContainer}>
            {user.profilePhoto ? (
              <Image source={{uri: user.profilePhoto}} style={styles.avatar} />
            ) : (
              <Avatar.Text
                size={100}
                label={user.name.charAt(0).toUpperCase()}
                style={styles.avatarPlaceholder}
              />
            )}
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>Edit</Text>
            </View>
          </TouchableOpacity>

          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                label="Name"
                mode="outlined"
                value={editName}
                onChangeText={setEditName}
                style={styles.input}
              />
              <TextInput
                label="Phone"
                mode="outlined"
                value={editPhone}
                onChangeText={setEditPhone}
                keyboardType="phone-pad"
                style={styles.input}
              />
              <View style={styles.editActions}>
                <Button mode="outlined" onPress={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSaveProfile}
                  loading={isLoading}
                  disabled={isLoading}>
                  Save
                </Button>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Button
                mode="outlined"
                onPress={() => {
                  setEditName(user.name);
                  setEditPhone(user.phone || '');
                  setIsEditing(true);
                }}
                style={styles.editButton}>
                Edit Profile
              </Button>
            </>
          )}
        </View>

        <Divider style={styles.divider} />

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          {biometricAvailable && (
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{getBiometryTypeName(biometricType)} Login</Text>
                <Text style={styles.settingDescription}>
                  Use {getBiometryTypeName(biometricType)} for quick login
                </Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={handleBiometricToggle}
                color={colors.primary.freshAvocadoGreen}
              />
            </View>
          )}
        </View>

        <Divider style={styles.divider} />

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Get alerts for expiring points and rewards
              </Text>
            </View>
            <Switch
              value={pushNotificationsEnabled}
              onValueChange={handlePushNotificationsToggle}
              color={colors.primary.freshAvocadoGreen}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Expiration Alerts</Text>
              <Text style={styles.settingDescription}>Remind me when points are expiring soon</Text>
            </View>
            <Switch
              value={expirationAlertsEnabled}
              onValueChange={value => {
                dispatch(setExpirationAlertsEnabled(value));
              }}
              color={colors.primary.freshAvocadoGreen}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Promotions</Text>
              <Text style={styles.settingDescription}>
                Receive special offers and loyalty updates
              </Text>
            </View>
            <Switch
              value={promotionsEnabled}
              onValueChange={value => {
                dispatch(setPromotionsEnabled(value));
              }}
              color={colors.primary.freshAvocadoGreen}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Status</Text>
            <Text
              style={[
                styles.infoValue,
                {color: user.isVerified ? colors.status.success : colors.status.warning},
              ]}>
              {user.isVerified ? 'Verified' : 'Unverified'}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Logout Button */}
        <View style={styles.section}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            textColor={colors.status.error}
            style={styles.logoutButton}>
            Logout
          </Button>
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
        </View>
      )}

      <Portal>
        <Dialog visible={biometricModalVisible} onDismiss={handleBiometricEnableCancel}>
          <Dialog.Title>Enable {getBiometryTypeName(biometricType)}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              autoCapitalize="none"
              value={biometricPassword}
              onChangeText={setBiometricPassword}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleBiometricEnableCancel}>Cancel</Button>
            <Button
              mode="contained"
              onPress={handleBiometricEnableConfirm}
              loading={isBiometricSaving}
              disabled={isBiometricSaving}>
              Enable
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  editBadgeText: {
    color: colors.text.inverse,
    fontSize: 12,
  },
  userName: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  editButton: {
    marginTop: spacing.sm,
  },
  editForm: {
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.background.white,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  divider: {
    marginVertical: spacing.md,
  },
  section: {
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  settingDescription: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  infoValue: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  logoutButton: {
    borderColor: colors.status.error,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  description: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
