import * as productCategoryService from '../../services/product/productCategory.service.js';

export const getAllCategories = async (req, res) => {
    try {
        // Đọc phân trang dạng pagination[page], pagination[pageSize]
        const page = parseInt(req.query.pagination?.page) || parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pagination?.pageSize) || parseInt(req.query.pageSize) || 10;
        const keyword = req.query.keyword || '';
        const parent_id = req.query.parent_id || null;
        const sortQuery = req.query.sort || 'createdAt:DESC';
        const populate = req.query.populate === '*' ? true : false;

        // Tách sortField và sortOrder
        let sortField = 'created_at';
        let sortOrder = -1;
        if (sortQuery) {
            const [field, order] = sortQuery.split(':');
            sortField = field || 'created_at';
            sortOrder = (order && order.toUpperCase() === 'ASC') ? 1 : -1;
        }

        const result = await productCategoryService.getAllCategories({
            page, pageSize, keyword, parent_id, sortField, sortOrder, populate
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ err: -1, message: 'Lỗi server: ' + error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await productCategoryService.getCategoryById(id);
        return res.status(200).json({ err: 0, data: category });
    } catch (error) {
        return res.status(404).json({ err: -1, message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const category = await productCategoryService.createCategory(data);
        return res.status(201).json({ err: 0, message: 'Tạo danh mục thành công', data: category });
    } catch (error) {
        return res.status(400).json({ err: -1, message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await productCategoryService.updateCategory(id, data);
        return res.status(200).json({ err: 0, message: 'Cập nhật danh mục thành công', data: updated });
    } catch (error) {
        return res.status(400).json({ err: -1, message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await productCategoryService.deleteCategory(id);
        return res.status(200).json({ err: 0, ...result });
    } catch (error) {
        return res.status(400).json({ err: -1, message: error.message });
    }
}; 