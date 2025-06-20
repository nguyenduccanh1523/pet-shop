import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, required: true, maxlength: 50 },
  shipping_address: { type: String, required: true },
  payment_method: { type: String, required: true, maxlength: 50 },
  payment_status: { type: String, required: true, maxlength: 50 },
  order_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

orderSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
