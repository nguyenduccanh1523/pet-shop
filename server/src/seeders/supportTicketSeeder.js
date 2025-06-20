import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SupportTicket from '../models/supportTicket.js';
import User from '../models/user.js';

dotenv.config();

const seedSupportTickets = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();
    if (!user) throw new Error('Thiếu user');

    await SupportTicket.deleteMany();
    await SupportTicket.insertMany([
      {
        user_id: user._id,
        subject: 'Không nhận được hàng',
        description: 'Tôi đã đặt hàng 1 tuần nhưng chưa nhận được.',
        status: 'Open',
        priority: 'High'
      }
    ]);
    console.log('✅ Seed support tickets thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed support tickets lỗi:', err);
    process.exit(1);
  }
};

seedSupportTickets();
