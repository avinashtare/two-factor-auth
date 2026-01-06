# 2FA Authentication System

A full-stack React and Express application demonstrating how Two-Factor Authentication (2FA) works with a clean architecture pattern.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **Two-Factor Authentication (2FA)**: Time-based One-Time Password (TOTP) implementation
- **Account Recovery**: Recovery code system for lost 2FA access
- **Stage-based Authorization**: Multi-stage authentication middleware
- **Modern UI**: Glassmorphic design with React and Tailwind CSS
- **Clean Architecture**: Repository pattern with separation of concerns

## 🏗️ Architecture

### Backend Structure

```
backend/
├── controllers/       # Request handlers
├── services/         # Business logic
├── repositories/     # Data access layer
├── middleware/       # Authentication & authorization
├── routes/          # API endpoints
└── models/          # Database models
```

### Frontend Structure

```
frontend/
├── components/      # React components
├── pages/          # Page components
├── services/       # API integration
├── context/          # State management
└── utils/          # Helper functions
```

## 🔐 Authentication Flow

### 1. Registration & Login

- User registers with email and password
- User logs in with credentials
- JWT token issued with `password` stage

### 2. 2FA Activation

- User activates 2FA from settings
- QR code generated for authenticator app
- Recovery codes provided for backup

### 3. 2FA Verification

- User enters 6-digit TOTP code
- Upon success, JWT upgraded to `2fa` stage
- Full access granted to protected routes

### 4. Account Recovery

- User enters recovery code if 2FA is lost
- Recovery code validated (one-time use)
- User prompted to set up new 2FA

## 📡 API Endpoints

| Method | Endpoint                 | Auth Stage     | Description                      |
| ------ | ------------------------ | -------------- | -------------------------------- |
| POST   | `/api/user/register`     | None           | Register new user                |
| POST   | `/api/user/login`        | None           | User login                       |
| POST   | `/api/user/activate-2fa` | Password       | Enable 2FA                       |
| POST   | `/api/user/verify-2fa`   | Password       | Verify TOTP code                 |
| PUT    | `/api/user/recover-2fa`  | Password       | Recover account with backup code |
| POST   | `/api/user/me`           | 2FA + Password | Get user profile                 |
| POST   | `/api/user/logout`       | 2FA + Password | Logout user                      |

## 🛠️ Tech Stack

### Backend

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JWT** - Token-based authentication
- **Speakeasy** - TOTP generation
- **bcrypt** - Password hashing
- **QRCode** - QR code generation

### Frontend

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (or your preferred database)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**

```env
NODE_ENV="development" #production
PORT=3000
DATABASE_URI="mongodb://localhost:27017/two-factor-auth"
ACCESS_TOKEN_SECRET="you token"
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or contributions, contact: avinashtare.work@gmail.com

## Author

卐 🕉 Avinash Tare 🕉 卐
