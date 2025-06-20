import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255 },
  description: { type: String, default: '' },
  base_price: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

productSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
