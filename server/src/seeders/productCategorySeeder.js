import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductCategory from '../models/productCategory.js';

dotenv.config();

const categories = [
  { name: 'Dog', description: 'Dành cho chó' },
  { name: 'Cat', description: 'Dành cho mèo' },
  { name: 'Accessories Pet', description: 'Phụ kiện thú cưng' }
];

const subCategories = [
  { name: 'Dog Food', description: 'Thức ăn cho chó' },
  { name: 'Dog Supplies', description: 'Đồ dùng cho chó' },
  { name: 'Training Toys', description: 'Đồ chơi huấn luyện cho chó' }
];

const seedProductCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await ProductCategory.deleteMany();
    // Tạo các category cha
    const insertedParents = await ProductCategory.insertMany(categories);
    // Lấy _id của Dog
    const dogCategory = insertedParents.find(cat => cat.name === 'Dog');
    // Tạo các category con với parent_id là _id của Dog
    if (dogCategory) {
      const subCatsWithParent = subCategories.map(sub => ({ ...sub, parent_id: dogCategory._id }));
      await ProductCategory.insertMany(subCatsWithParent);
    }
    console.log('✅ Seed product categories thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed product categories lỗi:', err);
    process.exit(1);
  }
};

seedProductCategories();
