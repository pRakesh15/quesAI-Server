import express from "express";
import { getMyprofile, login, register } from "../controllers/auth.controller.js";
import { isAuthenticate } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post('/register', register)
router.post('/login', login);

// Protected routes
router.get('/me', isAuthenticate,getMyprofile);

export default router;