import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductVariant from '../models/productVariant.js';
import Product from '../models/product.js';

dotenv.config();

const seedProductVariants = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const product = await Product.findOne();
    if (!product) throw new Error('Thiếu product');

    await ProductVariant.deleteMany();
    await ProductVariant.insertMany([
      { product_id: product._id, sku: 'SKU001', price: 120000, stock_quantity: 10 },
      { product_id: product._id, sku: 'SKU002', price: 125000, stock_quantity: 5 }
    ]);
    console.log('✅ Seed product variants thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed product variants lỗi:', err);
    process.exit(1);
  }
};

seedProductVariants();
