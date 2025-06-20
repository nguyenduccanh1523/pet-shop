import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  product_variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  quantity: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

cartItemSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
export default CartItem;
