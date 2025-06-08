const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todayRoutes = require("./routes/todayRoutes");
const likedPoemsRoutes = require("./routes/likedPoemsRoutes")

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/today",todayRoutes);
app.use("/api/likedPoems",likedPoemsRoutes);

