import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Message from '../models/message.js';
import User from '../models/user.js';

dotenv.config();

const seedMessages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const sender = await User.findOne();
    const receiver = await User.findOne({ _id: { $ne: sender._id } }) || sender;

    if (!sender || !receiver) throw new Error('Thiếu sender hoặc receiver');

    await Message.deleteMany();
    await Message.insertMany([
      {
        sender_id: sender._id,
        receiver_id: receiver._id,
        content: 'Xin chào, shop còn hàng không?',
        is_read: false
      }
    ]);
    console.log('✅ Seed messages thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed messages lỗi:', err);
    process.exit(1);
  }
};

seedMessages();
