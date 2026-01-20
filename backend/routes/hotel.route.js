import express from "express";
import {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.controller.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/:id", getHotelById);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
