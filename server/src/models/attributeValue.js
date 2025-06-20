import mongoose from 'mongoose';

const attributeValueSchema = new mongoose.Schema({
  attribute_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Attribute', required: true },
  value: { type: String, required: true, maxlength: 100 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

attributeValueSchema.index({ attribute_id: 1, value: 1 }, { unique: true });

attributeValueSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const AttributeValue = mongoose.model('AttributeValue', attributeValueSchema);
export default AttributeValue;
