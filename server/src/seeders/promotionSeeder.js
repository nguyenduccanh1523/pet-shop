import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promotion from '../models/promotion.js';
import Media from '../models/media.js';

dotenv.config();

const seedPromotions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const media = await Media.findOne();
    if (!media) throw new Error('Thiếu media');

    await Promotion.deleteMany();
    await Promotion.insertMany([
      {
        code: 'SUMMER2024',
        description: 'Giảm 10% cho đơn hàng từ 500k',
        discount_type: 'Percentage',
        discount_value: 10,
        media_id: media._id,
        start_date: new Date(),
        end_date: new Date(Date.now() + 30*24*60*60*1000)
      }
    ]);
    console.log('✅ Seed promotions thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed promotions lỗi:', err);
    process.exit(1);
  }
};

seedPromotions();
