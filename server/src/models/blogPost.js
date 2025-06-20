import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, required: true },
  media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  published_at: { type: Date, default: null },
  blog_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

blogPostSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
