import api from "./api";
import {
  RegisterData,
  LoginCredentials,
  ResetPasswordData,
  ChangePasswordData,
  UpdateProfileData,
  PaginationParams,
  UserActivitiesParams,
  CreateActivityData,
  UpdateActivityData,
} from "./interface";

// Auth API (versioned)
export const authAPI = {
  register: (data: RegisterData) => api.post("/auth/v1/register", data),
  login: (data: LoginCredentials) => api.post("/auth/v1/login", data),
  logout: () => api.post("/auth/v1/logout"),
  refresh: (refreshToken: string) =>
    api.post("/auth/v1/refresh", { refresh_token: refreshToken }),
  forgotPassword: (email: string) =>
    api.post("/auth/v1/forgot-password", { email }),
  resetPassword: (data: ResetPasswordData) =>
    api.post("/auth/v1/reset-password", data),
  changePassword: (data: ChangePasswordData) =>
    api.post("/auth/v1/change-password", data),
  verifyEmail: (token: string) => api.post("/auth/v1/verify-email", { token }),
  resendVerification: () => api.post("/auth/v1/resend-verification"),
  resendReset: (email: string) => api.post("/auth/v1/resend-reset", { email }),
};

// User API
export const userAPI = {
  getMe: () => api.get("/users/me"),
  updateMe: (data: UpdateProfileData) => api.put("/users/me", data),
  getByUsername: (username: string) => api.get(`/users/${username}`),
  getById: (id: number) => api.get(`/users/${id}`),
  search: (query: string, limit: number = 10) =>
    api.get("/users/search", { params: { query, limit } }),
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.put("/users/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteMe: (password: string) =>
    api.delete("/users/me", { data: { password } }),
  getStats: (id: number) => api.get(`/users/${id}/stats`),
  getActivities: (id: number, params?: UserActivitiesParams) =>
    api.get(`/users/${id}/activities`, { params }),
  getSegments: (id: number) => api.get(`/users/${id}/segments`),
  getFollowers: (id: number, params?: PaginationParams) =>
    api.get(`/users/${id}/followers`, { params }),
  getFollowing: (id: number, params?: PaginationParams) =>
    api.get(`/users/${id}/following`, { params }),
  getKudos: (id: number, params?: PaginationParams) =>
    api.get(`/users/${id}/kudos`, { params }),
};

// Activity API
export const activityAPI = {
  create: (data: CreateActivityData) => api.post("/activities", data),
  list: (params?: PaginationParams) => api.get("/activities", { params }),
  get: (id: number) => api.get(`/activities/${id}`),
  update: (id: number, data: UpdateActivityData) =>
    api.put(`/activities/${id}`, data),
  delete: (id: number) => api.delete(`/activities/${id}`),
  uploadGPSPoints: (id: number, points: any[]) =>
    api.post(`/activities/${id}/gps-points`, { points }),
  complete: (id: number) => api.post(`/activities/${id}/complete`),
};

// Segment API
export const segmentAPI = {
  create: (data: any) => api.post("/segments", data),
  list: (params?: PaginationParams) => api.get("/segments", { params }),
  get: (id: number) => api.get(`/segments/${id}`),
  getLeaderboard: (id: number) => api.get(`/segments/${id}/leaderboard`),
  delete: (id: number) => api.delete(`/segments/${id}`),
};

// Social API
export const socialAPI = {
  follow: (userId: number) => api.post(`/social/follow/${userId}`),
  unfollow: (userId: number) => api.delete(`/social/follow/${userId}`),
  getFollowers: (userId: number) => api.get(`/social/followers/${userId}`),
  getFollowing: (userId: number) => api.get(`/social/following/${userId}`),
  getFollowStats: (userId: number) => api.get(`/social/stats/${userId}`),
  giveKudos: (activityId: number) => api.post(`/social/kudos/${activityId}`),
  removeKudos: (activityId: number) =>
    api.delete(`/social/kudos/${activityId}`),
  addComment: (activityId: number, content: string) =>
    api.post(`/social/comments/${activityId}`, { content }),
  getComments: (activityId: number) =>
    api.get(`/social/comments/${activityId}`),
  deleteComment: (commentId: number) =>
    api.delete(`/social/comments/${commentId}`),
};

// Notification API
export const notificationAPI = {
  list: (userId: number, params?: PaginationParams) =>
    api.get("/notifications", { params: { user_id: userId, ...params } }),
  getUnreadCount: (userId: number) =>
    api.get("/notifications/unread-count", { params: { user_id: userId } }),
  markAsRead: (notificationId: number) =>
    api.put(`/notifications/${notificationId}/read`),
  markAllRead: (userId: number) =>
    api.put("/notifications/mark-all-read", null, {
      params: { user_id: userId },
    }),
  delete: (notificationId: number) =>
    api.delete(`/notifications/${notificationId}`),
  registerDevice: (userId: number, deviceToken: string, deviceType: string) =>
    api.post(
      "/notifications/devices",
      { device_token: deviceToken, device_type: deviceType },
      { params: { user_id: userId } }
    ),
  unregisterDevice: (deviceToken: string) =>
    api.delete(`/notifications/devices/${deviceToken}`),
  getPreferences: (userId: number) =>
    api.get(`/notifications/preferences/${userId}`),
  updatePreferences: (userId: number, preferences: any) =>
    api.put(`/notifications/preferences/${userId}`, preferences),
};

// Email API (for auth-related emails)
export const emailAPI = {
  sendWelcome: (email: string, username: string) =>
    api.post("/email/welcome", { email, username }),
  sendOTP: (email: string, otpCode: string, purpose: string = "verification") =>
    api.post("/email/otp", { email, otp_code: otpCode, purpose }),
  sendForgotPassword: (email: string, resetToken: string, resetUrl?: string) =>
    api.post("/email/forgot-password", {
      email,
      reset_token: resetToken,
      reset_url: resetUrl,
    }),
  sendPasswordChanged: (email: string, username: string) =>
    api.post("/email/password-changed", { email, username }),
  sendEmailVerification: (
    email: string,
    token: string,
    verificationUrl?: string
  ) =>
    api.post("/email/verify-email", {
      email,
      token,
      verification_url: verificationUrl,
    }),
};
