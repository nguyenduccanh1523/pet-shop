import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 255,
    default: ''
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

// Middleware cập nhật updated_at khi save
roleSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Role = mongoose.model('Role', roleSchema);

export default Role;