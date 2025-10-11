// backend/src/controllers/urlController.js
import Url from "../models/Url.js";
import generateShortId from "../utils/generateShortId.js";
import redisClient from "../config/redis.js";

// 🧾 List all URLs
export const listUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // latest first
    console.log(`📄 Fetched ${urls.length} URLs from database`);
    res.json(urls);
  } catch (err) {
    console.error("❌ listUrls error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✂️ Shorten URL
export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "Original URL required" });

  try {
    console.log(`🔍 Checking cache for ${originalUrl}`);
    const cached = await redisClient.get(originalUrl);
    if (cached) {
      console.log(`✅ Found in Redis cache → shortId: ${cached}`);
      return res.json({ originalUrl, shortUrl: `${process.env.BASE_URL}/${cached}` });
    }

    // Create new shortId
    const shortId = generateShortId();
    const newUrl = new Url({ shortId, originalUrl });
    await newUrl.save();

    // Save in Redis (bi-directional)
    await redisClient.set(shortId, originalUrl);
    await redisClient.set(originalUrl, shortId);

    console.log(`✨ Created new short URL: ${shortId} → ${originalUrl}`);
    res.json({ originalUrl, shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (err) {
    console.error("❌ shortenUrl error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔁 Redirect to original URL
export const redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    console.log(`➡️ Redirect request for shortId: ${shortId}`);

    // Check Redis cache first
    const cached = await redisClient.get(shortId);
    if (cached) {
      console.log(`🔄 Cache hit → redirecting to ${cached}`);
      return res.redirect(301, cached);
    }

    // Fallback to MongoDB
    const url = await Url.findOne({ shortId });
    if (url) {
      console.log(`💾 Found in MongoDB → redirecting to ${url.originalUrl}`);
      await redisClient.set(shortId, url.originalUrl); // Cache for next time
      return res.redirect(301, url.originalUrl);
    }

    console.warn(`⚠️ No URL found for shortId: ${shortId}`);
    res.status(404).json({ error: "URL not found" });
  } catch (err) {
    console.error("❌ redirectUrl error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
