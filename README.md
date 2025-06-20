# bambi-api
# 🛒 Advertisement Management Platform – Backend

This is the **backend API** for an Advertisement Management Platform built with **Node.js**, **Express**, **MongoDB**, and **Joi**. It supports user authentication, advert management, image uploads via **Cloudinary**, secure payments with **Paystack**, and a star-based rating system.

---

## 🚀 Features

- ✅ **Authentication & Authorization**
  - User roles: `vendor` and `user`
  - JWT-based login/signup
- 📢 **Advert Management**
  - Vendors can create, edit, and delete adverts
  - Users can view adverts and search/filter by category, title, or price
- 🖼️ **Image Uploads**
  - Cloudinary integration for storing advert images
- 💳 **Payment Integration**
  - Paystack used to handle advert payment and mark as paid
- ⭐ **Ratings**
  - Users can rate adverts (1–5 stars)
  - Average rating and count auto-updated per advert
- 📊 **Dashboard Statistics**
  - Summary of total, paid, and unpaid adverts

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Joi** (for validation)
- **Cloudinary** (image uploads)
- **Paystack API** (payment processing)
- **JWT** (authentication)

---

## 📁 Project Structure

```
bambi-backend/
├── config/ # Cloudinary and DB configs
├── controllers/ # Route handler logic
├── models/ # Mongoose schemas
├── routes/ # API route definitions
├── validators/ # Joi validation schemas
├── middleware/ # Auth & error middleware
├── utils/ # Utility functions (e.g., Cloudinary uploader)
├── app.js # Express app setup
└── server.js # Server entry point
```