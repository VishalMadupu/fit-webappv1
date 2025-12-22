import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data: {
    email: string;
    username: string;
    password: string;
    full_name?: string;
  }) => api.post("/auth/register", data),
  login: (data: { username: string; password: string }) =>
    api.post("/auth/login", data),
  refresh: (refreshToken: string) =>
    api.post("/auth/refresh", { refresh_token: refreshToken }),
};

// User API
export const userAPI = {
  getMe: () => api.get("/users/me"),
  updateMe: (data: { full_name?: string; bio?: string; location?: string }) =>
    api.put("/users/me", data),
  getByUsername: (username: string) => api.get(`/users/${username}`),
};

// Activity API
export const activityAPI = {
  create: (data: {
    title: string;
    activity_type: string;
    description?: string;
  }) => api.post("/activities", data),
  list: (params?: { skip?: number; limit?: number }) =>
    api.get("/activities", { params }),
  get: (id: number) => api.get(`/activities/${id}`),
  update: (id: number, data: { title?: string; description?: string }) =>
    api.put(`/activities/${id}`, data),
  delete: (id: number) => api.delete(`/activities/${id}`),
  uploadGPSPoints: (id: number, points: any[]) =>
    api.post(`/activities/${id}/gps-points`, { points }),
  complete: (id: number) => api.post(`/activities/${id}/complete`),
};

// Segment API
export const segmentAPI = {
  create: (data: any) => api.post("/segments", data),
  list: (params?: { skip?: number; limit?: number }) =>
    api.get("/segments", { params }),
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
