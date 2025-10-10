// backend/src/app.js
import express from "express";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/url", urlRoutes);

// Error handler
app.use(errorHandler);

export default app;
