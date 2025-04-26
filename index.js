import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import EmailRoutes from "./email.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(express.json());

// ✅ Fixed CORS origin values (no trailing slashes)
app.use(cors({
  origin: [
    "https://odishaholidaysbackend.onrender.com",
    "https://odisha-holidays-landingpage.vercel.app",
    "https://odishaholidays.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log("✅ Connected to database"))
  .catch((err) => console.log("❌ Database connection error:", err));

// Routes
app.use("/api", EmailRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("👋 Hello from backend");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running at http://0.0.0.0:${PORT}`);
});
