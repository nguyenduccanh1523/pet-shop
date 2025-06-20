import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  description: {
    type: String,
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

blogCategorySchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);
export default BlogCategory; 