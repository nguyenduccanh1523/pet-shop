import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, maxlength: 100 },
  description: { type: String, default: '' },
  media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

brandSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
