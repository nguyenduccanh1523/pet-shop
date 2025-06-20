import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Attribute from '../models/attribute.js';

dotenv.config();

const attributes = [
  { name: 'Color' },
  { name: 'Size' },
  { name: 'Type' }
];

const seedAttributes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Attribute.deleteMany();
    await Attribute.insertMany(attributes);
    console.log('✅ Seed attributes thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed attributes lỗi:', err);
    process.exit(1);
  }
};

seedAttributes();
