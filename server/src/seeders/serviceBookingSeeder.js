import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ServiceBooking from '../models/serviceBooking.js';
import User from '../models/user.js';
import Service from '../models/service.js';

dotenv.config();

const seedServiceBookings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();
    const service = await Service.findOne();

    if (!user || !service) throw new Error('Thiếu user hoặc service');

    await ServiceBooking.deleteMany();
    await ServiceBooking.insertMany([
      {
        user_id: user._id,
        service_id: service._id,
        booking_date: new Date(),
        status: 'Scheduled',
        notes: 'Khách đặt lịch grooming'
      }
    ]);
    console.log('✅ Seed service bookings thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed service bookings lỗi:', err);
    process.exit(1);
  }
};

seedServiceBookings();
