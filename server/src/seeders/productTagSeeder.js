import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductTag from '../models/productTag.js';
import Product from '../models/product.js';
import Tag from '../models/tag.js';

dotenv.config();

const seedProductTags = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const product = await Product.findOne();
    const tag = await Tag.findOne();

    if (!product || !tag) throw new Error('Thiếu product hoặc tag');

    await ProductTag.deleteMany();
    await ProductTag.insertMany([
      { product_id: product._id, tag_id: tag._id }
    ]);
    console.log('✅ Seed product tags thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed product tags lỗi:', err);
    process.exit(1);
  }
};

seedProductTags();
