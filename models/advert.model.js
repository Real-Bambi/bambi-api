import mongoose from "mongoose";
import normalize from "normalize-mongoose";

const advertSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        image: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        ratingCount: {
            type: Number,
            default: 0,
        },
         status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    },
    {
        timestamps: true,
    }
);

advertSchema.plugin(normalize);
export const Advert = mongoose.model("Advert", advertSchema);


