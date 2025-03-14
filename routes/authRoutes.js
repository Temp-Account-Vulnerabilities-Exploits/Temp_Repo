import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  protectedRoute,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/protected", protectedRoute);

export default router;
