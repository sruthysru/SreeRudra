const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // 'rudraksha', 'ebony', 'gemstone', 'tulsi'
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  description: { type: String },
  tag: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);