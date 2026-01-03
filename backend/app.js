import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import helmet from "helmet";

import userRouter from "./routes/user.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { fileURLToPath } from "node:url";
import path from "node:path";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production"; // ✅ Auto detect

// ✅ Middleware Setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json({ limit: "1024mb" }));
app.use(express.urlencoded({ limit: "1024mb", extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running and healthy!",
    timestamp: new Date().toISOString(),
    environment: isProduction ? "production" : "development",
  });
});

// ✅ 404 Handler for Unknown API Routes
app.use("/api/*", (req, res) =>
  res.status(404).json({ success: false, message: "API endpoint not found" })
);

// ✅ Error Handler
app.use(errorHandler);

if (isProduction) {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.log(
    "💻 Development mode: API only. Frontend served separately on Vite."
  );
}

export { app };
