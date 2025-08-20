# 🚀 Modern Blog Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4.7-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-10.0.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-16.11.0-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.21.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**A premium, full-stack blog platform with modern UI/UX, real-time features, and enterprise-grade architecture.**

[✨ Live Demo](#-live-demo) • [🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [💾 Database](#-database)
- [🎨 UI/UX Features](#-uiux-features)
- [🔐 Authentication](#-authentication)
- [📊 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### Core Functionality

- ✅ **User Management** - Registration, authentication, profiles, and role-based access
- ✅ **Content Management** - Create, edit, publish, and manage blog posts
- ✅ **Rich Text Editor** - Advanced WYSIWYG editor with media embedding
- ✅ **Categories & Tags** - Organize content with hierarchical categorization
- ✅ **Comments System** - Threaded comments with moderation capabilities
- ✅ **Media Management** - Image uploads with CDN integration
- ✅ **Search & Filtering** - Full-text search with advanced filters
- ✅ **SEO Optimization** - Meta tags, structured data, and sitemap generation

### Premium UI/UX

- 🎨 **Glass Morphism Design** - Modern, translucent UI components
- 🌈 **Gradient Themes** - Beautiful blue-purple-pink color schemes
- 🌙 **Dark/Light Mode** - Seamless theme switching with system preference detection
- ⚡ **Smooth Animations** - Micro-interactions and page transitions
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- 🔄 **Loading States** - Skeleton screens and progress indicators

### Technical Excellence

- 🏗️ **Type-Safe** - Full TypeScript implementation across the stack
- 🚀 **Performance** - Server-side rendering, caching, and optimization
- 🔒 **Security** - JWT authentication, input validation, and CSRF protection
- 📊 **GraphQL API** - Efficient data fetching with code generation
- 🗄️ **Database** - PostgreSQL with Prisma ORM and migrations
- 🐳 **Containerized** - Docker support for development and deployment

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend - Next.js"
        A[React Components] --> B[Apollo Client]
        B --> C[GraphQL Queries]
        A --> D[Next.js Router]
        A --> E[Tailwind CSS]
    end
    
    subgraph "Backend - NestJS"
        F[GraphQL Resolver] --> G[Service Layer]
        G --> H[Prisma ORM]
        F --> I[Authentication Guard]
        F --> J[Validation Pipes]
    end
    
    subgraph "Database"
        K[(PostgreSQL)]
        H --> K
    end
    
    subgraph "External Services"
        L[AWS S3/CDN]
        M[Email Service]
    end
    
    C --> F
    G --> L
    G --> M
```

### Tech Stack

**Frontend:**

- **Next.js 15** - React framework with SSR/SSG
- **TypeScript** - Type-safe development
- **Apollo Client** - GraphQL client with caching
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Hook Form** - Form management
- **Next SEO** - SEO optimization

**Backend:**

- **NestJS 10** - Scalable Node.js framework
- **GraphQL** - API query language
- **Prisma** - Type-safe database ORM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Class Validator** - Input validation

**Database & Infrastructure:**

- **PostgreSQL** - Relational database
- **Docker** - Containerization
- **AWS S3** - File storage (optional)

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** v18 or later
- **Docker & Docker Compose** (for database)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/modern-blog-platform.git
   cd modern-blog-platform
   ```

2. **Start the database**

   ```bash
   docker-compose up -d
   ```

3. **Setup Backend**

   ```bash
   cd blog-backend
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   npm run db:seed
   npm run start:dev
   ```

4. **Setup Frontend**

   ```bash
   cd ../blog-frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - GraphQL Playground: [http://localhost:3001/graphql](http://localhost:3001/graphql)
   - Prisma Studio: [http://localhost:5555](http://localhost:5555)

### Quick Setup Script

Run the included setup script for automated installation:

```bash
chmod +x setup.sh
./setup.sh
```

---

## 📁 Project Structure

```
modern-blog-platform/
├── 📁 blog-backend/              # NestJS Backend Application
│   ├── 📁 prisma/                # Database schema and migrations
│   │   ├── schema.prisma         # Database schema definition
│   │   ├── seed.ts              # Database seeding script
│   │   └── 📁 migrations/        # Database migration files
│   ├── 📁 src/                   # Source code
│   │   ├── 📁 modules/           # Feature modules
│   │   │   ├── 📁 auth/          # Authentication module
│   │   │   ├── 📁 users/         # User management
│   │   │   ├── 📁 posts/         # Blog posts
│   │   │   ├── 📁 categories/    # Categories management
│   │   │   ├── 📁 tags/          # Tags system
│   │   │   ├── 📁 comments/      # Comments system
│   │   │   ├── 📁 media/         # File uploads
│   │   │   └── 📁 statistics/    # Analytics
│   │   ├── 📁 common/            # Shared utilities
│   │   └── 📁 config/            # Configuration files
│   └── 📁 test/                  # Test files
├── 📁 blog-frontend/             # Next.js Frontend Application
│   ├── 📁 src/                   # Source code
│   │   ├── 📁 components/        # Reusable components
│   │   │   ├── 📁 ui/            # Base UI components
│   │   │   ├── 📁 layout/        # Layout components
│   │   │   └── 📁 comments/      # Comment components
│   │   ├── 📁 pages/             # Next.js pages
│   │   ├── 📁 graphql/           # GraphQL queries/mutations
│   │   ├── 📁 lib/               # Utility libraries
│   │   ├── 📁 types/             # TypeScript definitions
│   │   └── 📁 styles/            # Global styles
│   └── 📁 public/                # Static assets
├── docker-compose.yml            # Docker services configuration
├── setup.sh                     # Quick setup script
└── README.md                    # This file
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` files in both backend and frontend directories:

**Backend (`blog-backend/.env`):**

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="your-bucket-name"
AWS_REGION="us-east-1"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

**Frontend (`blog-frontend/.env.local`):**

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001/graphql"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="GA_MEASUREMENT_ID"

# Environment
NODE_ENV="development"
```

---

## 💾 Database

### Schema Overview

The database consists of the following main entities:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id          String      @id @default(cuid())
  title       String
  content     String
  excerpt     String?
  status      PostStatus  @default(DRAFT)
  featured    Boolean     @default(false)
  views       Int         @default(0)
  author      User        @relation(fields: [authorId], references: [id])
  categories  Category[]
  tags        Tag[]
  comments    Comment[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

### Seeded Data

The platform comes with comprehensive seed data:

- **4 User Roles**: Admin, Editor, Author, User
- **5 Categories**: Technology, Web Development, DevOps, Data Science, Mobile
- **10+ Tags**: JavaScript, React, TypeScript, NestJS, etc.
- **Sample Posts**: Lorem content with Unsplash images
- **Comments**: Realistic comment threads

### Default Login Credentials

| Role   | Email                | Password  | Permissions                    |
|--------|---------------------|-----------|--------------------------------|
| Admin  | <admin@example.com>   | admin123  | Full system access             |
| Editor | <editor@example.com>  | editor123 | Content management             |
| Author | <author@example.com>  | author123 | Create and edit own posts      |
| User   | <user@example.com>    | user123   | Read and comment              |

---

## 🎨 UI/UX Features

### Design System

- **Color Palette**: Blue (#3B82F6) → Purple (#8B5CF6) → Pink (#EC4899)
- **Typography**: Inter font family with responsive scaling
- **Spacing**: 8px grid system with Tailwind utilities
- **Shadows**: Layered depth with backdrop blur effects

### Components

#### Core Components

- **PageHeader**: Gradient backgrounds with animated particles
- **PostCard**: Glass morphism cards with hover effects
- **Header**: Fixed navigation with theme toggle
- **Footer**: Newsletter signup and social links

#### Interactive Elements

- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Floating labels with validation states
- **Modals**: Backdrop blur with smooth transitions
- **Loading**: Skeleton screens and spinners

### Animations

- **Page Transitions**: Smooth fade and slide effects
- **Hover States**: Scale transforms and color transitions
- **Loading States**: Pulse animations and progress bars
- **Micro-interactions**: Button presses and form feedback

---

## 🔐 Authentication

### JWT Implementation

- **Access Tokens**: Short-lived (7 days) for API access
- **Refresh Tokens**: Long-lived for seamless re-authentication
- **Role-based Access**: Granular permissions per user role
- **Password Security**: Bcrypt hashing with salt rounds

### Protected Routes

- `/admin/*` - Admin only
- `/dashboard` - Authenticated users
- `/profile` - User profile management
- `/create` - Authors and above

### GraphQL Authentication

```typescript
// Example authenticated query
const GET_MY_POSTS = gql`
  query GetMyPosts {
    myPosts {
      id
      title
      status
      createdAt
    }
  }
`;
```

---

## 📊 API Documentation

### GraphQL Schema

The API follows GraphQL best practices with:

- **Type Safety**: Fully typed schema with code generation
- **Efficient Queries**: Resolve only requested fields
- **Real-time Updates**: Subscription support for live data
- **Error Handling**: Consistent error responses

### Key Queries

```graphql
# Get published posts with pagination
query GetPosts($page: Int!, $limit: Int!) {
  posts(page: $page, limit: $limit, status: PUBLISHED) {
    posts {
      id
      title
      excerpt
      featuredImage
      author {
        username
      }
      categories {
        name
        slug
      }
    }
    totalCount
    hasMore
  }
}
```

### Key Mutations

```graphql
# Create a new blog post
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    status
    createdAt
  }
}
```

### GraphQL Playground

Access the interactive GraphQL playground at [http://localhost:3001/graphql](http://localhost:3001/graphql) for:

- Schema exploration
- Query testing
- Documentation browsing
- Real-time query execution

---

## 🧪 Testing

### Backend Testing

```bash
cd blog-backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Testing

```bash
cd blog-frontend

# Component tests
npm run test

# Linting
npm run lint
```

### Test Structure

- **Unit Tests**: Individual component and service testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user journey testing

---

## 🚢 Deployment

### Docker Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy with scaling
docker-compose -f docker-compose.prod.yml up -d --scale frontend=3
```

### Environment Setup

1. **Production Database**: Set up PostgreSQL instance
2. **Environment Variables**: Configure all production secrets
3. **File Storage**: Set up AWS S3 or alternative CDN
4. **Domain Configuration**: Set up custom domain and SSL

### Recommended Hosting

- **Frontend**: Vercel, Netlify, or AWS CloudFront
- **Backend**: AWS ECS, DigitalOcean, or Railway
- **Database**: AWS RDS, Supabase, or PlanetScale
- **File Storage**: AWS S3, Cloudinary, or ImageKit

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Semantic commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [NestJS](https://nestjs.com/) - Progressive Node.js Framework
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [Unsplash](https://unsplash.com/) - Beautiful free images

---

<div align="center">

**Built with ❤️ by [Your Name](https://github.com/yourusername)**

[⭐ Star this repo](https://github.com/yourusername/modern-blog-platform) • [🐛 Report Bug](https://github.com/yourusername/modern-blog-platform/issues) • [💡 Request Feature](https://github.com/yourusername/modern-blog-platform/issues)

</div>
