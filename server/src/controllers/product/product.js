import * as productService from '../../services/product/product.service.js';

// Lấy tất cả sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        const {
            page = 1,
            pageSize = 12,
            keyword = '',
            category_id,
            brand_id,
            minPrice,
            maxPrice,
            sort = 'created_at:desc',
            populate = false
        } = req.query;

        const result = await productService.getAllProducts({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            keyword,
            category_id,
            brand_id,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            sort,
            populate: populate === 'true'
        });

        res.json({
            success: true,
            message: 'Lấy danh sách sản phẩm thành công',
            data: result.data,
            meta: result.meta
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách sản phẩm',
            error: error.message
        });
    }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { populate = false } = req.query;

        const product = await productService.getProductById(id, populate === 'true');

        res.json({
            success: true,
            message: 'Lấy thông tin sản phẩm thành công',
            data: product
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Không tìm thấy sản phẩm',
            error: error.message
        });
    }
};

// Tạo mới sản phẩm
export const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Validate dữ liệu
        if (!productData.name || !productData.base_price || !productData.category_id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin bắt buộc: name, base_price, category_id'
            });
        }

        const product = await productService.createProduct(productData);

        res.status(201).json({
            success: true,
            message: 'Tạo sản phẩm thành công',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo sản phẩm',
            error: error.message
        });
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const product = await productService.updateProduct(id, updateData);

        res.json({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            data: product
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Không tìm thấy sản phẩm hoặc lỗi khi cập nhật',
            error: error.message
        });
    }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await productService.deleteProduct(id);

        res.json({
            success: true,
            message: result.message
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Không tìm thấy sản phẩm hoặc lỗi khi xóa',
            error: error.message
        });
    }
};

// Lấy sản phẩm theo category
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const {
            page = 1,
            pageSize = 12,
            sort = 'created_at:desc',
            populate = false
        } = req.query;

        const result = await productService.getProductsByCategory(categoryId, {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            sort,
            populate: populate === 'true'
        });

        res.json({
            success: true,
            message: 'Lấy danh sách sản phẩm theo danh mục thành công',
            data: result.data,
            meta: result.meta
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách sản phẩm theo danh mục',
            error: error.message
        });
    }
};

// Tìm kiếm sản phẩm
export const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        const {
            page = 1,
            pageSize = 12,
            sort = 'created_at:desc',
            populate = false
        } = req.query;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Từ khóa tìm kiếm không được để trống'
            });
        }

        const result = await productService.searchProducts(keyword, {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            sort,
            populate: populate === 'true'
        });

        res.json({
            success: true,
            message: 'Tìm kiếm sản phẩm thành công',
            data: result.data,
            meta: result.meta
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tìm kiếm sản phẩm',
            error: error.message
        });
    }
};
