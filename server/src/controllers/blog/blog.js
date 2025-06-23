import * as blogService from '../../services/blog/blog.service.js';

export const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      keyword = '',
      sort = 'created_at:desc',
    } = req.query;
    const result = await blogService.getAllBlogs({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      keyword,
      sort
    });
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách blog thành công',
      data: result.data,
      meta: result.meta
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body);
    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const result = await blogService.deleteBlog(req.params.id);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
