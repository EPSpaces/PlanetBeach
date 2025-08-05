# 🌊 PlanetBeach - Gamifying Ocean Cleanup

**Transforming ocean conservation through AI-powered gamification and community engagement**

[![Video Demo](https://img.shields.io/badge/Video-Demo-blue)](https://share.icloud.com/photos/0987jJNDdnv1aUtqpCYtmFwyw)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-success)](https://nodejs.org/)
[![Swift](https://img.shields.io/badge/Swift-5.0+-orange)](https://swift.org/)

## 🎯 Overview

PlanetBeach is an innovative mobile and web application that gamifies ocean cleanup efforts by combining AI-powered trash detection with social features. Users can photograph trash, earn rewards through AI analysis, compete on leaderboards, and join local cleanup chapters to make a real environmental impact.

## ✨ Key Features

### 🤖 AI-Powered Trash Detection
- **Smart Camera System**: Uses advanced AI (Claude 3.5 Sonnet) to analyze photos and identify trash
- **Intelligent Scoring**: Automatically calculates rewards based on trash quantity, type, and environmental impact
- **Real-time Analysis**: Instant feedback and reward calculation

### 🎮 Gamification Elements
- **Power & Tokens**: Earn points for each piece of trash collected
- **Global Leaderboards**: Compete with users worldwide
- **Chapter System**: Join local communities like "Seattle Chapter"
- **Achievement System**: Track your environmental impact

### 👥 Community Features
- **Local Chapters**: Connect with nearby environmental enthusiasts
- **Real-time Statistics**: See global trash collection progress
- **User Profiles**: Track personal achievements and contributions
- **Social Leaderboards**: Chapter-based competition

### 📱 Cross-Platform Experience
- **Native iOS App**: Built with SwiftUI for optimal mobile experience
- **RESTful API**: Node.js/Express backend with MongoDB
- **Secure Authentication**: JWT-based auth with Auth0 integration

## 🏗️ Architecture

### Backend (Node.js/Express)
```
├── index.js              # Main server entry point
├── routes/
│   ├── authRoutes.js     # Authentication endpoints
│   ├── apiRoutes.js      # User data & leaderboards
│   └── aiRoutes.js       # AI trash detection
├── schemas/
│   ├── User.model.js     # User database schema
│   └── Leadboard.model.js # Leaderboard schema
└── utils/
    └── authUtils.js      # JWT & security utilities
```

### Frontend (Swift/SwiftUI)
```
├── Planet_BeachApp.swift # App entry point
├── MainView.swift        # Main app navigation
├── ContentView.swift     # Dashboard & statistics
├── CameraView.swift      # AI-powered camera
├── AuthView.swift        # Login/signup
├── ChapterView.swift     # Local community features
├── AccountView.swift     # User profile
└── API.swift            # Backend communication
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance
- Anthropic API key (for AI analysis)
- Auth0 account (for authentication)
- Xcode (for iOS development)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/EPSpaces/PlanetBeach.git
   cd PlanetBeach
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .example_env .env
   ```
   
   Fill in your environment variables:
   ```env
   AUTH0_SECRET=your_auth0_secret
   AUTH0_CLIENTID=your_auth0_client_id
   MONGO_URI=your_mongodb_connection_string
   ANTHROPIC_API_KEY=your_anthropic_api_key
   PORT=3000
   TOKEN_SECRET=your_jwt_secret
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### iOS App Setup

1. **Open the project in Xcode**
   ```bash
   open "Planet Beach/Planet Beach.xcodeproj"
   ```

2. **Update API endpoints**
   - Modify the base URL in `API.swift` to point to your backend server

3. **Build and run**
   - Select your target device/simulator
   - Press Cmd+R to build and run

## 🔧 API Endpoints

### Authentication
- `POST /signin` - User login
- `POST /signup` - User registration  
- `POST /validate` - Token validation

### User Data
- `GET /api/users` - Get user profile
- `POST /api/tokens` - Update user tokens
- `POST /api/power` - Update user power
- `POST /api/trash` - Update trash count

### AI & Analytics
- `POST /ai/trash` - AI-powered trash analysis
- `GET /api/trash` - Global trash statistics
- `GET /api/world` - Global leaderboard

## 🤖 AI Integration

The application uses Anthropic's Claude 3.5 Sonnet model for intelligent trash detection:

- **Image Analysis**: Identifies trash types, quantities, and environmental impact
- **Smart Scoring**: Awards points based on trash rarity and cleanup difficulty
- **False Positive Prevention**: Distinguishes between actual trash and natural objects
- **Reward Calculation**: Dynamic point system (0-300 tokens based on impact)

## 🎮 Gamification System

### Scoring Mechanism
- **1-3 tokens**: Small common trash (bottles, wrappers)
- **5-10 tokens**: Moderate amount or uncommon items
- **15-30 tokens**: Large quantities or harmful materials
- **50-100 tokens**: Significant environmental impact
- **150-300 tokens**: Exceptional finds or large-scale cleanup

### User Progression
- **Power**: Overall environmental impact score
- **Tokens**: Spendable currency for app features
- **Trash Count**: Total pieces of trash collected
- **Leaderboard Ranking**: Position in local/global rankings

## 🌍 Environmental Impact

PlanetBeach aims to:
- **Motivate Action**: Make environmental cleanup engaging and rewarding
- **Build Communities**: Connect like-minded individuals for collective action
- **Track Progress**: Provide real-time feedback on environmental impact
- **Scale Solutions**: Enable global participation in local cleanup efforts

## 🛠️ Tech Stack

**Backend**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Anthropic AI API
- Auth0 Integration
- Multer (file uploads)

**Frontend (iOS)**
- Swift & SwiftUI
- UIKit (Camera integration)
- URLSession (API communication)
- UserDefaults (local storage)

**AI & ML**
- Anthropic Claude 3.5 Sonnet
- Image analysis and classification
- Natural language processing

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Auth0 Integration**: Enterprise-grade identity management
- **Password Hashing**: Bcrypt encryption for user passwords
- **API Rate Limiting**: Protection against abuse
- **Input Validation**: Comprehensive data sanitization

## 📊 Current Status

### ✅ Completed Features
- AI-powered trash detection system
- User authentication and management
- Leaderboard and scoring system
- Native iOS application
- RESTful API backend
- Real-time statistics

### 🚧 Known Issues
- Image submission from mobile to server (temporarily hardcoded)
- Live image display API connection (hardcoded for demo)

### 🔮 Future Enhancements
- Real-time image processing pipeline
- Enhanced camera integration
- Push notifications
- Offline mode support
- Expanded gamification features
- Web dashboard
- Additional AI models
- Blockchain integration for rewards

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on:
- Code style and standards
- Pull request process
- Issue reporting
- Feature requests

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**EPSpaces Team**
- Environmental technology innovators
- Passionate about combining AI with environmental action
- Committed to scalable sustainability solutions

## 📞 Contact & Support

- **Project Repository**: [GitHub](https://github.com/EPSpaces/PlanetBeach)
- **Demo Video**: [Watch Here](https://share.icloud.com/photos/0987jJNDdnv1aUtqpCYtmFwyw)
- **Issues**: Please use GitHub Issues for bug reports and feature requests

---

**Join the movement. Clean the oceans. Save the planet. 🌊**

*Making environmental action accessible, engaging, and impactful through technology.*