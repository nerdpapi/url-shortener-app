// backend/config/redis.js
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379"
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect(); //must be awaited

console.log("✅ Redis connected");

export default redisClient;
