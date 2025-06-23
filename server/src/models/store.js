import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: true },
  phone: { type: String, required: true, maxlength: 20 },
  email: { type: String, default: null, maxlength: 100 },
  image_story: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

storeSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Store = mongoose.model('Store', storeSchema);
export default Store;
