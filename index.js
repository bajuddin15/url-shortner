import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/user.js";
import shortUrlRoutes from "./routes/shortUrl.js";

const app = express();
connectDB();

// Error Handling middlewares
app.use(express.json());
app.use(cors());

// configure all routes

app.use("/user", userRoutes);
app.use("/url", shortUrlRoutes);

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : http://localhost:${PORT}`);
});
