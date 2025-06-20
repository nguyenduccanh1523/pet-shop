import mongoose from 'mongoose';
import dotenv from 'dotenv';
import StoreProduct from '../models/storeProduct.js';
import Store from '../models/store.js';
import ProductVariant from '../models/productVariant.js';

dotenv.config();

const seedStoreProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const store = await Store.findOne();
    const variant = await ProductVariant.findOne();

    if (!store || !variant) throw new Error('Thiếu store hoặc product variant');

    await StoreProduct.deleteMany();
    await StoreProduct.insertMany([
      { store_id: store._id, product_variant_id: variant._id, stock_quantity: 20 }
    ]);
    console.log('✅ Seed store products thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed store products lỗi:', err);
    process.exit(1);
  }
};

seedStoreProducts();
