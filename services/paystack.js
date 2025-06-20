import axios from "axios";

export const initiatePaystackPayment = async ({ email, amount, callback_url }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const body = {
    email,
    amount: amount * 100, // Paystack uses kobo
    callback_url,
  };

  const res = await axios.post("https://api.paystack.co/transaction/initialize", body, config);
  return res.data;
};
