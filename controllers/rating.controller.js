import mongoose from "mongoose";
import { Rating } from "../models/rating.model.js";
import { Advert } from "../models/advert.model.js";

//    Submit or update rating
// export const rateAdvert = async (req, res) => {
//   try {
//     const { advertId, stars } = req.body;

//     if (!advertId || !stars) {
//       return res.status(400).json({ message: "Advert ID and stars are required" });
//     }

//     if (stars < 1 || stars > 5) {
//       return res.status(400).json({ message: "Rating must be between 1 and 5 stars" });
//     }

//     // Check if advert exists
//     const advert = await Advert.findById(advertId);
//     if (!advert) {
//       return res.status(404).json({ message: "Advert not found" });
//     }

//     // Check if the user has already rated
//     const existingRating = await Rating.findOne({ advert: advertId, user: req.user.id });

//     let rating;
//     if (existingRating) {
//       existingRating.stars = stars;
//       rating = await existingRating.save();
//     } else {
//       rating = await Rating.create({
//         advert: advertId,
//         user: req.user.id,
//         stars,
//       });
//     }

//     res.status(200).json({
//       message: "Rating submitted successfully",
//       rating,
//     });
//   } catch (error) {
//     console.error("Rate advert error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const rateAdvert = async (req, res) => {
  try {
    const { advertId, stars } = req.body;

    if (!advertId || !stars) {
      return res.status(400).json({ message: "Advert ID and stars are required" });
    }

    if (stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5 stars" });
    }

    // Check if advert exists
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    // Check if the user has already rated
    const existingRating = await Rating.findOne({ advert: advertId, user: req.user.id });

    let rating;
    if (existingRating) {
      existingRating.stars = stars;
      rating = await existingRating.save();
    } else {
      rating = await Rating.create({
        advert: advertId,
        user: req.user.id,
        stars,
      });
    }

    // 🔁 Recalculate and update averageRating & ratingCount
    const stats = await Rating.aggregate([
      { $match: { advert: new mongoose.Types.ObjectId(advertId) } },
      {
        $group: {
          _id: "$advert",
          averageRating: { $avg: "$stars" },
          ratingCount: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      await Advert.findByIdAndUpdate(advertId, {
        averageRating: stats[0].averageRating,
        ratingCount: stats[0].ratingCount,
      });
    }

    res.status(200).json({
      message: "Rating submitted successfully",
      rating,
    });
  } catch (error) {
    console.error("Rate advert error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};




//    Get average rating for an advert
export const getAdvertRatings = async (req, res) => {
  try {
    const { id } = req.params; // advert ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid advert ID" });
    }

    const result = await Rating.aggregate([
      { $match: { advert: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: "$advert",
          averageRating: { $avg: "$stars" },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        averageRating: 0,
        totalRatings: 0,
      });
    }

    res.status(200).json({
      averageRating: parseFloat(result[0].averageRating.toFixed(1)),
      totalRatings: result[0].totalRatings,
    });
  } catch (error) {
    console.error("Get advert rating error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

