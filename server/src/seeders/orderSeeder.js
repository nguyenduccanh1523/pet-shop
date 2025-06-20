import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/order.js';
import User from '../models/user.js';

dotenv.config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();
    if (!user) throw new Error('Thiếu user');

    await Order.deleteMany();
    await Order.insertMany([
      {
        user_id: user._id,
        total_amount: 350000,
        status: 'Pending',
        shipping_address: '123 Đường ABC, Hà Nội',
        payment_method: 'Cash',
        payment_status: 'Unpaid',
        order_date: new Date()
      }
    ]);
    console.log('✅ Seed orders thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed orders lỗi:', err);
    process.exit(1);
  }
};

seedOrders();
