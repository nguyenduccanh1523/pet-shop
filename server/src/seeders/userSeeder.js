import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Role from '../models/role.js';
import Media from '../models/media.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const role = await Role.findOne({ role_name: 'admin' }) || await Role.findOne();
    const avatar = await Media.findOne();

    if (!role || !avatar) throw new Error('Thiếu role hoặc media');

    await User.deleteMany();
    await User.insertMany([
      {
        username: 'admin',
        email: 'admin@petshop.com',
        password: bcrypt.hashSync('admin123', 10),
        avatar_id: avatar._id,
        bio: 'Quản trị viên hệ thống',
        role_id: role._id
      },
      {
        username: 'user1',
        email: 'user1@petshop.com',
        password: bcrypt.hashSync('user123', 10),
        avatar_id: avatar._id,
        bio: 'Khách hàng thân thiết',
        role_id: role._id
      }
    ]);
    console.log('✅ Seed users thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed users lỗi:', err);
    process.exit(1);
  }
};

seedUsers();
