import mongoose from 'mongoose';
import Recruitment from '../models/recruitment.js';
import ProductVariantAttribute from '../models/productVariantAttributue.js';
import OrderItem from '../models/orderItem.js';
import OrderPromotion from '../models/orderPromotion.js';
import SupportTicketResponse from '../models/supportTicketResponse.js';
import FAQ from '../models/faq.js';
import Store from '../models/store.js';
import ProductVariant from '../models/productVariant.js';
import AttributeValue from '../models/attributeValue.js';
import Order from '../models/order.js';
import User from '../models/user.js';
import Promotion from '../models/promotion.js';
import SupportTicket from '../models/supportTicket.js';
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  // Kết nối MongoDB
  await mongoose.connect(process.env.MONGODB_URI);

  // Lấy sẵn ObjectId mẫu (bạn nên thay bằng id thực tế từ các bảng liên quan)
  const storeId = await Store.findOne();
  const productVariantId = await ProductVariant.findOne();
  const attributeValueId = await AttributeValue.findOne();
  const orderId = await Order.findOne();
  const promotionId = await Promotion.findOne();
  const userId = await User.findOne();
  const supportTicketId = await SupportTicket.findOne();

  // Recruitment
  await Recruitment.create([
    {
      store_id: storeId._id,
      title: 'Nhân viên bán hàng',
      description: 'Bán hàng tại cửa hàng thú cưng.',
      requirements: 'Có kinh nghiệm bán hàng.',
      status: 'open',
      salary_range: '7-10 triệu',
      application_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  ]);

  // ProductVariantAttribute
  await ProductVariantAttribute.create([
    {
      product_variant_id: productVariantId._id,
      attribute_value_id: attributeValueId._id
    }
  ]);

  // OrderItem
  await OrderItem.create([
    {
      order_id: orderId._id,
      product_variant_id: productVariantId._id,
      quantity: 2,
      unit_price: 150000,
      subtotal: 300000
    }
  ]);

  // OrderPromotion
  await OrderPromotion.create([
    {
      order_id: orderId._id,
      promotion_id: promotionId._id,
      discount_applied: 50000
    }
  ]);

  // SupportTicketResponse
  await SupportTicketResponse.create([
    {
      support_ticket_id: supportTicketId._id,
      user_id: userId._id,
      content: 'Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi sớm nhất.'
    }
  ]);

  // FAQ
  await FAQ.create([
    {
      question: 'Làm sao để đặt hàng?',
      answer: 'Bạn có thể đặt hàng trực tiếp trên website hoặc liên hệ hotline.',
      category: 'Đặt hàng'
    }
  ]);

  console.log('Seeder đã chạy xong!');
  process.exit();
}

seed();
