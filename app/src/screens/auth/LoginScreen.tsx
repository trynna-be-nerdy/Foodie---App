import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import {Text, TextInput, Button, HelperText} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {colors} from '../../theme/colors';
import {textStyles} from '../../theme/typography';
import {spacing} from '../../theme';
import {login} from '../../services/authService';
import {
  authenticateWithBiometric,
  checkBiometricAvailability,
  enableBiometric,
  getBiometryTypeName,
  isBiometricEnabled,
} from '../../services/biometricService';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

export function LoginScreen({navigation}: LoginScreenProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const biometricPromptedRef = useRef(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    async function initializeBiometrics() {
      const status = await checkBiometricAvailability();
      setBiometricAvailable(status.available);
      setBiometricType(status.biometryType);

      const enabled = await isBiometricEnabled();
      setBiometricEnabled(enabled);

      if (status.available && enabled && !biometricPromptedRef.current) {
        biometricPromptedRef.current = true;
        await handleBiometricLogin();
      }
    }

    initializeBiometrics();
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await login(data);

      if (biometricAvailable && !biometricEnabled) {
        Alert.alert(
          `Enable ${getBiometryTypeName(biometricType)}?`,
          `Use ${getBiometryTypeName(biometricType)} for faster sign in on this device.`,
          [
            {text: 'Not now', style: 'cancel'},
            {
              text: 'Enable',
              onPress: async () => {
                const enabled = await enableBiometric(data);
                setBiometricEnabled(enabled);
              },
            },
          ],
        );
      }

      // On success, navigate to main app
      // navigation.navigate('Main');
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsBiometricLoading(true);
    setApiError(null);

    const result = await authenticateWithBiometric();
    if (!result.success) {
      setApiError(result.error || 'Biometric authentication failed');
    }
    setIsBiometricLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
            {apiError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{apiError}</Text>
              </View>
            )}

            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Email"
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.email}
                    left={<TextInput.Icon icon="email" />}
                    style={styles.input}
                  />
                  <HelperText type="error" visible={!!errors.email}>
                    {errors.email?.message}
                  </HelperText>
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.password}
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={styles.input}
                  />
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password?.message}
                  </HelperText>
                </View>
              )}
            />

            <Button
              mode="text"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotButton}>
              Forgot Password?
            </Button>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}>
              Sign In
            </Button>

            {biometricAvailable && biometricEnabled && (
              <Button
                mode="outlined"
                onPress={handleBiometricLogin}
                loading={isBiometricLoading}
                disabled={isBiometricLoading}
                style={styles.biometricButton}>
                Sign In with {getBiometryTypeName(biometricType)}
              </Button>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Button mode="text" onPress={() => navigation.navigate('Signup')} compact>
              Sign Up
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  form: {
    marginBottom: spacing.xl,
  },
  errorContainer: {
    backgroundColor: colors.status.errorLight,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.status.error,
    ...textStyles.bodySmall,
  },
  inputContainer: {
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background.white,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  submitButtonContent: {
    paddingVertical: spacing.xs,
  },
  biometricButton: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
});
