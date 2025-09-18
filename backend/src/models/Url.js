// backend/models/Url.js
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  originalUrl: { 
    type: String, 
    required: true 
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a TTL (Time-To-Live) index on the `createdAt` field
// Documents will be automatically deleted 7 days after their creation time.
// 60 seconds * 60 minutes * 24 hours * 7 days = 604800 seconds
urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export default mongoose.model("Url", urlSchema);
