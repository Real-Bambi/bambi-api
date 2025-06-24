import mongoose from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    role: {
      type: String,
      enum: ["vendor", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(normalize);
export const User = mongoose.model("User", userSchema);


