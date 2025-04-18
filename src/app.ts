import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import barRoutes from "./routes/barRoutes";
import userRoutes from "./routes/userRoutes";


const app = express();

// 🔹 Security & Parsing Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limiting

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/bars", barRoutes);
app.use("/api/users", userRoutes);

export default app;
