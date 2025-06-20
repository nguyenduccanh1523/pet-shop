import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogCategory from '../models/blogCategory.js';

dotenv.config();

const blogCategories = [
  { name: 'Dog care', description: 'Dog Care Tips' },
  { name: 'Cat care', description: 'Cat Care Tips' },
  { name: 'Nutrition', description: 'Pet Nutrition Knowledge' }
];

const seedBlogCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await BlogCategory.deleteMany();
    await BlogCategory.insertMany(blogCategories);
    console.log('✅ Seed blog categories thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed blog categories lỗi:', err);
    process.exit(1);
  }
};

seedBlogCategories();
