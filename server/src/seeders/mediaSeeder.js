import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Media from '../models/media.js';

dotenv.config();

const medias = [
  { file_path: 'https://kenh14cdn.com/2019/9/12/photo-4-15682544730301888465967.jpg', file_type: 'image/jpeg', file_size: 123456 },
  { file_path: 'https://inkythuatso.com/uploads/thumbnails/800/2022/05/anh-cho-meo-3-10-15-33-27.jpg', file_type: 'image/png', file_size: 654321 }
];

const seedMedias = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Media.deleteMany();
    await Media.insertMany(medias);
    console.log('✅ Seed medias thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed medias lỗi:', err);
    process.exit(1);
  }
};

seedMedias();
