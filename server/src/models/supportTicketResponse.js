import mongoose from 'mongoose';

const supportTicketResponseSchema = new mongoose.Schema({
  support_ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportTicket', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

supportTicketResponseSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const SupportTicketResponse = mongoose.model('SupportTicketResponse', supportTicketResponseSchema);
export default SupportTicketResponse;
