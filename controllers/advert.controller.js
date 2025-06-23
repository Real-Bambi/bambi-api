import {Advert} from "../models/advert.model.js";
import { advertSchema } from "../validators/advert.validator.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "../config/cloudinary.js";

//    Vendor creates a new advert
export const createAdvert = async (req, res) => {
  try {
    // 1. Validate body (title, price, etc.)
    const { error } = advertSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // 2. Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // 3. Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.path, "adverts");

    // 4. Create advert in DB
    const advert = await Advert.create({
      ...req.body,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      vendor: req.user._id,
    //   isPaid: true, 
    });

    res.status(201).json({
      message: "Advert posted successfully",
      advert,
    });
  } catch (err) {
    console.error("Create advert error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


//   Get all adverts
//with optional search/filter
export const getAllAdverts = async (req, res) => {
  try {
    const { category, price, title } = req.query;

    // Build dynamic query
    const query = {};

    if (category) {
      query.category = { $regex: new RegExp(category, "i") }; // case-insensitive
    }

    if (price) {
      query.price = { $lte: Number(price) };
    }

    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    const adverts = await Advert.find(query)
      .populate("vendor", "name username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Adverts fetched successfully",
      count: adverts.length,
      adverts,
    });
  } catch (error) {
    console.error("Search/filter error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


//   Get a single advert by ID
export const getAdvertById = async (req, res) => {
  try {
    const { id } = req.params;

    const advert = await Advert.findById(id).populate(
      "vendor",
      "name username email"
    );

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    res.status(200).json({
      message: "Advert fetched successfully",
      advert,
    });
  } catch (error) {
    console.error("Get advert by ID error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//   Update an advert (vendor only)
export const updateAdvert = async (req, res) => {
  try {
    const { id } = req.params;

    const advert = await Advert.findById(id);

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    // Check if current user is the advert owner
    if (advert.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this advert" });
    }

    // Optional: handle new image upload
    if (req.file) {
      // delete old image from Cloudinary
      await cloudinary.uploader.destroy(advert.image.public_id);

      // upload new one
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "adverts",
      });

      advert.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update text fields
    const fields = ["title", "description", "price", "category"];
    fields.forEach((field) => {
      if (req.body[field]) {
        advert[field] = req.body[field];
      }
    });

    const updated = await advert.save();

    res.status(200).json({
      message: "Advert updated successfully",
      advert: updated,
    });
  } catch (error) {
    console.error("Update advert error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//    Delete an advert (vendor only)
export const deleteAdvert = async (req, res) => {
  try {
    const { id } = req.params;

    const advert = await Advert.findById(id);

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    // Check ownership
    if (advert.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this advert" });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(advert.image.public_id);

    // Remove from MongoDB
    await advert.deleteOne();

    res.status(200).json({ message: "Advert deleted successfully" });
  } catch (error) {
    console.error("Delete advert error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMyAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find({ vendor: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Vendor adverts fetched successfully",
      count: adverts.length,
      adverts,
    });
  } catch (error) {
    console.error("Get vendor adverts error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};





