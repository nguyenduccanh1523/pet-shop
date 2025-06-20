import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AttributeValue from '../models/attributeValue.js';
import Attribute from '../models/attribute.js';

dotenv.config();

const seedAttributeValues = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const attribute = await Attribute.findOne();
    if (!attribute) throw new Error('Thiếu attribute');

    await AttributeValue.deleteMany();
    await AttributeValue.insertMany([
      { attribute_id: attribute._id, value: 'Red' },
      { attribute_id: attribute._id, value: 'Blue' },
      { attribute_id: attribute._id, value: 'Black' }
    ]);
    console.log('✅ Seed attribute values thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed attribute values lỗi:', err);
    process.exit(1);
  }
};

seedAttributeValues();
