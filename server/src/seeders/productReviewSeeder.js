import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductReview from '../models/productReview.js';
import Product from '../models/product.js';
import User from '../models/user.js';

dotenv.config();

const seedProductReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const product = await Product.findOne();
    const user = await User.findOne();

    if (!product || !user) throw new Error('Thiếu product hoặc user');

    await ProductReview.deleteMany();
    await ProductReview.insertMany([
      { product_id: product._id, user_id: user._id, rating: 5, comment: 'Sản phẩm rất tốt!' },
      { product_id: product._id, user_id: user._id, rating: 4, comment: 'Ổn, sẽ mua lại.' }
    ]);
    console.log('✅ Seed product reviews thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed product reviews lỗi:', err);
    process.exit(1);
  }
};

seedProductReviews();
