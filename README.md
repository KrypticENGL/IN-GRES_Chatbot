# In-Gres

A full-stack React application with Express server, featuring Firebase authentication and a modern UI.

## Project Structure

```
in-gres/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Express backend
├── package.json     # Root package with workspace configuration
└── README.md        # This file
```

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher)

You can check your versions by running:
```bash
node --version
npm --version
```

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd in-gres
```

### 2. Install Dependencies
```bash
# Install all dependencies (client, server, and root)
npm run install:all

# Or install individually:
npm run install:client
npm run install:server
```

### 3. Environment Configuration

#### Client Environment Variables
Create a `.env` file in the `client/` directory:
```bash
cp client/.env.example client/.env
```

Edit `client/.env` with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### Server Environment Variables
Create a `.env` file in the `server/` directory:
```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your server configuration:
```env
PORT=8080
NODE_ENV=development
```

### 4. Build and Run

#### Development Mode
```bash
# Run both client and server in development mode
npm run dev

# Or run individually:
npm run dev:client    # Frontend on http://localhost:5173
npm run dev:server    # Backend on http://localhost:8080
```

#### Production Mode
```bash
# Build the client
npm run build

# Start the production server
npm start
```

## Available Scripts

### Root Level Scripts
- `npm run install:all` - Install all dependencies
- `npm run build` - Build the client for production
- `npm start` - Start the production server
- `npm run dev` - Run both client and server in development mode
- `npm run lint` - Run ESLint on the client code
- `npm run clean` - Remove all node_modules and build artifacts
- `npm run setup` - Complete setup (install + build)

### Client Scripts (run from client/ directory)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts (run from server/ directory)
- `npm start` - Start the server with nodemon

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and configure Google Sign-In
3. Get your Firebase configuration from Project Settings
4. Add the configuration to your `client/.env` file

## Deployment

### Using Docker
```bash
# Build the Docker image
docker build -t in-gres .

# Run the container
docker run -p 8080:8080 in-gres
```

### Manual Deployment
1. Build the client: `npm run build`
2. Set production environment variables
3. Start the server: `npm start`

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in your server `.env` file
2. **Firebase authentication errors**: Verify your Firebase configuration in `client/.env`
3. **Build failures**: Make sure all dependencies are installed with `npm run install:all`
4. **TypeScript errors**: Run `npm run lint` to check for issues

### Getting Help

If you encounter issues:
1. Check that all prerequisites are installed
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check the console for error messages

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, CSS3
- **Backend**: Express.js, Node.js
- **Authentication**: Firebase Auth with Google Sign-In
- **Build Tool**: Vite
- **Package Manager**: npm with workspaces

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details
