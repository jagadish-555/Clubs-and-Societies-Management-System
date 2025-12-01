import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import clubRoutes from "./routes/clubRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import coreMemberRoutes from "./routes/coreMemberRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/gelleryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://clubs-and-societies-management-system-l87in25nt.vercel.app',
      /^https:\/\/.*\.vercel\.app$/,
      /^https:\/\/.*\.netlify\.app$/,
    ];
    
    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return pattern === origin;
      } else if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", clubRoutes);
app.use("/api", eventRoutes);
app.use("/api", coreMemberRoutes);
app.use("/api", authRoutes);
app.use("/api", galleryRoutes);
app.use("/api", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const PORT = process.env.PORT || 3001;
console.log("Starting server with environment:", process.env.NODE_ENV);
console.log("Database URL configured:", !!process.env.DATABASE_URL);
console.log("JWT Secret configured:", !!process.env.JWT_SECRET);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check available at /health`);
});
