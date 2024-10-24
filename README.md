# Invoice Generator

A full-stack invoice generation application built with React, TypeScript, Node.js, and MongoDB.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Features](#features)
6. [Development Guidelines](#development-guidelines)
7. [API Documentation](#api-documentation)
8. [Building for Production](#building-for-production)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Project Structure

### Backend Structure
```
backend/
├── dist/                 # Compiled TypeScript output
├── node_modules/         # Node.js dependencies
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   │   ├── authController.ts
│   │   ├── forgotPasswordController.ts
│   │   ├── invoiceController.ts
│   │   └── productController.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.ts
│   │   └── validate.ts
│   ├── models/         # Database models
│   │   ├── Invoice.ts
│   │   ├── Product.ts
│   │   └── User.ts
│   ├── routes/         # API routes
│   │   ├── auth.ts
│   │   ├── forgot.ts
│   │   ├── invoices.ts
│   │   └── products.ts
│   ├── services/       # Business logic
│   │   ├── emailService.ts
│   │   └── pdfService.ts
│   ├── styles/         # Styling files
│   ├── server.ts       # Main server file
│   └── tailwind.css
├── .env                # Environment variables
├── package.json
└── postcss.config.js
```

### Frontend Structure
```
frontend/
├── src/
│   ├── assets/         # Static assets
│   │   ├── logo.png
│   │   └── main.png
│   ├── components/     # Reusable components
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/         # Page components
│   │   ├── ForgotPassword.tsx
│   │   ├── Login.tsx
│   │   ├── Products.tsx
│   │   ├── Register.tsx
│   │   └── ResetPassword.tsx
│   ├── store/         # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   └── productSlice.ts
│   │   └── index.ts
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── tsconfig.json
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/invoice-generator
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
```

4. Start development server:
```bash
npm run dev
```

### Backend Dependencies
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "joi": "^17.9.1",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3",
    "nodemailer": "^6.9.15",
    "puppeteer": "^19.8.3"
  }
}
```

## Frontend Setup

1. Navigate to the root directory:

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

### Frontend Dependencies
```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.1",
    "axios": "^1.6.7",
    "react": "^18.3.1",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.22.2",
    "react-toastify": "^10.0.4"
  }
}
```

## Features

### Backend Features
1. **Authentication Services**
   - JWT-based authentication
   - Password hashing with bcrypt
   - Session management

2. **Email Services**
   - Password reset emails
   - Invoice notifications
   - Custom email templates

3. **PDF Services**
   - Invoice generation
   - Custom PDF templates
   - Dynamic content rendering

4. **Security Features**
   - Input validation with Joi
   - CORS configuration
   - Environment variable protection

### Frontend Features
1. **Authentication**
   - Protected routes
   - Login/Register flows
   - Password recovery system

2. **User Interface**
   - Responsive design
   - Tailwind CSS styling
   - Toast notifications

3. **State Management**
   - Redux Toolkit implementation
   - Type-safe actions
   - Persistent auth state

## Development Guidelines

### Backend Development
1. **Architecture**
   - MVC pattern
   - Service-based business logic
   - Middleware pattern

2. **Error Handling**
   - Centralized error middleware
   - HTTP status codes
   - Async/await with try-catch

### Frontend Development
1. **TypeScript**
   - Strong typing
   - Interface definitions
   - Type safety

2. **Component Structure**
   - Atomic design
   - Reusable components
   - Props validation

3. **State Management**
   - Redux best practices
   - Local state management
   - Side effects handling

## Building for Production

### Backend Build
```bash
cd backend
npm run build
npm start
```

### Frontend Build
```bash
npm run build
```

## Available Scripts

### Backend Scripts
- `npm run dev`: Development server
- `npm run build`: Build TypeScript
- `npm start`: Production server

### Frontend Scripts
- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run lint`: ESLint check
- `npm run preview`: Preview build

## License
ISC
