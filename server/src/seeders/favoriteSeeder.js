import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Favorite from '../models/favorite.js';
import User from '../models/user.js';
import ProductVariant from '../models/productVariant.js';

dotenv.config();

const seedFavorites = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();
    const variant = await ProductVariant.findOne();

    if (!user || !variant) throw new Error('Thiếu user hoặc product variant');

    await Favorite.deleteMany();
    await Favorite.insertMany([
      { user_id: user._id, product_variant_id: variant._id }
    ]);
    console.log('✅ Seed favorites thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed favorites lỗi:', err);
    process.exit(1);
  }
};

seedFavorites();
