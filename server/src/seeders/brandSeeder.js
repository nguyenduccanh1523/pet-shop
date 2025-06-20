import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Brand from '../models/brand.js';
import Media from '../models/media.js';

dotenv.config();

const seedBrands = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const media = await Media.findOne();
    if (!media) throw new Error('Thiếu media');

    await Brand.deleteMany();
    await Brand.insertMany([
      { name: 'Royal Canin', description: 'Thương hiệu nổi tiếng', media_id: media._id },
      { name: 'Catsrang', description: 'Dành cho mèo', media_id: media._id }
    ]);
    console.log('✅ Seed brands thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed brands lỗi:', err);
    process.exit(1);
  }
};

seedBrands();
