// Main components barrel export
// UI Components
export {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  Badge,
  StatCard,
  Skeleton,
  SkeletonCard,
  SkeletonActivityCard,
} from "./ui";
export type {
  ButtonProps,
  InputProps,
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  AvatarProps,
  BadgeProps,
  StatCardProps,
  SkeletonProps,
} from "./ui";

// Activity Components
export {
  ActivityCard,
  ActivityList,
  ActivityForm,
  ActivityStats,
} from "./activities";
export type {
  ActivityCardProps,
  ActivityListProps,
  ActivityFormProps,
  ActivityFormData,
  ActivityStatsProps,
} from "./activities";

// Layout Components
export { Navbar, Sidebar, Footer } from "./layout";

// Segment Components
export { SegmentCard, SegmentLeaderboard } from "./segments";
export type { SegmentCardProps, SegmentLeaderboardProps } from "./segments";
