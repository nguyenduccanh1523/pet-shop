import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from '../models/blogPost.js';
import User from '../models/user.js';
import Media from '../models/media.js';
import BlogCategory from '../models/blogCategory.js';

dotenv.config();

const seedBlogPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();
    const media = await Media.findOne();
    const category = await BlogCategory.findOne();

    if (!user || !media || !category) throw new Error('Thiếu user, media hoặc blog category');

    await BlogPost.deleteMany();
    await BlogPost.insertMany([
      {
        user_id: user._id,
        title: 'Cách chăm sóc chó mùa hè',
        content: 'Nội dung bài viết về chăm sóc chó mùa hè...',
        media_id: media._id,
        published_at: new Date(),
        blog_category_id: category._id
      }
    ]);
    console.log('✅ Seed blog posts thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Seed blog posts lỗi:', err);
    process.exit(1);
  }
};

seedBlogPosts();
