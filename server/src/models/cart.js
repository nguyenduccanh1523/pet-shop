import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

cartSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
