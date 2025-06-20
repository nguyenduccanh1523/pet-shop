import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  product_variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', default: null },
  media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

productImageSchema.index({ product_id: 1, product_variant_id: 1, media_id: 1 }, { unique: true });

productImageSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);
export default ProductImage;
