import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true, maxlength: 255 },
  description: { type: String, required: true },
  status: { type: String, required: true, maxlength: 50 },
  priority: { type: String, required: true, maxlength: 50 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

supportTicketSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);
export default SupportTicket;
