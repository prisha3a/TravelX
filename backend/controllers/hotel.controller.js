import Hotel from "../models/hotel.model.js";

export const getHotels = async (req, res) => {
  try {
    const { limit = 50, search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { "location.city": { $regex: search, $options: "i" } },
          { "location.country": { $regex: search, $options: "i" } },
        ],
      };
    }

    const hotels = await Hotel.find(query).limit(parseInt(limit));
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Failed to fetch hotels", error: error.message });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Failed to fetch hotel", error: error.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    const { name, description, location, images, pricePerNight, rating, amenities, maxGuests } = req.body;

    const hotel = new Hotel({
      name,
      description,
      location,
      images,
      pricePerNight,
      rating,
      amenities,
      maxGuests: maxGuests || 4,
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ message: "Failed to create hotel", error: error.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const hotel = await Hotel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Failed to update hotel", error: error.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ message: "Failed to delete hotel", error: error.message });
  }
};
