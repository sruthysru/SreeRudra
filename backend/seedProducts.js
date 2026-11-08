const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const initialProducts = [
  {
    name: "Authentic Panchamukhi Rudraksha Bracelet",
    category: "rudraksha",
    price: 1299,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1611591475140-43a743419250?auto=format&fit=crop&w=600&q=80",
    description: "5-Mukhi original Nepalese Rudraksha beads for peace of mind, focus, and divine protection.",
    tag: "Best Seller"
  },
  {
    name: "Energized Ebony Karungali Bracelet",
    category: "ebony",
    price: 1599,
    originalPrice: 2299,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    description: "Authentic Karungali wood beads blessed to absorb negativity, enhance willpower and success.",
    tag: "High Energy"
  },
  {
    name: "Healing Amethyst Gemstone Bracelet",
    category: "gemstone",
    price: 1899,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    description: "Natural Amethyst crystal beads promoting deep intuition, stress release, and third-eye activation.",
    tag: "Healing"
  },
  {
    name: "Sacred Tulsi Bead Wrist Mala",
    category: "tulsi",
    price: 999,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    description: "Pure holy Vrindavan Tulsi wood beads for spiritual purity, protection, and emotional harmony.",
    tag: "Sacred"
  }
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(initialProducts);
  console.log("Products seeded!");
  process.exit();
};

seedDB();