const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Hash new password
    const hashedPassword = await bcrypt.hash('nandu123', 10);

    // Update or create the admin user 'nandu'
    await Admin.findOneAndUpdate(
      { username: 'nandu' },
      { password: hashedPassword },
      { upsert: true, new: true }
    );

    console.log('Admin password successfully reset to: nandu123 (Username: nandu)');
    process.exit(0);
  } catch (err) {
    console.error('Error resetting admin:', err);
    process.exit(1);
  }
};

resetAdmin();