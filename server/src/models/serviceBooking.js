import mongoose from 'mongoose';

const serviceBookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  booking_date: { type: Date, required: true },
  status: { type: String, required: true, maxlength: 50 },
  notes: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

serviceBookingSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const ServiceBooking = mongoose.model('ServiceBooking', serviceBookingSchema);
export default ServiceBooking;
