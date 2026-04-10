import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Text, TextInput, Button, HelperText} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {colors} from '../../theme/colors';
import {textStyles} from '../../theme/typography';
import {spacing} from '../../theme';
import {resetPassword} from '../../services/authService';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
  route: {
    params?: {
      token?: string;
    };
  };
}

export function ResetPasswordScreen({
  navigation,
  route,
}: ResetPasswordScreenProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const token = route.params?.token;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setApiError('Invalid reset link. Please request a new one.');
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      await resetPassword(token, data.password);
      setIsSuccess(true);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : 'Failed to reset password. The link may have expired.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorPage}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Invalid Link</Text>
          <Text style={styles.errorMessage}>
            This password reset link is invalid or has expired. Please request a new one.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.errorButton}>
            Request New Link
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Password Reset</Text>
          <Text style={styles.successText}>
            Your password has been successfully reset. You can now sign in with your new password.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.successButton}>
            Sign In
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your new password below.</Text>
          </View>

          <View style={styles.form}>
            {apiError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{apiError}</Text>
              </View>
            )}

            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="New Password"
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
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

            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Confirm New Password"
                    mode="outlined"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.confirmPassword}
                    left={<TextInput.Icon icon="lock-check" />}
                    right={
                      <TextInput.Icon
                        icon={showConfirmPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    }
                    style={styles.input}
                  />
                  <HelperText type="error" visible={!!errors.confirmPassword}>
                    {errors.confirmPassword?.message}
                  </HelperText>
                </View>
              )}
            />

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}>
              Reset Password
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
    marginBottom: spacing.sm,
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
  submitButton: {
    marginTop: spacing.md,
  },
  submitButtonContent: {
    paddingVertical: spacing.xs,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
    color: colors.status.success,
  },
  successTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  successText: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  successButton: {
    marginTop: spacing.md,
  },
  errorPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  errorTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorMessage: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  errorButton: {
    marginTop: spacing.md,
  },
});
