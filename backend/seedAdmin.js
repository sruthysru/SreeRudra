const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for admin seeding...');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'nandu' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('nandu123', 10);

    const newAdmin = new Admin({
      username: 'nandu',
      password: hashedPassword
    });

    await newAdmin.save();
    console.log('Default admin created successfully! Username: nandu, Password: nandu123');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

createAdmin();