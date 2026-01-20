import Booking from "../models/booking.model.js";
import Hotel from "../models/hotel.model.js";

export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { hotelId, numberOfDays, numberOfGuests } = req.body;

    if (!hotelId || !numberOfDays || !numberOfGuests) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (numberOfDays < 1 || numberOfGuests < 1) {
      return res.status(400).json({ error: "Invalid booking details" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    if (numberOfGuests > hotel.maxGuests) {
      return res.status(400).json({
        error: `Maximum ${hotel.maxGuests} guests allowed`,
      });
    }

    const pricePerNight = hotel.pricePerNight;
    const totalPrice = pricePerNight * numberOfDays;

    const booking = await Booking.create({
      user: userId,
      hotel: hotel._id,
      numberOfDays,
      numberOfGuests,
      pricePerNight,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
