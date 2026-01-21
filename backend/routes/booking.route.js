import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/booking.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import Booking from "../models/booking.model.js";

const router = express.Router();

router.post("/", protectRoute, createBooking);
router.get("/", protectRoute, getUserBookings);
router.get("/:id", protectRoute, getBookingById);
router.put("/:id/cancel", protectRoute, cancelBooking);

// Debug endpoint - remove in production
router.get("/debug/all", async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("hotel");
    res.status(200).json({ totalBookings: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

