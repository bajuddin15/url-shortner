import asyncHandler from "express-async-handler";
import axios from "axios";
import Shorturls from "../models/shortUrl.js";
import User from "../models/user.js";

const createShortUrl = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;
  const user = req.user;

  try {
    let shortUrl = await Shorturls.findOne({ originalUrl: longUrl });

    if (!shortUrl) {
      const response = await axios.post(
        `http://tinyurl.com/api-create.php?url=${longUrl}`
      );
      shortUrl = new Shorturls({
        url: response.data,
        originalUrl: longUrl,
      });
      await shortUrl.save();
    }

    user.urls.addToSet(shortUrl._id);
    await user.save();

    res.json({ short_url: shortUrl.url });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export { createShortUrl };
