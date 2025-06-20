import mongoose from 'mongoose';
import dotenv from 'dotenv';
import StoreService from '../models/storeService.js';
import Store from '../models/store.js';
import Service from '../models/service.js';

dotenv.config();

const seedStoreServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const store = await Store.findOne();
    const service = await Service.findOne();

    if (!store || !service) throw new Error('Thiếu store hoặc service');

    await StoreService.deleteMany();
    await StoreService.insertMany([
      { store_id: store._id, service_id: service._id }
    ]);
    console.log('✅ Seed store services thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed store services lỗi:', err);
    process.exit(1);
  }
};

seedStoreServices();
