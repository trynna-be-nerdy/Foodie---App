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
import {signup} from '../../services/authService';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
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

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

export function SignupScreen({navigation}: SignupScreenProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      // On success, navigation will be handled by auth state change
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Failed to create account. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Foodie and start earning rewards</Text>
          </View>

          <View style={styles.form}>
            {apiError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{apiError}</Text>
              </View>
            )}

            <Controller
              control={control}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Full Name"
                    mode="outlined"
                    autoCapitalize="words"
                    autoComplete="name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.name}
                    left={<TextInput.Icon icon="account" />}
                    style={styles.input}
                  />
                  <HelperText type="error" visible={!!errors.name}>
                    {errors.name?.message}
                  </HelperText>
                </View>
              )}
            />

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
                    label="Confirm Password"
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
              Create Account
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Button mode="text" onPress={() => navigation.goBack()} compact>
              Sign In
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
  },
  header: {
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
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
  submitButton: {
    marginTop: spacing.md,
  },
  submitButtonContent: {
    paddingVertical: spacing.xs,
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
