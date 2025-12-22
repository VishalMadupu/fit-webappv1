// Services Index - Main barrel export

// API client
export { default as api } from "./api";

// Auth service
export { authService } from "./auth/authService";

// User service
export { userService } from "./userService";

// URL APIs
export { authAPI, userAPI, activityAPI, segmentAPI, socialAPI } from "./url";

// Types and Interfaces
export type {
  // Core model types
  User,
  Activity,
  Segment,
  SegmentEffort,
  // Auth types
  RegisterData,
  LoginCredentials,
  ResetPasswordData,
  ChangePasswordData,
  UpdateProfileData,
  // Params types
  UserActivitiesParams,
  PaginationParams,
  // Activity types
  CreateActivityData,
  UpdateActivityData,
} from "./interface";
