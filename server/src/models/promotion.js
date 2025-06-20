import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, maxlength: 50 },
  description: { type: String, default: '' },
  discount_type: { type: String, required: true, maxlength: 20 },
  discount_value: { type: Number, required: true },
  media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

promotionSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Promotion = mongoose.model('Promotion', promotionSchema);
export default Promotion;
