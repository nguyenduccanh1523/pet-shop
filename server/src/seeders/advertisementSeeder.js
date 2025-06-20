import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Advertisement from '../models/advertisement.js';
import Media from '../models/media.js';

dotenv.config();

const seedAdvertisements = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const media = await Media.findOne();
    if (!media) throw new Error('Thiếu media');

    await Advertisement.deleteMany();
    await Advertisement.insertMany([
      {
        title: 'Khuyến mãi mùa hè',
        content: 'Giảm giá lên tới 50% cho mọi sản phẩm!',
        media_id: media._id,
        link_url: 'https://petshop.com/khuyen-mai',
        start_date: new Date(),
        end_date: new Date(Date.now() + 7*24*60*60*1000)
      }
    ]);
    console.log('✅ Seed advertisements thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed advertisements lỗi:', err);
    process.exit(1);
  }
};

seedAdvertisements();
