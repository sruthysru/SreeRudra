const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Will be stored as a bcrypt hash
});

module.exports = mongoose.model('Admin', adminSchema);