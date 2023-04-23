import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createShortUrl } from "../controllers/shortUrl.js";
const router = express.Router();

router.route("/shorten").post(protect, createShortUrl);

export default router;
