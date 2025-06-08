
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Routes
app.use("/auth", authRoutes);

// 서버 연결
app.listen(PORT, () => {
    console.log(`서버 실행 http://localhost:${PORT}`);
  
// server.js
const app = require('./app');