import express from "express";
import {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
  getFeed,
  postFeed,
  getLogout,
} from "../controllers/authcontroller.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Pages
router.get("/login", getLogin);
router.get("/register", getRegister);
router.get("/", requireAuth, getFeed);

// Auth actions
router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/", requireAuth, postFeed);
router.get("/logout", getLogout);

export default router;
