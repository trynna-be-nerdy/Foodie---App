import React, {useState, useCallback, useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  Text,
  TextInput,
  ActivityIndicator,
  Portal,
  Dialog,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';
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

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  label: string;
  lastFour?: string;
  isDefault: boolean;
}

export function SettingsScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {user, isLoading} = useAppSelector(state => state.user);
  const {pushNotificationsEnabled, expirationAlertsEnabled, promotionsEnabled} = useAppSelector(
    state => state.app,
  );

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');

  // Biometric state
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricModalVisible, setBiometricModalVisible] = useState(false);
  const [biometricPassword, setBiometricPassword] = useState('');
  const [isBiometricSaving, setIsBiometricSaving] = useState(false);

  // Mock payment methods
  const [paymentMethods] = useState<PaymentMethod[]>([
    {id: '1', type: 'card', label: 'Visa', lastFour: '4242', isDefault: true},
    {id: '2', type: 'bank', label: 'Chase Bank', lastFour: '1234', isDefault: false},
  ]);

  // Check biometric availability on mount
  useEffect(() => {
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
    } catch {
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
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
          },
        },
      ],
    );
  };

  const renderPaymentMethod = (method: PaymentMethod) => {
    const iconName = method.type === 'card' ? 'credit-card' : method.type === 'bank' ? 'bank' : 'paypal';
    return (
      <TouchableOpacity key={method.id} style={styles.paymentItem}>
        <View style={styles.paymentLeft}>
          <View style={[styles.paymentIcon, method.isDefault && styles.paymentIconDefault]}>
            <Icon name={iconName} size={20} color={method.isDefault ? colors.primary.freshAvocadoGreen : colors.text.secondary} />
          </View>
          <View>
            <Text style={styles.paymentLabel}>{method.label}</Text>
            {method.lastFour && (
              <Text style={styles.paymentNumber}>•••• {method.lastFour}</Text>
            )}
          </View>
        </View>
        {method.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleImagePick} style={styles.avatarContainer}>
            {user?.profilePhoto ? (
              <Image source={{uri: user.profilePhoto}} style={styles.avatar} />
            ) : (
              <Avatar.Icon
                size={100}
                icon="account"
                style={{backgroundColor: colors.neutral.gray200}}
                color={colors.text.secondary}
              />
            )}
            <View style={styles.editBadge}>
              <Icon name="camera" size={14} color={colors.background.white} />
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
                  disabled={isLoading}
                  buttonColor={colors.primary.freshAvocadoGreen}>
                  Save
                </Button>
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'Not signed in'}</Text>
              {user?.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Icon name="check-decagram" size={14} color={colors.primary.freshAvocadoGreen} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
              <Button
                mode="outlined"
                onPress={() => {
                  setEditName(user?.name || '');
                  setEditPhone(user?.phone || '');
                  setIsEditing(true);
                }}
                style={styles.editProfileButton}>
                Edit Profile
              </Button>
            </View>
          )}
        </View>

        {/* Account Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="email-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>{user?.email || 'Not set'}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="phone-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Phone</Text>
              </View>
              <Text style={styles.infoValue}>{user?.phone || 'Not set'}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="calendar-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Member Since</Text>
              </View>
              <Text style={styles.infoValue}>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="lock-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Change Password</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.sectionCard}>
            {biometricAvailable && (
              <>
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <Icon name="fingerprint" size={22} color={colors.text.secondary} />
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>{getBiometryTypeName(biometricType)} Login</Text>
                      <Text style={styles.settingDescription}>
                        Use {getBiometryTypeName(biometricType)} for quick login
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={biometricEnabled}
                    onValueChange={handleBiometricToggle}
                    trackColor={{false: colors.neutral.gray300, true: colors.primary.freshAvocadoGreen + '60'}}
                    thumbColor={biometricEnabled ? colors.primary.freshAvocadoGreen : colors.neutral.gray400}
                  />
                </View>
                <Divider style={styles.divider} />
              </>
            )}
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="shield-check-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Two-Factor Authentication</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Icon name="bell-outline" size={22} color={colors.text.secondary} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Get alerts for expiring points</Text>
                </View>
              </View>
              <Switch
                value={pushNotificationsEnabled}
                onValueChange={handlePushNotificationsToggle}
                trackColor={{false: colors.neutral.gray300, true: colors.primary.freshAvocadoGreen + '60'}}
                thumbColor={pushNotificationsEnabled ? colors.primary.freshAvocadoGreen : colors.neutral.gray400}
              />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Icon name="clock-alert-outline" size={22} color={colors.text.secondary} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Expiration Alerts</Text>
                  <Text style={styles.settingDescription}>Remind when points expire soon</Text>
                </View>
              </View>
              <Switch
                value={expirationAlertsEnabled}
                onValueChange={value => {
                  dispatch(setExpirationAlertsEnabled(value));
                }}
                trackColor={{false: colors.neutral.gray300, true: colors.primary.freshAvocadoGreen + '60'}}
                thumbColor={expirationAlertsEnabled ? colors.primary.freshAvocadoGreen : colors.neutral.gray400}
              />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Icon name="tag-outline" size={22} color={colors.text.secondary} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Promotions</Text>
                  <Text style={styles.settingDescription}>Special offers and updates</Text>
                </View>
              </View>
              <Switch
                value={promotionsEnabled}
                onValueChange={value => {
                  dispatch(setPromotionsEnabled(value));
                }}
                trackColor={{false: colors.neutral.gray300, true: colors.primary.freshAvocadoGreen + '60'}}
                thumbColor={promotionsEnabled ? colors.primary.freshAvocadoGreen : colors.neutral.gray400}
              />
            </View>
          </View>
        </View>

        {/* Billing & Payments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing & Payments</Text>
          <View style={styles.sectionCard}>
            {paymentMethods.map(renderPaymentMethod)}
            <TouchableOpacity style={styles.addPaymentButton}>
              <Icon name="plus-circle-outline" size={20} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.addPaymentText}>Add Payment Method</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="history" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Billing History</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Payout Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payout Settings</Text>
          <View style={styles.sectionCard}>
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="bank-transfer" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Bank Account</Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoValue}>•••• 1234</Text>
                <Icon name="chevron-right" size={20} color={colors.text.light} />
              </View>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="cash-fast" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Payout Schedule</Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoValue}>Monthly</Text>
                <Icon name="chevron-right" size={20} color={colors.text.light} />
              </View>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="file-document-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Tax Documents</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionCard}>
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="help-circle-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Help Center</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="chat-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Contact Support</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="file-document-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Terms of Service</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Icon name="shield-outline" size={22} color={colors.text.secondary} />
                <Text style={styles.infoLabel}>Privacy Policy</Text>
              </View>
              <Icon name="chevron-right" size={20} color={colors.text.light} />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Foodie v1.0.0</Text>
        </View>

        {/* Logout and Delete */}
        <View style={styles.dangerZone}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={colors.text.primary}>
            Log Out
          </Button>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
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
              disabled={isBiometricSaving}
              buttonColor={colors.primary.freshAvocadoGreen}>
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
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.background.white,
    marginBottom: spacing.md,
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
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary.freshAvocadoGreen,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.background.white,
  },
  editForm: {
    width: '100%',
    paddingHorizontal: spacing.md,
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
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
  profileEmail: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  verifiedText: {
    ...textStyles.caption,
    color: colors.primary.freshAvocadoGreen,
    marginLeft: 4,
  },
  editProfileButton: {
    marginTop: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    ...textStyles.body,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  infoRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  settingLabel: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  settingDescription: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  divider: {
    marginLeft: spacing.md + 22 + spacing.md,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  paymentIconDefault: {
    backgroundColor: colors.primary.freshAvocadoGreen + '15',
  },
  paymentLabel: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  paymentNumber: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  defaultBadge: {
    backgroundColor: colors.primary.freshAvocadoGreen + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  defaultText: {
    ...textStyles.caption,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  addPaymentText: {
    ...textStyles.body,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  appVersion: {
    ...textStyles.caption,
    color: colors.text.light,
  },
  dangerZone: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    marginBottom: spacing.md,
    borderColor: colors.neutral.gray300,
  },
  deleteText: {
    ...textStyles.body,
    color: colors.status.error,
  },
  bottomPadding: {
    height: spacing.xl,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
