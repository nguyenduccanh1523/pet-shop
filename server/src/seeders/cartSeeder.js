import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cart from '../models/cart.js';
import User from '../models/user.js';

dotenv.config();

const seedCarts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();
    if (!user) throw new Error('Thiếu user');

    await Cart.deleteMany();
    await Cart.insertMany([
      { user_id: user._id }
    ]);
    console.log('✅ Seed carts thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed carts lỗi:', err);
    process.exit(1);
  }
};

seedCarts();
