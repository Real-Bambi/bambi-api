import mongoose from "mongoose";
import normalize from "normalize-mongoose";

const ratingSchema = new mongoose.Schema(
  {
    advert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advert",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stars: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate ratings (one user per advert)
ratingSchema.index({ advert: 1, user: 1 }, { unique: true });

ratingSchema.plugin(normalize);

export const Rating = mongoose.model("Rating", ratingSchema);
