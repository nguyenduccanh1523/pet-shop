import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  file_path: {
    type: String,
    required: true,
    maxlength: 255
  },
  file_type: {
    type: String,
    required: true,
    maxlength: 50
  },
  file_size: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: null
  }
});

mediaSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Media = mongoose.model('Media', mediaSchema);
export default Media; 