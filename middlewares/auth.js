import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

// Middleware: Protect routes (require token)
export const protectRoute = async (req, res, next) => {
  let token;

  // Check for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      console.error("Token error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};

// Middleware: Restrict access to specific roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};
