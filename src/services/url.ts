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

// Auth API
export const authAPI = {
  register: (data: RegisterData) => api.post("/auth/register", data),
  login: (data: LoginCredentials) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  refresh: (refreshToken: string) =>
    api.post("/auth/refresh", { refresh_token: refreshToken }),
  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }),
  resetPassword: (data: ResetPasswordData) =>
    api.post("/auth/reset-password", data),
  changePassword: (data: ChangePasswordData) =>
    api.post("/auth/change-password", data),
  verifyEmail: (token: string) => api.post("/auth/verify-email", { token }),
  resendVerification: () => api.post("/auth/resend-verification"),
  resendReset: (email: string) => api.post("/auth/resend-reset", { email }),
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
  giveKudos: (activityId: number) => api.post(`/social/kudos/${activityId}`),
  removeKudos: (activityId: number) =>
    api.delete(`/social/kudos/${activityId}`),
  addComment: (activityId: number, content: string) =>
    api.post(`/social/comments/${activityId}`, { content }),
  getComments: (activityId: number) =>
    api.get(`/social/comments/${activityId}`),
};
