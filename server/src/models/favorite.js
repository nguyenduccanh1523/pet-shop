import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

favoriteSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
