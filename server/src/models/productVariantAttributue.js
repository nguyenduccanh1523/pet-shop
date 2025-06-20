import mongoose from 'mongoose';

const productVariantAttributeSchema = new mongoose.Schema({
  product_variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  attribute_value_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

productVariantAttributeSchema.index({ product_variant_id: 1, attribute_value_id: 1 }, { unique: true });

productVariantAttributeSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const ProductVariantAttribute = mongoose.model('ProductVariantAttribute', productVariantAttributeSchema);
export default ProductVariantAttribute;
