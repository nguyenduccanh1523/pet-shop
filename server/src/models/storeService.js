import mongoose from 'mongoose';

const storeServiceSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

storeServiceSchema.index({ store_id: 1, service_id: 1 }, { unique: true });

storeServiceSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const StoreService = mongoose.model('StoreService', storeServiceSchema);
export default StoreService;
