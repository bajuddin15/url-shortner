import mongoose from "mongoose";

const schema = mongoose.Schema;

const urlSchema = new schema(
  {
    url: String,
    originalUrl: String,
    createdAt: Date,
  },
  {
    timestamps: true,
  }
);

const Shorturls = mongoose.model("Shorturls", urlSchema);

export default Shorturls;
