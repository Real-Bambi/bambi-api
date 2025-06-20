import { Advert } from "../models/advert.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const vendorId = req.user.id;

    const totalAdverts = await Advert.countDocuments({ vendor: vendorId });
    const paidAdverts = await Advert.countDocuments({ vendor: vendorId, isPaid: true });
    const unpaidAdverts = totalAdverts - paidAdverts;

    res.status(200).json({
      totalAdverts,
      paidAdverts,
      unpaidAdverts,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    res.status(500).json({ message: "Server error fetching dashboard stats" });
  }
};
