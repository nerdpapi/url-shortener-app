import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


// connect DB
connectDB();

// routes
app.use("/api/url", urlRoutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
