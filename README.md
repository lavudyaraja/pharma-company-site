# Prescribr Cloud - Healthcare Solutions Platform

Prescribr Cloud is a modern healthcare platform that connects patients, doctors, and pharmacies through secure, intelligent technology. Built with React, TypeScript, and TailwindCSS, it provides a comprehensive solution for pharmaceutical services and healthcare management.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Routing](#routing)
- [Data Management](#data-management)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Modern UI/UX**: Responsive design with TailwindCSS and shadcn/ui components
- **Multi-role Dashboard System**: Separate dashboards for doctors, patients, pharmacists, and admins
- **Tablet Management**: Admin panel for managing pharmaceutical tablets with public viewing
- **Interactive Components**: Carousel, contact forms, product listings, and more
- **Secure Authentication**: Login and registration system
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Local Storage**: Client-side data persistence for tablet management
- **Supabase Integration**: Backend services for data management

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: React Hooks, React Query
- **Routing**: React Router v6
- **Build Tool**: Vite
- **UI Components**: Lucide React icons, Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **Data Persistence**: LocalStorage for client-side storage
- **Backend**: Supabase (configured but not fully implemented)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prescribr-cloud-main
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:8080` (or `http://localhost:8081` if 8080 is occupied).

Build for production:
```bash
pnpm run build
```

Preview the production build:
```bash
pnpm run preview
```

Lint the code:
```bash
pnpm run lint
```

## Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   └── ...           # Custom components
├── hooks/            # Custom React hooks
├── integrations/     # External service integrations
├── lib/              # Utility functions and helpers
├── pages/            # Page components for routing
└── App.tsx           # Main application component
```

## Key Components

### Hero Section
- Interactive carousel with auto-rotation
- Feature highlights and statistics
- Responsive design for all devices

### About Section
- Company mission, vision, and values
- Key statistics and milestones
- Interactive journey carousel with touch support

### Services Section
- Comprehensive pharmaceutical services listing
- Key metrics and statistics
- Responsive grid layout

### Tablet Management
- Admin panel for adding new tablets (access with secret key: `admin123`)
- Public viewer for browsing available tablets
- LocalStorage persistence for data management

### Products Section
- Pharmaceutical product categories
- Interactive cards with category badges
- Call-to-action buttons

### Contact Section
- Contact information with icons
- Business hours display
- Contact form with validation

## Routing

The application uses React Router for navigation with the following routes:

- `/` - Home page with all main sections
- `/login` - User login page
- `/register` - User registration page
- `/products` - Products page
- `/doctor/dashboard` - Doctor dashboard
- `/pharmacist/dashboard` - Pharmacist dashboard
- `/patient/dashboard` - Patient dashboard
- `/admin/dashboard` - Admin dashboard
- `/blog` - Blog page
- `/careers` - Careers page
- `/tablets` - Tablet management page
- `*` - 404 Not Found page

## Data Management

### Tablet Management
Tablets are stored in the browser's localStorage:
- Admin access requires secret key (`admin123`)
- Form validation for all required fields
- Real-time updates to the public viewer

### Supabase Integration
The project is configured to use Supabase for backend services, with environment variables stored in the `.env` file:
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

## Deployment

To deploy the application:

1. Build the project:
```bash
pnpm run build
```

2. The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using React, TypeScript, and TailwindCSS