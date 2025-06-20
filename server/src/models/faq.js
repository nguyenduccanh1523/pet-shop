import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true, maxlength: 255 },
  answer: { type: String, required: true },
  category: { type: String, default: '', maxlength: 100 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

faqSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
