import mongoose from 'mongoose';

const productPromotionSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  promotion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

productPromotionSchema.index({ product_id: 1, promotion_id: 1 }, { unique: true });

productPromotionSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const ProductPromotion = mongoose.model('ProductPromotion', productPromotionSchema);
export default ProductPromotion;
