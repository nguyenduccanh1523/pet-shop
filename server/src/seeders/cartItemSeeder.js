import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CartItem from '../models/cartItem.js';
import Cart from '../models/cart.js';
import ProductVariant from '../models/productVariant.js';

dotenv.config();

const seedCartItems = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const cart = await Cart.findOne();
    const variant = await ProductVariant.findOne();

    if (!cart || !variant) throw new Error('Thiếu cart hoặc product variant');

    await CartItem.deleteMany();
    await CartItem.insertMany([
      { cart_id: cart._id, product_variant_id: variant._id, quantity: 2 }
    ]);
    console.log('✅ Seed cart items thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed cart items lỗi:', err);
    process.exit(1);
  }
};

seedCartItems();
