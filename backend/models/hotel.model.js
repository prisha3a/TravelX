import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    images: [
      {
        type: String, // Cloudinary URLs
        required: true,
      },
    ],

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    amenities: [
      {
        type: String, // Pool, Spa, Gym, etc.
      },
    ],

    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
