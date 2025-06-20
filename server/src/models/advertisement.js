import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, default: '' },
  media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  link_url: { type: String, default: '', maxlength: 255 },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

advertisementSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;
