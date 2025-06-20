import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.js';
import ProductCategory from '../models/productCategory.js';
import Brand from '../models/brand.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const category = await ProductCategory.findOne();
    const brand = await Brand.findOne();

    if (!category) throw new Error('Thiếu category');

    await Product.deleteMany();
    await Product.insertMany([
      {
        name: 'Hạt cho chó Royal Canin',
        description: 'Dinh dưỡng cao cấp cho chó',
        base_price: 120000,
        category_id: category._id,
        brand_id: brand ? brand._id : null
      },
      {
        name: 'Đồ chơi cho mèo',
        description: 'Đồ chơi giúp mèo vận động',
        base_price: 50000,
        category_id: category._id
      }
    ]);
    console.log('✅ Seed products thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed products lỗi:', err);
    process.exit(1);
  }
};

seedProducts();
