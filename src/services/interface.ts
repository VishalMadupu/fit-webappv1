// Core Model Types
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

// Auth Service Types
export interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

export interface UpdateProfileData {
  full_name?: string;
  bio?: string;
  location?: string;
  profile_picture?: string;
}

// User Service Types
export interface UserActivitiesParams {
  skip?: number;
  limit?: number;
  activity_type?: string;
  date_from?: string;
  date_to?: string;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}

// Activity Types
export interface CreateActivityData {
  title: string;
  activity_type: string;
  description?: string;
}

export interface UpdateActivityData {
  title?: string;
  description?: string;
}
