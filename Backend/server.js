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
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'https://clubs-and-societies-management-system-frontend.vercel.app',
    'https://clubs-and-societies-management-system-frontend.netlify.app',
    // Add your actual frontend deployment URL here when you get it
  ],
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
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
