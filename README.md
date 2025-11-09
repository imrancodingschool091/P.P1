# 🛒 E-Commerce MERN Stack Application

A **full-featured E-Commerce platform** built using the **MERN stack (MongoDB, Express, React, Node.js)** with secure **JWT authentication**, **Google OAuth 2.0**, **Razorpay payments**, and a responsive modern UI.

---

## 🚀 Features

- 🔐 **Authentication**
  - JWT-based Login & Register
  - Google OAuth 2.0 Login
  - Secure session management

- 🛍️ **E-Commerce**
  - Product listing, filtering, and search
  - Product details page with reviews
  - Add to cart, wishlist, checkout

- 💳 **Payments**
  - Razorpay integration (test & live modes)
  - Payment success & failure handling
  - Order history and invoice generation

- 🖼️ **Media Uploads**
  - Cloudinary integration for product images

- 🧑‍💼 **Admin Dashboard**
  - Manage products, categories, and orders
  - View user analytics and sales stats

- ⚙️ **Clean MVC Structure**
  - Separate backend for scalability
  - Redux Toolkit for state management

---

## 🧱 Tech Stack

**Frontend:** React 18, Redux Toolkit, Axios, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT, Google OAuth 2.0 (Passport.js)  
**Payments:** Razorpay  
**Media Storage:** Cloudinary  
**Deployment:** Vercel (Frontend) + Render / Railway (Backend)

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-mern.git
cd ecommerce-mern


2️⃣ Install Dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


3️⃣ Create Environment Files

backend/.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173


🧑‍💻 Run the Project
Development Mode

Run backend and frontend separately:

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev


Now open http://localhost:5173
 to view the app.

📁 Folder Structure
ecommerce-mern/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   └── App.jsx
│   └── public/
│
├── .gitignore
├── README.md
└── package.json

🧠 Important Notes

Always keep .env files private — never commit them.

Razorpay keys should be in .env files, not frontend code.

For production builds:

cd frontend
npm run build


Deploy frontend to Vercel or Netlify, backend to Render, Railway, or AWS.

🧑‍💻 Author

Imran Aly
Web Developer @ Ansh Infotech
📧 your.email@example.com

🌐 Portfolio

💼 LinkedIn

⭐ Contribute

Fork this repo

Create your branch (feature/new-feature)

Commit and push

Submit a PR 🚀

🪪 License

This project is licensed under the MIT License.


---

## ✅ Summary

| File | Purpose | Where to Place |
|------|----------|----------------|
| `.gitignore` | Keeps junk files (node_modules, .env, etc.) out of Git | 🟩 Root |
| `README.md` | Documentation for developers/users | 🟩 Root |
| `.env` | Secrets & config (not committed) | 🟨 Inside `backend/` |

---

Would you like me to **customize the README** further with your *actual project name*, *GitHub repo link*, and *live site links* (e.g., Vercel/Render URLs)?  
I can generate that final polished README ready for upload.