import mongoose from 'mongoose';

const orderPromotionSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  promotion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
  discount_applied: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

orderPromotionSchema.index({ order_id: 1, promotion_id: 1 }, { unique: true });

orderPromotionSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const OrderPromotion = mongoose.model('OrderPromotion', orderPromotionSchema);
export default OrderPromotion;
