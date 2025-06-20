import ProductCategory from '../../models/productCategory.js';
import Product from '../../models/product.js';
import mongoose from 'mongoose';

// Lấy tất cả danh mục (có phân trang, tìm kiếm, lọc)
export const getAllCategories = async ({
    page = 1,
    pageSize = 10,
    keyword = '',
    parent_id,
    sortField = 'created_at',
    sortOrder = -1,
    populate = false
}) => {
    const filter = { deleted_at: null };
    if (keyword) {
        filter.name = { $regex: keyword, $options: 'i' };
    }
    if (parent_id !== undefined) {
        filter.parent_id = (parent_id === null || parent_id === 'null' || parent_id === '') ? null : parent_id;
    }
    const skip = (page - 1) * pageSize;
    const total = await ProductCategory.countDocuments(filter);
    let categories = await ProductCategory.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize)
        .lean();

    // Nếu cần populate products
    if (populate) {
        const categoryIds = categories.map(cat => cat._id);
        // Lấy tất cả products thuộc các category này
        const products = await Product.find({ category_id: { $in: categoryIds }, deleted_at: null }).lean();
        // Gán products vào từng category
        categories = categories.map(cat => ({
            ...cat,
            products: products.filter(p => p.category_id.toString() === cat._id.toString())
        }));
    }

    return {
        data: categories,
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

// Lấy danh mục theo ID
export const getCategoryById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    const category = await ProductCategory.findOne({ _id: id, deleted_at: null }).lean();
    if (!category) throw new Error('Không tìm thấy danh mục');
    return category;
};

// Tạo mới danh mục
export const createCategory = async (data) => {
    const category = new ProductCategory(data);
    await category.save();
    return category;
};

// Cập nhật danh mục
export const updateCategory = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    const updated = await ProductCategory.findOneAndUpdate(
        { _id: id, deleted_at: null },
        { ...data, updated_at: Date.now() },
        { new: true }
    );
    if (!updated) throw new Error('Không tìm thấy danh mục');
    return updated;
};

// Xóa mềm danh mục
export const deleteCategory = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    const deleted = await ProductCategory.findOneAndUpdate(
        { _id: id, deleted_at: null },
        { deleted_at: Date.now() },
        { new: true }
    );
    if (!deleted) throw new Error('Không tìm thấy danh mục');
    return { message: 'Xóa danh mục thành công' };
}; 