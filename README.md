# Instagram OAuth MERN Application

A production-ready MERN stack application featuring Instagram OAuth login with role-based access control (Business/Creator accounts only).

## Features

- **Instagram Login**: "Continue with Instagram" flow using Basic Display API.
- **Role Verification**: Restricts access to Business/Creator accounts.
- **Secure Authentication**: JWT-based session management with HttpOnly cookies.
- **Modern UI**: Responsive design using Tailwind CSS.
- **Dashboard**: Displays user profile, followers count, and media metrics.
- **Security**: Helmet, Rate Limiting, CORS, and Input Validation (Zod).

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Security**: Helmet, Express-Rate-Limit, JWT, CSRF protection (via state).

## Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)
- Instagram App (Basic Display API) configured.

## Setup Instructions

### 1. Clone & Install Dependencies

\`\`\`bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
\`\`\`

### 2. Environment Configuration

Create \`.env\` file in \`backend/\`:

\`\`\`env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/practice_mern  # Or your MongoDB Atlas URI
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Instagram Credentials
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
REDIRECT_URI=http://localhost:5173/instagram-callback

# JWT Configuration
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
\`\`\`

Create \`.env\` file in \`frontend/\`:

\`\`\`env
VITE_API_URL=http://localhost:3001
\`\`\`

### 3. Run the Application

**Backend:**
\`\`\`bash
cd backend
npm start
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

Visit \`http://localhost:5173\` to view the app.

## Deployment Guide

### Backend (Render/Railway/AWS)

1.  **Build**: Not required for Node.js, just run \`src/server.js\`.
2.  **Environment Variables**: Set all variables from \`backend/.env\` in your cloud provider dashboard.
3.  **Command**: \`npm start\`

### Frontend (Vercel/Netlify)

1.  **Build**: \`npm run build\`
2.  **Output Directory**: \`dist\`
3.  **Environment Variables**: Set \`VITE_API_URL\` to your deployed backend URL.
4.  **Rewrite Rules**: For Single Page Apps, configure rewrites to \`index.html\` for all routes. (Vercel does this automatically).

## Directory Structure

\`\`\`
.
├── backend/
│   ├── src/
│   │   ├── config/         # DB, Logger
│   │   ├── controllers/    # Route Logic
│   │   ├── middleware/     # Auth, Error, Validation
│   │   ├── models/         # Mongoose Models
│   │   ├── routes/         # API Routes
│   │   ├── services/       # Business Logic (Instagram, Token)
│   │   ├── utils/          # Helpers
│   │   ├── app.js          # Express App Setup
│   │   └── server.js       # Entry Point
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/     # UI & Layout
│   │   ├── context/        # Auth State
│   │   ├── pages/          # Views
│   │   ├── services/       # API Client
│   │   └── ...
│   └── ...
└── ...
\`\`\`
