# FitTrack - GPS Fitness Tracker Frontend

A modern, responsive fitness tracking web application built with Next.js, React, and TypeScript.

![FitTrack](https://via.placeholder.com/800x400?text=FitTrack+GPS+Fitness+Tracker)

## 🚀 Features

- **Modern Dark Theme** - Beautiful dark UI with vibrant orange accents
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Activity Tracking** - Log and view your fitness activities with detailed stats
- **Segment Leaderboards** - Compete on popular segments and climb the ranks
- **Social Features** - Follow athletes, give kudos, and comment on activities
- **User Dashboard** - Overview of your weekly stats, goals, and recent activities
- **Profile Management** - Customize your profile and view your statistics

## 🛠️ Tech Stack

| Technology                                                | Purpose                         |
| --------------------------------------------------------- | ------------------------------- |
| [Next.js 15](https://nextjs.org/)                         | React framework with App Router |
| [React 19](https://react.dev/)                            | UI library                      |
| [TypeScript](https://www.typescriptlang.org/)             | Type safety                     |
| [Tailwind CSS 4](https://tailwindcss.com/)                | Utility-first styling           |
| [Zustand](https://zustand-demo.pmnd.rs/)                  | State management                |
| [Axios](https://axios-http.com/)                          | HTTP client                     |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library                    |
| [Chart.js](https://www.chartjs.org/)                      | Charts and graphs               |
| [Leaflet](https://leafletjs.com/)                         | Interactive maps                |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (dashboard)/        # Dashboard layout group
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── activities/     # Activities pages
│   │   │   ├── segments/       # Segments pages
│   │   │   └── profile/        # Profile page
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── index.ts
│   │   ├── layout/             # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   ├── activities/         # Activity components
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── ActivityList.tsx
│   │   │   ├── ActivityForm.tsx
│   │   │   ├── ActivityStats.tsx
│   │   │   └── index.ts
│   │   └── segments/           # Segment components
│   │       ├── SegmentCard.tsx
│   │       ├── SegmentLeaderboard.tsx
│   │       └── index.ts
│   │
│   └── lib/                    # Utilities and config
│       ├── api.ts              # API client with Axios
│       ├── store.ts            # Zustand stores
│       └── utils.ts            # Utility functions
│
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🏃 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **Yarn** package manager (or npm)
- **Git**

### Clone the Repository

```bash
git clone <repository-url>
cd fit-webappv1
```

### Installation

1. **Install dependencies:**

```bash
# Using Yarn
yarn install

# Or using npm
npm install
```

2. **Set up environment variables:**

```bash
# Copy the development environment file
cp .env.development .env.local
```

Or create a `.env.local` file manually:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

3. **Start the development server:**

```bash
# Using Yarn
yarn dev

# Or using npm
npm run dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command      | Description                              |
| ------------ | ---------------------------------------- |
| `yarn dev`   | Start development server with hot reload |
| `yarn build` | Build for production                     |
| `yarn start` | Start production server                  |
| `yarn lint`  | Run ESLint                               |

## 🎨 Component Library

### UI Components

The project includes a set of reusable UI components:

#### Button

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="lg" isLoading={false}>
  Click Me
</Button>;
```

**Props:**

- `variant`: `'primary'` | `'secondary'` | `'outline'` | `'ghost'` | `'danger'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `isLoading`: boolean
- `leftIcon`, `rightIcon`: ReactNode

#### Input

```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  placeholder="Enter email"
  error="Invalid email"
  leftIcon={<FaEnvelope />}
/>;
```

#### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Card variant="glass" hover>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>;
```

#### Avatar

```tsx
import { Avatar } from "@/components/ui";

<Avatar src="/user.jpg" name="John Doe" size="lg" />;
```

#### StatCard

```tsx
import { StatCard } from "@/components/ui";

<StatCard
  label="Distance"
  value="10.5 km"
  icon={<FaRoad />}
  trend={{ value: 12, isPositive: true }}
/>;
```

### Activity Components

```tsx
import { ActivityCard, ActivityList, ActivityStats } from '@/components/activities';

// Display a single activity
<ActivityCard activity={activity} showUser onKudos={handleKudos} />

// Display a list of activities
<ActivityList activities={activities} isLoading={false} />

// Display activity statistics
<ActivityStats activity={activity} layout="grid" />
```

## 🔧 Configuration

### API Configuration

The API client is configured in `src/lib/api.ts`. It includes:

- Axios interceptors for JWT token handling
- Automatic token refresh
- All API endpoint functions

### State Management

Zustand stores are defined in `src/lib/store.ts`:

- `useAuthStore` - Authentication state
- `useActivityStore` - Activities state
- `useUIStore` - UI preferences (sidebar, theme)

## 🌐 API Integration

The frontend is designed to work with the FastAPI backend. Ensure the backend is running on `http://localhost:8000` or update the `NEXT_PUBLIC_API_URL` environment variable.

### Connecting to Backend

1. Start the backend:

```bash
docker-compose up
```

2. Start the frontend:

```bash
yarn dev
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Future Enhancements

- [ ] GPS tracking integration
- [ ] Interactive route maps with Leaflet
- [ ] Activity charts and analytics
- [ ] Push notifications
- [ ] PWA support
- [ ] Dark/Light theme toggle
- [ ] Activity import from Strava/Garmin

## 📄 License

MIT License

---

Built with ❤️ using Next.js and React
