;
import mongoose from 'mongoose';
import { Blog, BlogCategory, Media, User } from '../../models/index.js';

// Lấy tất cả danh mục (có phân trang, tìm kiếm, lọc)
export const getAllCategories = async ({
    page = 1,
    pageSize = 10,
    keyword = '',
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

    const skip = (page - 1) * pageSize;
    const total = await BlogCategory.countDocuments(filter);
    // Lấy category và populate media nếu có trường media_id
    let categories = await BlogCategory.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize)
        .lean();

    // Lấy bài post cho từng category
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        // Lấy media nếu có trường media_id
        let media = null;
        let user = null;
        if (cat.media_id) {
            media = await Media.findById(cat.media_id).lean();
        }
        if (cat.user_id) {
            media = await User.findById(cat.user_id).lean();
        }
        // Lấy danh sách bài post thuộc category
        const blogs = await Blog.find({ blog_category_id: cat._id, deleted_at: null })
            .populate('media_id')
            .populate('user_id')
            .lean();
        categories[i] = {
            ...cat,
            media,
            blogs
        };
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
    const category = await BlogCategory.findOne({ _id: id, deleted_at: null }).lean();
    if (!category) throw new Error('Không tìm thấy danh mục');
    
    // Nếu cần include children categories
    if (includeChildren) {
        const childCategories = await BlogCategory.find({ 
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
    const category = new BlogCategory(data);
    await category.save();
    return category;
};

// Cập nhật danh mục
export const updateCategory = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    const updated = await BlogCategory.findOneAndUpdate(
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
    const deleted = await BlogCategory.findOneAndUpdate(
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
    
    const children = await BlogCategory.find({ 
        parent_id: parentId, 
        deleted_at: null 
    }).lean();
    
    // Nếu cần include grandchildren
    if (includeGrandchildren && children.length > 0) {
        const childIds = children.map(child => child._id);
        const grandchildren = await BlogCategory.find({ 
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