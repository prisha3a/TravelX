import Booking from "../models/booking.model.js";
import Hotel from "../models/hotel.model.js";

export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { hotelId, numberOfDays, numberOfGuests, checkInDate, checkOutDate } = req.body;

    console.log('Creating booking for user:', userId);
    console.log('Booking data:', { hotelId, numberOfDays, numberOfGuests, checkInDate, checkOutDate });

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

    // Check guests limit
    const maxGuests = hotel.maxGuests || 4; // default to 4 if not set
    if (numberOfGuests > maxGuests) {
      return res.status(400).json({
        error: `Maximum ${maxGuests} guests allowed`,
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
      checkInDate,
      checkOutDate,
    });

    console.log('Booking created:', booking._id);

    // Populate hotel details
    await booking.populate("hotel");

    res.status(201).json({
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Fetching bookings for user:', userId);

    const bookings = await Booking.find({ user: userId })
      .populate("hotel")
      .sort({ createdAt: -1 });

    console.log('Found bookings:', bookings.length);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findById(id).populate("hotel");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if booking belongs to current user
    if (booking.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Fetch booking error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if booking belongs to current user
    if (booking.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    booking.status = "cancelled";
    await booking.save();
    await booking.populate("hotel");

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
