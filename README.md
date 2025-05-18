# 🧁 Fresh Baked – A React-Based Bakery Portfolio Website

Fresh Baked is a modern, responsive bakery portfolio website built using **React (Vite)** as part of our final project at **CodeGirls**. While it currently serves as a business portfolio, our vision is to transform it into a full-fledged **e-commerce platform**.

## 🛠️ Installation & Setup Guide

### 1. Clone the Repository

git clone https://github.com/your-username/fresh-baked.git  
cd fresh-baked

### 2. Install Dependencies

npm install

### 3. Set Up Firebase

- Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
- Enable **Authentication** (Email/Password and Google Sign-In).
- Create a **Firestore Database**.
- Register a **Web App** in Firebase and copy the config.

### 4. Create a `.env` file in the project root and add your Firebase config:

VITE_API_KEY=your_api_key  
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com  
VITE_PROJECT_ID=your_project_id  
VITE_STORAGE_BUCKET=your_project_id.appspot.com  
VITE_MESSAGING_SENDER_ID=your_sender_id  
VITE_APP_ID=your_app_id

> After setting env variables, restart the dev server.

### 5. Start Development Server

npm run dev

App will run at http://localhost:5173

---

## 🔗 Live Demo & GitHub

**Live Site:** https://lnkd.in/dY4QS27R  
**GitHub Repository:** https://lnkd.in/dvYqrEkq

---

## 🚀 Key Features

### 🔐 Admin Panel (Firebase Authentication)

- Secure login & signup (Email & Google)
- Protected routes for admin access
- Admins can:
  - Add/Edit/Delete Products
  - Add/Edit/Delete Testimonials
  - View Customer Favorites

### ❤️ Customer Favorites

- User selects a category, then an item
- Selected product's name & image appear in Admin Panel
- Displayed in a slider on the frontend

### 🍰 Dynamic Menu & Product Filtering

- Menu Page with all categorized products
- Clicking a category filters relevant items
- Uses `useParams` for category-based routing (/category)
- Jump-to-section feature on Menu Page

### ✨ Smooth UX

- Protected & Unprotected Routes
- Animations with AOS & Framer Motion
- React Router DOM for navigation
- Tailwind CSS for responsive styling

### 🔥 Firebase Firestore Integration

- Real-time storage for products, testimonials & favorites
- Efficient, scalable data management

---

## 🙏 Credits

Thanks to **Sir Husnain Raza** and the **CodeGirls** program for empowering us to create this project!

---

## 📌 Tech Stack

- React (Vite)
- Firebase Auth & Firestore
- React Router DOM
- Tailwind CSS
- AOS & Framer Motion

---

Feel free to fork, use, and contribute. Feedback and suggestions are welcome! 😊
