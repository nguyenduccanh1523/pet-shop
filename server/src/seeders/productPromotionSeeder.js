import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductPromotion from '../models/productPromotion.js';
import Product from '../models/product.js';
import Promotion from '../models/promotion.js';

dotenv.config();

const seedProductPromotions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const product = await Product.findOne();
    const promotion = await Promotion.findOne();

    if (!product || !promotion) throw new Error('Thiếu product hoặc promotion');

    await ProductPromotion.deleteMany();
    await ProductPromotion.insertMany([
      { product_id: product._id, promotion_id: promotion._id }
    ]);
    console.log('✅ Seed product promotions thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed product promotions lỗi:', err);
    process.exit(1);
  }
};

seedProductPromotions();
