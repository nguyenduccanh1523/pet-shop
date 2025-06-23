import { Blog } from '../../models/index.js';
import mongoose from 'mongoose';

// Lấy tất cả blog, có phân trang, tìm kiếm, sort, populate user và media
export const getAllBlogs = async (options = {}) => {
  const {
    page = 1,
    pageSize = 10,
    keyword = '',
    sort = 'created_at:desc',
  } = options;
  const [sortField, sortOrderStr] = sort.split(':');
  const sortOrder = sortOrderStr?.toLowerCase() === 'desc' ? -1 : 1;

  const filter = { deleted_at: null };
  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { content: { $regex: keyword, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * pageSize;
  const total = await Blog.countDocuments(filter);

  const blogs = await Blog.find(filter)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(pageSize)
    .populate({ path: 'user_id', model: 'User' })
    .populate({ path: 'media_id', model: 'Media' })
    .lean();

  return {
    data: blogs,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
        total
      }
    }
  };
};

// Lấy blog theo id
export const getBlogById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
  const blog = await Blog.findOne({ _id: id, deleted_at: null })
    .populate({ 
      path: 'user_id', 
      model: 'User',
      populate: { path: 'avatar_id', model: 'Media' }
    })
    .populate({ path: 'media_id', model: 'Media' })
    .populate({ path: 'blog_category_id', model: 'BlogCategory' })
    .lean();
  if (!blog) throw new Error('Không tìm thấy blog');
  return blog;
};

// Tạo blog mới
export const createBlog = async (data) => {
  const blog = new Blog(data);
  await blog.save();
  return blog;
};

// Cập nhật blog
export const updateBlog = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
  const updated = await Blog.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { ...data, updated_at: Date.now() },
    { new: true }
  );
  if (!updated) throw new Error('Không tìm thấy blog');
  return updated;
};

// Xóa mềm blog
export const deleteBlog = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
  const deleted = await Blog.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { deleted_at: Date.now() },
    { new: true }
  );
  if (!deleted) throw new Error('Không tìm thấy blog');
  return { message: 'Xóa blog thành công' };
};
