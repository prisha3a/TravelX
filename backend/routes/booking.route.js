import express from "express";
import { createBooking } from "../controllers/booking.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createBooking);

export default router;