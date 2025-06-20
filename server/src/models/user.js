import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  bio: { type: String, default: '' },
  date_of_birth: { type: Date, default: null },
  phone: { type: String, default: null },
  gender: { type: String, default: null },
  address: { type: String, default: null },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  email_verified: { type: Boolean, default: false },
  refresh_token: { type: String, default: null },
  refresh_token_expires: { type: Date, default: null },
  reset_password_token: { type: String, default: null },
  reset_password_expires: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
