import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import {login, LoginData} from './authService';

const BIOMETRIC_ENABLED_KEY = '@foodie/biometric_enabled';
const BIOMETRIC_CREDENTIALS_KEY = 'foodie.biometric.credentials';

export interface BiometricStatus {
  available: boolean;
  biometryType: string | null;
  error?: string;
}

type BiometryType = 'FACE_ID' | 'FINGERPRINT' | 'IRIS' | 'UNKNOWN';

const resolveBiometryType = (
  types: LocalAuthentication.AuthenticationType[],
): BiometryType => {
  if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
    return 'FACE_ID';
  }
  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return 'FINGERPRINT';
  }
  if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
    return 'IRIS';
  }
  return 'UNKNOWN';
};

export async function checkBiometricAvailability(): Promise<BiometricStatus> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return {available: false, biometryType: null, error: 'Biometrics not supported'};
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return {available: false, biometryType: null, error: 'No biometrics enrolled'};
    }

    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    return {available: true, biometryType: resolveBiometryType(supportedTypes)};
  } catch (error) {
    return {
      available: false,
      biometryType: null,
      error: error instanceof Error ? error.message : 'Biometric check failed',
    };
  }
}

export function getBiometryTypeName(biometryType: string | null): string {
  switch (biometryType) {
    case 'FACE_ID':
      return 'Face ID';
    case 'FINGERPRINT':
      return 'Fingerprint';
    case 'IRIS':
      return 'Iris';
    default:
      return 'Biometric';
  }
}

export async function isBiometricEnabled(): Promise<boolean> {
  try {
    const enabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
    return enabled === 'true';
  } catch {
    return false;
  }
}

export async function enableBiometric(credentials: LoginData): Promise<boolean> {
  const status = await checkBiometricAvailability();
  if (!status.available) {
    return false;
  }

  const authResult = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Enable biometric login',
    cancelLabel: 'Cancel',
  });
  if (!authResult.success) {
    return false;
  }

  try {
    await SecureStore.setItemAsync(
      BIOMETRIC_CREDENTIALS_KEY,
      JSON.stringify(credentials),
      {keychainService: BIOMETRIC_CREDENTIALS_KEY},
    );
    await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');
    return true;
  } catch {
    return false;
  }
}

export async function disableBiometric(): Promise<void> {
  await AsyncStorage.removeItem(BIOMETRIC_ENABLED_KEY);
  try {
    await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIALS_KEY, {
      keychainService: BIOMETRIC_CREDENTIALS_KEY,
    });
  } catch {
    // Ignore secure store cleanup failures.
  }
}

export async function authenticateWithBiometric(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const enabled = await isBiometricEnabled();
    if (!enabled) {
      return {success: false, error: 'Biometric login is not enabled'};
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirm your identity',
      cancelLabel: 'Cancel',
    });
    if (!result.success) {
      return {success: false, error: 'Biometric authentication failed'};
    }

    const stored = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIALS_KEY, {
      keychainService: BIOMETRIC_CREDENTIALS_KEY,
    });
    if (!stored) {
      return {success: false, error: 'No stored credentials found'};
    }

    const parsed = JSON.parse(stored) as LoginData;
    await login({email: parsed.email, password: parsed.password});
    return {success: true};
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

export async function createBiometricKeys(): Promise<{
  success: boolean;
  publicKey?: string;
}> {
  return {success: false};
}

export async function deleteBiometricKeys(): Promise<boolean> {
  return false;
}
