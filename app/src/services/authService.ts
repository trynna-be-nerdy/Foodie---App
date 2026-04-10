import AsyncStorage from '@react-native-async-storage/async-storage';
import {api, clearTokens, setAccessToken, getAccessToken, API_BASE_URL} from './api';

// Storage keys
const USER_DATA_KEY = '@foodie/user_data';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  profilePhoto?: string | null;
  phone?: string | null;
  isVerified?: boolean;
  cuisinePreferences?: string[] | null;
  dietaryRestrictions?: string[] | null;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// User data management
export async function saveUserData(user: User): Promise<void> {
  await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
}

export async function getUserData(): Promise<User | null> {
  const data = await AsyncStorage.getItem(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
}

export async function removeUserData(): Promise<void> {
  await AsyncStorage.removeItem(USER_DATA_KEY);
}

// Auth API calls
export async function signup(data: SignupData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/signup', data, {skipAuth: true});

  if (response.success && response.data) {
    const {user, accessToken} = response.data;
    await setAccessToken(accessToken);
    await saveUserData(user);
    return {user, accessToken};
  }

  throw new Error(response.error?.message || 'Signup failed');
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', data, {skipAuth: true});

  if (response.success && response.data) {
    const {user, accessToken} = response.data;
    await setAccessToken(accessToken);
    await saveUserData(user);
    return {user, accessToken};
  }

  throw new Error(response.error?.message || 'Login failed');
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch {
    // Continue with local cleanup even if API call fails
  }

  await clearTokens();
  await removeUserData();
}

export async function forgotPassword(email: string): Promise<void> {
  const response = await api.post('/auth/forgot-password', {email}, {skipAuth: true});

  if (!response.success) {
    throw new Error(response.error?.message || 'Failed to send reset email');
  }
}

export async function resetPassword(token: string, password: string): Promise<void> {
  const response = await api.post('/auth/reset-password', {token, password}, {skipAuth: true});

  if (!response.success) {
    throw new Error(response.error?.message || 'Failed to reset password');
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUserData();
  return !!user;
}

// Get current user profile from API
export async function getCurrentUser(): Promise<User | null> {
  const response = await api.get<{user: User}>('/users/me');

  if (response.success && response.data?.user) {
    const {user} = response.data;
    await saveUserData(user);
    return user;
  }

  return null;
}

// Update user profile
export async function updateProfile(data: Partial<User>): Promise<User> {
  const response = await api.put<{user: User}>('/users/me', data);

  if (response.success && response.data?.user) {
    const {user} = response.data;
    await saveUserData(user);
    return user;
  }

  throw new Error(response.error?.message || 'Failed to update profile');
}

// Upload profile photo
export async function uploadProfilePhoto(file: {
  uri: string;
  fileName?: string | null;
  type?: string | null;
}): Promise<User> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const formData = new FormData();
  formData.append('photo', {
    uri: file.uri,
    name: file.fileName || 'profile.jpg',
    type: file.type || 'image/jpeg',
  } as unknown as Blob);

  const response = await fetch(`${API_BASE_URL}/users/me/photo`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: {success: boolean; data?: {user: User}; error?: {message: string}} =
    await response.json();

  if (data.success && data.data?.user) {
    await saveUserData(data.data.user);
    return data.data.user;
  }

  throw new Error(data.error?.message || 'Failed to upload profile photo');
}

// Delete user account
export async function deleteAccount(): Promise<void> {
  const response = await api.delete('/users/me');

  if (response.success) {
    await clearTokens();
    await removeUserData();
    return;
  }

  throw new Error(response.error?.message || 'Failed to delete account');
}
