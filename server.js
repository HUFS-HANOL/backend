const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todayRoutes = require("./routes/todayRoutes");

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

// 서버 연결
app.listen(PORT, () => {
    console.log(`서버 실행 http://localhost:${PORT}`);
});
