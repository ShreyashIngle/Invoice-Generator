# Invoice Generator

A full-stack invoice generation application built with React, TypeScript, Node.js, and MongoDB.

## Project Structure for backend

```
invoice-generator/
├── backend/
│   ├── dist/                 # Compiled TypeScript output
│   ├── node_modules/         # Node.js dependencies
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── forgotPasswordController.ts
│   │   │   ├── invoiceController.ts
│   │   │   └── productController.ts
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── auth.ts
│   │   │   └── validate.ts
│   │   ├── models/         # Database models
│   │   │   ├── Invoice.ts
│   │   │   ├── Product.ts
│   │   │   └── User.ts
│   │   ├── routes/         # API routes
│   │   │   ├── auth.ts
│   │   │   ├── forgot.ts
│   │   │   ├── invoices.ts
│   │   │   └── products.ts
│   │   ├── services/       # Business logic
│   │   │   ├── emailService.ts
│   │   │   └── pdfService.ts
│   │   ├── styles/         # Styling files
│   │   ├── server.ts       # Main server file
│   │   └── tailwind.css
│   ├── .env                # Environment variables
│   ├── package.json
│   ├── package-lock.json
│   └── postcss.config.js
└── frontend/              # React frontend application
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/invoice-generator
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the development server:
```bash
npm run dev
```

The backend server will start running on `http://localhost:5000`

## Key Features

### Backend Services
1. **Email Service (`emailService.ts`)**
   - Handles all email communications
   - Password reset emails
   - Invoice notifications

2. **PDF Service (`pdfService.ts`)**
   - Generates PDF invoices
   - Uses custom template with logo (`logopdf.png`)

3. **Authentication (`auth.ts`)**
   - JWT-based authentication
   - Password hashing
   - Session management

### Controllers
- `authController.ts` - Handles user authentication
- `forgotPasswordController.ts` - Manages password reset
- `invoiceController.ts` - Invoice operations
- `productController.ts` - Product management

## Scripts

### Backend Scripts
- `npm run dev`: Start the development server with hot-reload using ts-node-dev
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server from the dist folder

## Dependencies

### Backend Dependencies
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "joi": "^17.9.1",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3",
    "nodemailer": "^6.9.15",
    "puppeteer": "^19.8.3"
  }
}
```

## Development

1. The project uses TypeScript for better type safety
2. Middleware pattern for authentication and validation
3. MVC architecture:
   - Models: MongoDB schemas
   - Controllers: Request handling
   - Services: Business logic
   - Routes: API endpoints

## Environment Setup

Ensure all environment variables are properly configured in the `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/invoice-generator
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
```

## Error Handling
- Centralized error handling middleware
- Proper HTTP status codes
- Validation using Joi
- Try-catch blocks for async operations

## Security Features
- JWT authentication
- Password hashing with bcrypt
- Input validation
- CORS configuration
- Environment variable protection


## Project Structure for frontend

```
invoice-generator/
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   │   ├── logo.png
│   │   │   └── main.png
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/         # Page components
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── store/         # Redux store
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── productSlice.ts
│   │   │   └── index.ts
│   │   ├── types/        # TypeScript type definitions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   └── tsconfig.json
```

## Frontend Setup

1. Navigate to the root directory:

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will start running on `http://localhost:5173`

## Frontend Architecture

### Components
- **Header.tsx**: Main navigation component
- **Logo.tsx**: Brand logo component
- **ProtectedRoute.tsx**: Route guard for authenticated routes

### Pages
- **Login.tsx**: User authentication
- **Register.tsx**: New user registration
- **ForgotPassword.tsx**: Password recovery initiation
- **ResetPassword.tsx**: Password reset completion
- **Products.tsx**: Product management interface

### State Management
The application uses Redux Toolkit for state management:

```typescript
store/
├── slices/
│   ├── authSlice.ts    # Authentication state
│   └── productSlice.ts # Products state
└── index.ts           # Store configuration
```

### Available Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Dependencies

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.1",
    "axios": "^1.6.7",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.22.2",
    "react-toastify": "^10.0.4"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
```

## Features

### Authentication
- JWT-based authentication
- Protected routes
- Password recovery flow

### User Interface
- Responsive design with Tailwind CSS
- Toast notifications for user feedback
- Icon support with Lucide React

### State Management
- Centralized state with Redux Toolkit
- Type-safe actions and reducers
- Persistent auth state

## Development Guidelines

1. **TypeScript**
   - Maintain proper typing for all components and functions
   - Use interfaces for component props
   - Keep types in the `types` directory

2. **Styling**
   - Use Tailwind CSS utilities
   - Follow responsive design principles
   - Maintain consistent spacing and layout

3. **State Management**
   - Use Redux for global state
   - Local state with useState when appropriate
   - Follow Redux Toolkit best practices

4. **Routing**
   - Protected routes for authenticated pages
   - Proper route organization
   - Handle 404 pages

5. **Code Organization**
   - Keep components small and focused
   - Use proper file naming conventions
   - Maintain consistent directory structure

## Building for Production

```bash
npm run build
```

This will create a `dist` directory with the production build.

## Environment Configuration

The frontend uses Vite for development and building. Configure environment variables in the following files:
- `.env`: Default environment variables
- `.env.development`: Development-specific variables
- `.env.production`: Production-specific variables

## Type Checking

```bash
npm run typescript
```

## Linting

```bash
npm run lint
```
