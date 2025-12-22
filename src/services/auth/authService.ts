import { authAPI, userAPI } from "../url";
import { useAuthStore } from "@/lib/store";
import {
  RegisterData,
  LoginCredentials,
  ResetPasswordData,
  ChangePasswordData,
  UpdateProfileData,
} from "../interface";

// Authentication service that combines API calls and state management
export const authService = {
  /**
   * Register a new user
   */
  register: async (userData: RegisterData) => {
    try {
      const response = await authAPI.register(userData);
      const { user, access_token, refresh_token } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // Update auth store
      const { setUser, setIsAuthenticated } = useAuthStore.getState();
      setUser(user);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   */
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { user, access_token, refresh_token } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // Update auth store
      const { setUser, setIsAuthenticated } = useAuthStore.getState();
      setUser(user);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      // Call the API to invalidate the session
      await authAPI.logout();
    } catch (error) {
      // If API logout fails, still clear local tokens
      console.error("Logout API call failed:", error);
    } finally {
      // Clear tokens from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Update auth store
      const { logout } = useAuthStore.getState();
      logout();
    }
  },

  /**
   * Refresh access token
   */
  refresh: async (refreshToken: string) => {
    try {
      const response = await authAPI.refresh(refreshToken);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password using reset token
   */
  resetPassword: async (data: ResetPasswordData) => {
    try {
      const response = await authAPI.resetPassword(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Change current user's password
   */
  changePassword: async (data: ChangePasswordData) => {
    try {
      const response = await authAPI.changePassword(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string) => {
    try {
      const response = await authAPI.verifyEmail(token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Resend verification email
   */
  resendVerification: async () => {
    try {
      const response = await authAPI.resendVerification();
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Resend password reset email
   */
  resendPasswordReset: async (email: string) => {
    try {
      const response = await authAPI.resendReset(email);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    try {
      const response = await userAPI.getMe();
      const user = response.data;

      // Update auth store with the latest user data
      const { setUser } = useAuthStore.getState();
      setUser(user);

      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update current user profile
   */
  updateProfile: async (userData: UpdateProfileData) => {
    try {
      const response = await userAPI.updateMe(userData);
      const updatedUser = response.data;

      // Update auth store with the updated user data
      const { setUser } = useAuthStore.getState();
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user avatar
   */
  updateAvatar: async (file: File) => {
    try {
      const response = await userAPI.updateAvatar(file);
      const updatedUser = response.data;

      // Update auth store with the updated user data
      const { setUser } = useAuthStore.getState();
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete current user account
   */
  deleteAccount: async (password: string) => {
    try {
      const response = await userAPI.deleteMe(password);

      // Clear tokens from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Update auth store
      const { logout } = useAuthStore.getState();
      logout();

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    const token = localStorage.getItem("access_token");
    return !!token;
  },

  /**
   * Get access token
   */
  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },

  /**
   * Get refresh token
   */
  getRefreshToken: () => {
    return localStorage.getItem("refresh_token");
  },

  /**
   * Clear all authentication tokens
   */
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
