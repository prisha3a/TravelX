import mongoose from "mongoose";
import Hotel from "./models/hotel.model.js";
import dotenv from "dotenv";

dotenv.config();

const sampleHotels = [
  {
    name: "Eiffel Tower Paris",
    description:
      "Experience the iconic Eiffel Tower with stunning views of Paris. Luxurious accommodations with world-class service and amenities.",
    location: {
      city: "Paris",
      country: "France",
    },
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1499722314049-40694f45ecd1?w=800&h=600&fit=crop",
    ],
    pricePerNight: 250,
    rating: 4.8,
    amenities: ["WiFi", "Spa", "Restaurant", "Room Service", "Gym"],
    maxGuests: 4,
    isFeatured: true,
  },
  {
    name: "Big Ben London",
    description:
      "Historic charm meets modern luxury. Stay near the iconic Big Ben and Houses of Parliament. Experience London's best.",
    location: {
      city: "London",
      country: "United Kingdom",
    },
    images: [
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    ],
    pricePerNight: 280,
    rating: 4.7,
    amenities: ["WiFi", "Bar", "Concierge", "Business Center", "Gym"],
    maxGuests: 4,
    isFeatured: true,
  },
  {
    name: "Statue of Liberty New York",
    description:
      "Iconic New York experience with views of Statue of Liberty. Premium location in Manhattan with modern amenities.",
    location: {
      city: "New York",
      country: "United States",
    },
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop",
    ],
    pricePerNight: 320,
    rating: 4.6,
    amenities: ["WiFi", "Restaurant", "Rooftop Bar", "Gym", "Swimming Pool"],
    maxGuests: 5,
    isFeatured: true,
  },
  {
    name: "Colosseum Rome",
    description:
      "Ancient history comes alive in Rome. Stay near the magnificent Colosseum and explore centuries of culture.",
    location: {
      city: "Rome",
      country: "Italy",
    },
    images: [
      "https://images.unsplash.com/photo-1552832860-cfb67165eaf0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    ],
    pricePerNight: 200,
    rating: 4.5,
    amenities: ["WiFi", "Italian Restaurant", "Wine Bar", "Spa", "Concierge"],
    maxGuests: 4,
    isFeatured: true,
  },
  {
    name: "Taj Mahal Agra",
    description:
      "Experience the beauty of the Taj Mahal. Luxury stay with authentic Indian hospitality and modern comforts.",
    location: {
      city: "Agra",
      country: "India",
    },
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583985858611-4f828ebc8e04?w=800&h=600&fit=crop",
    ],
    pricePerNight: 150,
    rating: 4.9,
    amenities: ["WiFi", "Ayurvedic Spa", "Indian Cuisine", "Yoga", "Garden"],
    maxGuests: 4,
    isFeatured: true,
  },
  {
    name: "Great Wall Beijing",
    description:
      "Explore the majestic Great Wall of China. Modern hotel with traditional Chinese hospitality and excellent service.",
    location: {
      city: "Beijing",
      country: "China",
    },
    images: [
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552314695-3b689ba25b45?w=800&h=600&fit=crop",
    ],
    pricePerNight: 180,
    rating: 4.7,
    amenities: ["WiFi", "Chinese Restaurant", "Tea House", "Gym", "Massage"],
    maxGuests: 5,
    isFeatured: true,
  },
  {
    name: "Pyramids of Giza Cairo",
    description:
      "Stay near the ancient Pyramids of Giza. Experience Egypt's rich history with modern luxury accommodations.",
    location: {
      city: "Cairo",
      country: "Egypt",
    },
    images: [
      "https://images.unsplash.com/photo-1569263985272-3b92f467cf84?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    ],
    pricePerNight: 160,
    rating: 4.6,
    amenities: ["WiFi", "Restaurant", "Pool", "Guided Tours", "Spa"],
    maxGuests: 4,
    isFeatured: true,
  },
  {
    name: "Santorini Islands Greece",
    description:
      "Experience the breathtaking beauty of Santorini. White-washed villas overlooking the Aegean Sea with stunning sunsets.",
    location: {
      city: "Santorini",
      country: "Greece",
    },
    images: [
      "https://images.unsplash.com/photo-1530843369250-a413f3cb332d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    ],
    pricePerNight: 290,
    rating: 4.9,
    amenities: ["WiFi", "Sea View", "Wine Bar", "Pool", "Honeymoon Suites"],
    maxGuests: 3,
    isFeatured: true,
  },
  {
    name: "Statue of Christ Rio",
    description:
      "Overlooking the iconic Christ the Redeemer statue. Experience Rio's vibrant culture and stunning mountain views.",
    location: {
      city: "Rio de Janeiro",
      country: "Brazil",
    },
    images: [
      "https://images.unsplash.com/photo-1483729558449-99daa71acfd3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
    pricePerNight: 220,
    rating: 4.5,
    amenities: ["WiFi", "Beach Access", "Restaurant", "Pool", "Samba Lessons"],
    maxGuests: 4,
    isFeatured: true,
  },
  {
    name: "Tokyo Tower Japan",
    description:
      "Modern luxury in the heart of Tokyo. Visit the iconic Tokyo Tower and explore Japan's cutting-edge technology and culture.",
    location: {
      city: "Tokyo",
      country: "Japan",
    },
    images: [
      "https://images.unsplash.com/photo-1540959375944-7049f642e9a4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506704720897-c6b0b8ef6dba?w=800&h=600&fit=crop",
    ],
    pricePerNight: 270,
    rating: 4.8,
    amenities: ["WiFi", "Japanese Restaurant", "Karaoke", "Onsen", "Tea Ceremony"],
    maxGuests: 4,
    isFeatured: true,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Clear existing data
    await Hotel.deleteMany({});
    console.log("Cleared existing hotels");

    // Insert sample data
    const createdHotels = await Hotel.insertMany(
      sampleHotels.map((hotel) => ({
        ...hotel,
        destination: new mongoose.Types.ObjectId(),
      }))
    );

    console.log(`Successfully seeded ${createdHotels.length} hotels`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
