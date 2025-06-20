import mongoose from 'mongoose';

const storeProductSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  product_variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  stock_quantity: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

storeProductSchema.index({ store_id: 1, product_variant_id: 1 }, { unique: true });

storeProductSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const StoreProduct = mongoose.model('StoreProduct', storeProductSchema);
export default StoreProduct;
