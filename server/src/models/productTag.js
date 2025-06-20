import mongoose from 'mongoose';

const productTagSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

productTagSchema.index({ product_id: 1, tag_id: 1 }, { unique: true });

productTagSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const ProductTag = mongoose.model('ProductTag', productTagSchema);
export default ProductTag;
