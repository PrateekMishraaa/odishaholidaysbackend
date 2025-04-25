import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import EmailRoutes from "./email.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;


app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://odisha-holidays-landingpage.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

mongoose.connect(process.env.MONGOURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to database"))
.catch((err) => console.log("❌ Database connection error:", err));


app.use("/api", EmailRoutes);

app.get("/", (req, res) => {
  res.send("👋 Hello from backend");
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running at http://0.0.0.0:${PORT}`);
});
