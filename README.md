# 🚀 Enrollix

> **Smart registrations made simple.**

Enrollix is a modern, scalable registration platform designed to transform simple signups into structured, manageable systems.

Built with performance, usability, and extensibility in mind, it serves as a foundation for event registrations, onboarding systems, and future SaaS expansion.

---

## ✨ Features

- 🎯 Modern Glassmorphism UI with Tailwind CSS
- ⚡ Real-time Form Validation
- 🔔 Toast Notifications (success, error, feedback)
- 🚫 Spam Protection (loading + duplicate prevention)
- 📊 Admin Dashboard (basic)
- 📁 CSV Export Support
- 🌐 API-driven Architecture

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 🧠 Architecture

Client (React)
   ↓
API (Express)
   ↓
Database (MongoDB)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/enrollix.git
cd enrollix

---

### 2. Setup Backend

cd server
npm install

Create `.env` file:

MONGO_URI=your_mongodb_connection_string

Run server:

npm start

---

### 3. Setup Frontend

cd client
npm install
npm run dev

---

## 📌 API Endpoints

| Method | Endpoint             | Description            |
|--------|---------------------|------------------------|
| POST   | /api/enroll         | Create new enrollment |
| GET    | /api/registrations  | Fetch all users       |
| GET    | /api/export         | Export CSV            |

---

## 🎨 UI Highlights

- Dark gradient theme
- Glassmorphism card design
- Smooth hover & focus states
- Responsive layout

---

## 🚀 Future Scope

- 🔐 Authentication & role-based access
- 💳 Payment integration (Razorpay / Stripe)
- 📊 Advanced admin analytics dashboard
- 📱 OTP-based verification system
- 🌍 Multi-form / multi-organization support

---

## 💡 Vision

Enrollix is evolving from a simple registration form into a full-fledged **registration management platform**, capable of serving multiple domains such as:

- Events & Workshops
- Academies & Training Programs
- Hiring & Onboarding Systems

---

## 👨‍💻 Author

**G Madhu Sudan Reddy**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!