import mongoose from 'mongoose';

const recruitmentSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  title: { type: String, required: true, maxlength: 255 },
  description: { type: String, default: '' },
  requirements: { type: String, default: '' },
  status: { type: String, required: true, maxlength: 50 },
  salary_range: { type: String, default: '', maxlength: 100 },
  application_deadline: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

recruitmentSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Recruitment = mongoose.model('Recruitment', recruitmentSchema);
export default Recruitment;
