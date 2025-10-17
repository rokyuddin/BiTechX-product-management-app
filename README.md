# Product Management App

A modern, full-stack product management application built with Next.js 15, React 19, Redux Toolkit, and Tailwind CSS. This application allows users to browse, create, edit, view details, and delete products with a polished UI/UX.

## 🎨 Color Palette

This project uses a carefully selected color palette:

- **Primary Dark**: `#0d1821` - Main text and headers
- **Background Light**: `#eff1f3` - Page backgrounds
- **Secondary**: `#4e6e5d` - Success states and accents
- **Accent**: `#ad8a64` - Warning states and highlights
- **Danger**: `#a44a3f` - Error states and destructive actions

## 🚀 Features

### Authentication & Session Management

- Simple email-based login system
- JWT token storage and management
- Secure logout functionality
- Protected routes with middleware

### Product Management

- **Browse Products**: View all products with pagination
- **Real-time Search**: Search products by name with debounced input
- **Category Filtering**: Filter products by category
- **CRUD Operations**:
  - Create new products with validation
  - Edit existing products
  - View detailed product information
  - Delete products with confirmation

### User Experience

- **Responsive Design**: Works seamlessly on mobile and desktop
- **Loading States**: Clear loading indicators for all operations
- **Error Handling**: Comprehensive error messages and handling
- **Form Validation**: Client-side validation with inline feedback
- **Modern UI**: Clean, professional interface with smooth transitions

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with custom color palette
- **TypeScript**: Full TypeScript implementation
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/login/        # Login page
│   ├── products/          # Products management pages
│   │   ├── [id]/          # Dynamic product routes
│   │   ├── create/        # Create product page
│   │   └── page.tsx        # Products listing page
│   ├── globals.css        # Global styles with custom palette
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── header.tsx         # Application header
│   ├── product-card.tsx   # Product card component
│   ├── product-filter.tsx # Search and filter controls
│   ├── product-form.tsx   # Create/edit product form
│   ├── product-grid.tsx   # Products grid layout
│   └── pagination.tsx     # Pagination component
├── hooks/                 # Custom React hooks
│   └── use-debounce.ts    # Debounce hook for search
├── lib/                   # Utility libraries
│   ├── api.ts             # Direct API client
│   ├── auth-utils.ts      # Authentication utilities
│   ├── base-api.ts        # RTK Query base configuration
│   ├── hook.ts            # Redux hooks
│   └── store.ts           # Redux store configuration
├── services/              # API service layer
│   ├── auth-api.ts        # Authentication API
│   ├── categories-api.ts  # Categories API
│   ├── index.ts           # Service exports
│   └── products-api.ts    # Products API
├── slices/                # Redux slices
│   ├── auth-slice.ts      # Authentication state
│   └── product-slice.ts   # Products state
└── types/                 # TypeScript type definitions
    ├── auth.ts            # Authentication types
    ├── category.ts        # Category types
    ├── index.ts           # Type exports
    └── product.ts         # Product types
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd product-management-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=https://api.bitechx.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Login Credentials

Use any email address to login (e.g., `test@example.com`). The authentication system will accept any valid email format.

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server

## 🔐 Authentication Flow

1. User enters email on login page
2. System calls `POST /auth` API endpoint
3. JWT token is stored in Redux store and cookies
4. Token is automatically included in all subsequent API requests
5. Middleware protects routes and redirects unauthenticated users

## 🎯 API Integration

The application integrates with the BitechX Product Management API:

- **Base URL**: `https://api.bitechx.com`
- **Authentication**: Bearer token in Authorization header
- **Endpoints**:
  - `POST /auth` - User authentication
  - `GET /products` - List products with pagination and search
  - `GET /products/{id}` - Get single product
  - `POST /products` - Create new product
  - `PUT /products/{id}` - Update product
  - `DELETE /products/{id}` - Delete product
  - `GET /categories` - List categories

## ✨ Key Features Implementation

### State Management

- Redux Toolkit for global state management
- RTK Query for server state management and caching
- Automatic cache invalidation on mutations

### Form Handling

- React Hook Form for form state management
- Custom validation with real-time feedback
- Support for both create and edit modes in single form component

### Search & Filtering

- Debounced search input (500ms delay)
- Category-based filtering
- Real-time results updating

### Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions

## 🚀 Deployment

This project is configured for easy deployment on:

- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **Render**

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 📝 Development Notes

- Uses Next.js 15 with App Router for modern React development
- Implements Server-Side Rendering (SSR) and Static Site Generation (SSG) where appropriate
- Follows React best practices with functional components and hooks
- Comprehensive TypeScript coverage for type safety
- Custom Tailwind configuration with project-specific color palette

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a coding assignment and is not licensed for public use.
