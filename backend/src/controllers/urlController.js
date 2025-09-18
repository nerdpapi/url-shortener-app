// backend/src/controllers/urlController.js
import Url from "../models/Url.js";
import generateShortId from "../utils/generateShortId.js";
import redisClient from "../config/redis.js";


// New controller: list all URLs
export const listUrls = async (req, res) => {
    try {
      const urls = await Url.find().sort({ createdAt: -1 }); // latest first
      res.json(urls); // send as JSON
    } catch (err) {
      console.error("❌ listUrls error:", err);
      res.status(500).json({ error: "Server error" });
    }
  };

export const shortenUrl = async (req, res, next) => {
     const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: "Original URL required" });

  try {
    // 1️⃣ Check Redis cache first
    const cached = await redisClient.get(originalUrl);
    if (cached) {
      return res.json({ originalUrl, shortUrl: `${process.env.BASE_URL}/${cached}` });
    }
        // 3️⃣ Create shortId and save to DB
        const shortId = generateShortId();
        // const newUrl = await Url.create({ shortId, originalUrl }); OR
        const newUrl = new Url({ shortId, originalUrl });
        await newUrl.save();

        // 3️⃣ Save both directions in Redis (bi-directional mapping)
        await redisClient.set(shortId, originalUrl);
        await redisClient.set(originalUrl, shortId);

        res.json({ originalUrl, shortUrl: `${process.env.BASE_URL}/${shortId}` });
    } catch (err) {
        console.error("❌ shortenUrl error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

export const redirectUrl = async (req, res) => {
    const { shortId } = req.params;
    try {
        // 1️⃣ Check Redis cache first
        const cached = await redisClient.get(shortId);
        if (cached) return res.redirect(301, cached);

        // 2️⃣ Fallback to DB
        const url = await Url.findOne({ shortId });
        if (url) {
            await redisClient.set(shortId, url.originalUrl); // cache for next time
            return res.redirect(301, url.originalUrl);
        }

        res.status(404).json({ error: "URL not found" });
    } catch (err) {
        console.error("❌ redirectUrl error:", err);
        res.status(500).json({ error: "Server error" });
    }
};