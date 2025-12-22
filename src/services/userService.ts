import { userAPI } from "./url";
import { User, UserActivitiesParams, PaginationParams } from "./interface";

// User API service
export const userService = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await userAPI.getMe();
    return response.data;
  },

  /**
   * Update current user profile
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await userAPI.updateMe(userData);
    return response.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: number): Promise<User> => {
    const response = await userAPI.getById(id);
    return response.data;
  },

  /**
   * Get user by username
   */
  getUserByUsername: async (username: string): Promise<User> => {
    const response = await userAPI.getByUsername(username);
    return response.data;
  },

  /**
   * Search users
   */
  searchUsers: async (query: string, limit: number = 10): Promise<User[]> => {
    const response = await userAPI.search(query, limit);
    return response.data;
  },

  /**
   * Update user avatar
   */
  updateAvatar: async (file: File): Promise<User> => {
    const response = await userAPI.updateAvatar(file);
    return response.data;
  },

  /**
   * Delete current user account
   */
  deleteAccount: async (password: string): Promise<void> => {
    const response = await userAPI.deleteMe(password);
    return response.data;
  },

  /**
   * Get user statistics
   */
  getUserStats: async (id: number): Promise<any> => {
    const response = await userAPI.getStats(id);
    return response.data;
  },

  /**
   * Get user activities
   */
  getUserActivities: async (
    id: number,
    params?: UserActivitiesParams
  ): Promise<any> => {
    const response = await userAPI.getActivities(id, params);
    return response.data;
  },

  /**
   * Get user segments
   */
  getUserSegments: async (id: number): Promise<any> => {
    const response = await userAPI.getSegments(id);
    return response.data;
  },

  /**
   * Get user followers
   */
  getUserFollowers: async (
    id: number,
    params?: PaginationParams
  ): Promise<User[]> => {
    const response = await userAPI.getFollowers(id, params);
    return response.data;
  },

  /**
   * Get users followed by a user
   */
  getUserFollowing: async (
    id: number,
    params?: PaginationParams
  ): Promise<User[]> => {
    const response = await userAPI.getFollowing(id, params);
    return response.data;
  },

  /**
   * Get user kudos
   */
  getUserKudos: async (id: number, params?: PaginationParams): Promise<any> => {
    const response = await userAPI.getKudos(id, params);
    return response.data;
  },
};
