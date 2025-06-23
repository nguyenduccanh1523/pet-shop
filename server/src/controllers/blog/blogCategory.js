import * as blogCategoryService from '../../services/blog/blogCategory.service.js';

export const getAllCategories = async (req, res) => {
    try {
        // Đọc phân trang dạng pagination[page], pagination[pageSize]
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const keyword = req.query.keyword || '';
        const sort = req.query.sort || 'created_at:desc';
        const populate = req.query.populate === '*' ? true : false;

        const result = await blogCategoryService.getAllCategories({
            page, pageSize, keyword, sort, populate
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ err: -1, message: 'Lỗi server: ' + error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await blogCategoryService.getCategoryById(id);
        return res.status(200).json({ err: 0, data: category });
    } catch (error) {
        return res.status(404).json({ err: -1, message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const category = await blogCategoryService.createCategory(data);
        return res.status(201).json({ err: 0, message: 'Tạo danh mục thành công', data: category });
    } catch (error) {
        return res.status(400).json({ err: -1, message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await blogCategoryService.updateCategory(id, data);
        return res.status(200).json({ err: 0, message: 'Cập nhật danh mục thành công', data: updated });
    } catch (error) {
        return res.status(400).json({ err: -1, message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await blogCategoryService.deleteCategory(id);
        return res.status(200).json({ err: 0, ...result });
    } catch (error) {
        return res.status(400).json({ err: -1, message: error.message });
    }
}; 