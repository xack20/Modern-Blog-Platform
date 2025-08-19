# Modern Blog Platform

A modern, full-stack blog platform built with Next.js, NestJS, GraphQL, and Prisma.

## Project Structure

- `blog-backend`: NestJS backend with GraphQL API and Prisma ORM
- `blog-frontend`: Next.js frontend with Apollo Client

## Prerequisites

- Node.js v18 or later
- Docker and Docker Compose (for PostgreSQL database)
- npm or yarn package manager

## Getting Started

### Step 1: Start the Database

```bash
docker-compose up -d
```

This will start a PostgreSQL database on port 5432.

### Step 2: Set up the Backend

Navigate to the backend directory:

```bash
cd blog-backend
```

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Apply database migrations:

```bash
npm run prisma:migrate
```

Seed the database with initial data:

```bash
npm run db:seed
```

Start the backend development server:

```bash
npm run start:dev
```

The backend will be available at [http://localhost:3001/graphql](http://localhost:3001/graphql).

### Step 3: Set up the Frontend

In a new terminal, navigate to the frontend directory:

```bash
cd blog-frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Seed Data

The seed data includes:

- Users with different roles (admin, editor, author, user)
- Categories (Technology, Web Development, DevOps, Data Science, Mobile Development)
- Tags (JavaScript, React, TypeScript, NestJS, Next.js, GraphQL, Prisma, Docker, AWS, CI/CD)
- Posts with content, comments, and media

### Login Credentials

| Role  | Email | Password |
|-------|-------|----------|
| Admin | `admin@example.com` | admin123 |
| Editor | `editor@example.com` | editor123 |
| Author | `author@example.com` | author123 |
| User | `user@example.com` | user123 |

## Development Tools

- Access Prisma Studio to view and edit the database:

```bash
cd blog-backend
npm run prisma:studio
```

Prisma Studio will be available at [http://localhost:5555](http://localhost:5555).

## Additional Commands

### Backend

- `npm run build`: Build the backend application
- `npm run start:prod`: Run the backend in production mode
- `npm run lint`: Lint the code
- `npm run test`: Run tests

### Frontend

- `npm run build`: Build the frontend application
- `npm run start`: Run the frontend in production mode
- `npm run lint`: Lint the code
