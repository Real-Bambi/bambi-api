import axios from "axios";


import {Advert} from "../models/advert.model.js";
import { initiatePaystackPayment } from "../services/paystack.js";

// @desc    Initiate payment for advert
export const initiatePayment = async (req, res) => {
  try {
    const { advertId } = req.body;
    

    // Find the advert
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    // Check if already paid
    if (advert.isPaid) {
      return res.status(400).json({ message: "Advert already paid for" });
    }

    // Must be the advert owner
    if (advert.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to pay for this advert" });
    }

    // Prepare payment
    const payment = await initiatePaystackPayment({
      email: req.user.email,
      amount: 5, // Set to your advert fee (in GHS) — change as needed
      callback_url: process.env.PAYSTACK_CALLBACK_URL + `?advertId=${advert._id}`,
    });

    res.status(200).json({
      message: "Payment initiated",
      authorization_url: payment.data.authorization_url,
      reference: payment.data.reference,
    });
  } catch (error) {
    console.error("Initiate payment error:", error.message);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};



//   Verify payment and update advert
export const verifyPayment = async (req, res) => {
  try {
    const { advertId, reference } = req.query;

    if (!advertId || !reference) {
      return res.status(400).json({ message: "Missing advertId or reference" });
    }

    // Verify with Paystack
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const response = await axios.get(verifyUrl, config);

    const { status } = response.data.data;

    if (status !== "success") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    // Mark advert as paid
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    advert.isPaid = true;
    await advert.save();

    res.status(200).json({ message: "Payment verified and advert marked as paid" });
  } catch (error) {
    console.error("Payment verification error:", error.message);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

