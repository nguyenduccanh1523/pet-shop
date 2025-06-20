import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  duration: { type: Number, default: null }, // phút
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

serviceSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
