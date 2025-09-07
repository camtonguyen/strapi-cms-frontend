# Strapi CMS Frontend

A modern, production-ready frontend application for a Strapi CMS-powered blog built with React Router and Apollo GraphQL.

## Features

- 🚀 Server-side rendering with React Router v7
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization with Vite
- 🔄 GraphQL data loading with Apollo Client
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📱 Responsive design with modern UI components
- 🏗️ Strapi CMS integration
- 📖 [React Router docs](https://reactrouter.com/)
- 🎯 [Apollo Client docs](https://www.apollographql.com/docs/react/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- A running Strapi CMS backend with GraphQL enabled

### Installation

Install the dependencies:

```bash
pnpm install
# or
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:1337
```

Replace `http://localhost:1337` with your Strapi CMS backend URL.

### Development

Start the development server with HMR:

```bash
pnpm dev
# or
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm build
# or
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm build`

```
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Project Structure

```
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (Button, Card, Input)
│   │   ├── FeatureArticles.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── FeatureTopics.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── routes/              # React Router routes
│   │   ├── home/           # Home page
│   │   ├── article/        # Article pages
│   │   ├── topic/          # Topic pages
│   │   ├── page/           # Generic pages
│   │   └── layouts/        # Layout components
│   ├── queries/            # GraphQL queries and fragments
│   │   ├── fragments/      # Reusable GraphQL fragments
│   │   ├── global/         # Global queries
│   │   └── pages/          # Page-specific queries
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── apollo.ts           # Apollo Client configuration
│   ├── root.tsx            # Root component
│   └── app.css             # Global styles
├── public/                 # Static assets
├── components.json         # UI component configuration
├── react-router.config.ts  # React Router configuration
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## Key Technologies

- **React Router v7**: Modern routing with SSR support
- **Apollo Client**: GraphQL client with React Router integration
- **Strapi CMS**: Headless CMS backend
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Radix UI**: Accessible component primitives

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling with a custom design system. The UI components are built using Radix UI primitives for accessibility and consistency.

Key styling features:

- Dark theme by default
- Responsive design with mobile-first approach
- Custom component variants using `class-variance-authority`
- Utility classes with `tailwind-merge` for conditional styling

---

Built with ❤️ using React Router, Apollo GraphQL, and Strapi CMS.
