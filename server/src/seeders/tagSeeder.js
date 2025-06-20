import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tag from '../models/tag.js';

dotenv.config();

const tags = [
  { name: 'New', description: 'Sản phẩm mới' },
  { name: 'Sale', description: 'Đang giảm giá' },
  { name: '-10%', description: 'Giảm 10%' },
  { name: 'Sold', description: 'Đã bán' }
];

const seedTags = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Tag.deleteMany();
    await Tag.insertMany(tags);
    console.log('✅ Seed tags thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed tags lỗi:', err);
    process.exit(1);
  }
};

seedTags();
