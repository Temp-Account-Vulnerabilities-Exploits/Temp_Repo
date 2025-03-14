import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // parse json requests
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// routes

app.use("/auth", authRoutes); // auth routes

app.use("/", (req, res) => {
  res.send("sever is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
