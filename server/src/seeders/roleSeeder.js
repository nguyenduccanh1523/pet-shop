import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/role.js';

dotenv.config();

const roles = [
  { role_name: 'admin', description: 'Quản trị viên' },
  { role_name: 'user', description: 'Người dùng' },
  { role_name: 'staff', description: 'Nhân viên' }
];

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Role.deleteMany(); // Xóa hết dữ liệu cũ
    await Role.insertMany(roles);
    console.log('✅ Seed roles thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed roles lỗi:', err);
    process.exit(1);
  }
};

seedRoles();