import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductImage from '../models/productImage.js';
import Product from '../models/product.js';
import ProductVariant from '../models/productVariant.js';
import Media from '../models/media.js';

dotenv.config();

const seedProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const product = await Product.findOne();
    const variant = await ProductVariant.findOne();
    const media = await Media.findOne();

    if (!media) throw new Error('Thiếu media');

    await ProductImage.deleteMany();
    await ProductImage.insertMany([
      { product_id: product ? product._id : null, product_variant_id: null, media_id: media._id },
      { product_id: null, product_variant_id: variant ? variant._id : null, media_id: media._id }
    ]);
    console.log('✅ Seed product images thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed product images lỗi:', err);
    process.exit(1);
  }
};

seedProductImages();
