import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Add CSP headers to allow DevTools and other necessary connections
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: https://lh3.googleusercontent.com; " +
    "connect-src 'self' ws: wss: http: https: https://accounts.google.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "frame-src 'self' https://accounts.google.com https://productionproject-24d93.firebaseapp.com; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
  );

  // Add COOP header to allow popup communication
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../client/dist/index.html"));
})

app.get('/dashboard', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../client/dist/index.html"));
})

app.get('/about', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../client/dist/index.html"));
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes can be added here
app.get('/api/status', (req, res) => {
  res.status(200).json({
    message: 'In-Gres API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});


app.listen(port, (error) => {
  if (error) { console.log(`Server failed to start ${error}`) }
  else { console.log(`Server running on port ${port}`) }
});
