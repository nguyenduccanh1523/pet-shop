import ProductCategory from '../../models/productCategory.js';
import Product from '../../models/product.js';
import mongoose from 'mongoose';

// Lấy tất cả danh mục (có phân trang, tìm kiếm, lọc)
export const getAllCategories = async ({
    page = 1,
    pageSize = 10,
    keyword = '',
    parent_id,
    sort = 'created_at:desc',
    populate = false,
    includeChildren = false
}) => {
    const [sortField, sortOrderStr] = sort.split(':');
    const sortOrder = sortOrderStr?.toLowerCase() === 'desc' ? -1 : 1;

    const filter = { deleted_at: null };
    if (keyword) {
        filter.name = { $regex: keyword, $options: 'i' };
    }
    if (parent_id === null || parent_id === 'null' || parent_id === '') {
        filter.parent_id = null;
      } else if (typeof parent_id !== 'undefined') {
        const cleaned = String(parent_id).trim();
        if (mongoose.Types.ObjectId.isValid(cleaned)) {
          filter.parent_id = new mongoose.Types.ObjectId(cleaned);
        } else {
          filter._id = mongoose.Types.ObjectId(); // điều kiện không hợp lệ
        }
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
        
        // Lấy tất cả category con thuộc các category này
        const childCategories = await ProductCategory.find({ 
            parent_id: { $in: categoryIds }, 
            deleted_at: null 
        }).lean();
        
        // Lấy tất cả products của các children categories
        const childCategoryIds = childCategories.map(child => child._id);
        const childProducts = await Product.find({ 
            category_id: { $in: childCategoryIds }, 
            deleted_at: null 
        }).lean();
        
        // Gán products và children vào từng category
        categories = categories.map(cat => ({
            ...cat,
            products: products.filter(p => p.category_id.toString() === cat._id.toString()),
            children: childCategories.filter(child => 
                child.parent_id.toString() === cat._id.toString()
            ).map(child => ({
                ...child,
                products: childProducts.filter(p => p.category_id.toString() === child._id.toString())
            }))
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
export const getCategoryById = async (id, includeChildren = false) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    const category = await ProductCategory.findOne({ _id: id, deleted_at: null }).lean();
    if (!category) throw new Error('Không tìm thấy danh mục');
    
    // Nếu cần include children categories
    if (includeChildren) {
        const childCategories = await ProductCategory.find({ 
            parent_id: id, 
            deleted_at: null 
        }).lean();
        
        return {
            ...category,
            children: childCategories
        };
    }
    
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

// Lấy tất cả category con của một category
export const getCategoryChildren = async (parentId, includeGrandchildren = false) => {
    if (!mongoose.Types.ObjectId.isValid(parentId)) throw new Error('ID không hợp lệ');
    
    const children = await ProductCategory.find({ 
        parent_id: parentId, 
        deleted_at: null 
    }).lean();
    
    // Nếu cần include grandchildren
    if (includeGrandchildren && children.length > 0) {
        const childIds = children.map(child => child._id);
        const grandchildren = await ProductCategory.find({ 
            parent_id: { $in: childIds }, 
            deleted_at: null 
        }).lean();
        
        // Gán grandchildren vào từng child
        const childrenWithGrandchildren = children.map(child => ({
            ...child,
            children: grandchildren.filter(grandchild => 
                grandchild.parent_id.toString() === child._id.toString()
            )
        }));
        
        return childrenWithGrandchildren;
    }
    
    return children;
}; 