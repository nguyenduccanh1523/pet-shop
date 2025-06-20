import mongoose from 'mongoose';

const productReviewSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

productReviewSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const ProductReview = mongoose.model('ProductReview', productReviewSchema);
export default ProductReview;
