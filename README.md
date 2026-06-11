# 💬 Pi-Chat

A simple real-time chat application built with **React**, **Node.js**, **MongoDB**, and **Socket.IO**.

Pi-Chat allows users to create accounts, choose avatars, and exchange messages in real time through a clean and responsive interface.

---

## ✨ Features

* 🔐 User Registration & Login
* 🎭 Avatar Selection
* 💬 Real-Time Messaging
* 😀 Emoji Support
* 📚 Message Persistence with MongoDB
* 👥 Contact List Management
* 📱 Responsive Design

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React
* Styled Components
* Axios
* Socket.IO Client
* Emoji Picker React

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* Bcrypt

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Abhaycode42852/Pi-Chat.git
cd public
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
```

---

## ▶️ Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

### Start the Frontend

```bash
npm start
```

The application will be available at:

```text
Frontend: http://localhost:3000
Backend : http://localhost:5000
```

---

## 📂 Project Structure

```text
Pi-Chat/
│
├── public/
│   ├── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       ├── utils/
│       └── App.js/
│
├── server/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   └── index.js
│
└── README.md
```

---

## 🎯 What I Learned

Building Pi-Chat helped me gain practical experience with:

* ⚛️ React Hooks and Component Architecture
* 🎨 Styled Components
* 🌐 REST APIs
* 🍃 MongoDB & Mongoose
* 🔒 Authentication and Password Hashing
* ⚡ Socket.IO Real-Time Communication
* 📱 Responsive UI Design

---

## 🔮 Future Improvements

* 🟢 Online / Offline Status
* ⌨️ Typing Indicators
* ✅ Read Receipts
* 👨‍👩‍👧‍👦 Group Chats
* 🖼️ Image Sharing
* 🔔 Notifications

---

## 👨‍💻 Author

**Abhay Singh**

🐙 GitHub: https://github.com/Abhaycode42852

---

## 📜 License

This project is licensed under the **MIT License**.
