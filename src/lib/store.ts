import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  bio?: string;
  profile_picture?: string;
  location?: string;
  created_at: string;
}

export interface Activity {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  activity_type: string;
  status: string;
  distance: number;
  duration: number;
  elevation_gain: number;
  elevation_loss: number;
  calories: number;
  avg_speed: number;
  max_speed: number;
  avg_heart_rate?: number;
  max_heart_rate?: number;
  started_at: string;
  completed_at?: string;
  polyline?: string;
  user?: User;
  kudos_count?: number;
  comments_count?: number;
  has_kudos?: boolean;
}

export interface Segment {
  id: number;
  name: string;
  description?: string;
  distance: number;
  elevation_gain: number;
  avg_grade: number;
  activity_type: string;
  efforts_count?: number;
}

export interface SegmentEffort {
  id: number;
  user: User;
  elapsed_time: number;
  avg_speed: number;
  rank: number;
  is_kom: boolean;
  is_pr: boolean;
  started_at: string;
}

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Activity Store
interface ActivityState {
  activities: Activity[];
  currentActivity: Activity | null;
  isLoading: boolean;
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  setCurrentActivity: (activity: Activity | null) => void;
  updateActivity: (id: number, updates: Partial<Activity>) => void;
  removeActivity: (id: number) => void;
  setIsLoading: (value: boolean) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  currentActivity: null,
  isLoading: false,
  setActivities: (activities) => set({ activities }),
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
  setCurrentActivity: (currentActivity) => set({ currentActivity }),
  updateActivity: (id, updates) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),
  removeActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== id),
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

// UI Store
interface UIState {
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      theme: "dark",
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "ui-storage",
    }
  )
);
