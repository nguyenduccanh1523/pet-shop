import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
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

attributeSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Attribute = mongoose.model('Attribute', attributeSchema);
export default Attribute; 