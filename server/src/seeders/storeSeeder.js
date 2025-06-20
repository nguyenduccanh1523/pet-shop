import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Store from '../models/store.js';
import Media from '../models/media.js';

dotenv.config();

const seedStores = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const media = await Media.findOne();
    if (!media) throw new Error('Thiếu media');

    await Store.deleteMany();
    await Store.insertMany([
      {
        name: 'CutePets Hà Đông',
        address: '123 Đường ABC, Hà Đông, Hà Nội',
        phone: '0123456789',
        email: 'cutepets@gmail.com',
        image_story: media._id
      }
    ]);
    console.log('✅ Seed stores thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed stores lỗi:', err);
    process.exit(1);
  }
};

seedStores();
