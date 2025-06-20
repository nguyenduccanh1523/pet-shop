import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/service.js';

dotenv.config();

const services = [
  { name: 'Grooming', description: 'Dịch vụ tắm, cắt tỉa lông cho thú cưng', price: 200000, duration: 60 },
  { name: 'Pet Hotel', description: 'Khách sạn cho thú cưng', price: 500000, duration: null }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log('✅ Seed services thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed services lỗi:', err);
    process.exit(1);
  }
};

seedServices();
