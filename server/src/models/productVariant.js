import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sku: { type: String, required: true, unique: true, maxlength: 100 },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

productVariantSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);
export default ProductVariant;
