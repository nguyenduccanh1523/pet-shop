import ProductCategory from '../../models/productCategory.js';
import Product from '../../models/product.js';
import mongoose from 'mongoose';
import { ProductImage, ProductTag, Tag, Media, ProductVariant } from '../../models/index.js';

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
        const productIds = products.map(p => p._id);

        // Lấy tất cả products của các children categories
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

        // Gộp tất cả product cha và product con
        const allProducts = [
            ...products,
            ...childProducts
        ];
        const allProductIds = allProducts.map(p => p._id);

        // Lấy variants của tất cả product (cha + con)
        const variants = await ProductVariant.find({ product_id: { $in: allProductIds }, deleted_at: null }).lean();
        const variantIds = variants.map(v => v._id);

        // Lấy images của tất cả product và variant, populate media
        const images = await ProductImage.find({
            $or: [
                { product_id: { $in: allProductIds } },
                { product_variant_id: { $in: variantIds } }
            ],
            deleted_at: null
        }).populate('media_id').lean();

        // Lấy tags của tất cả product, populate tag_id
        const tags = await ProductTag.find({ product_id: { $in: allProductIds } }).populate('tag_id').lean();

        console.log('ALL VARIANTS:', variants.map(v => ({ _id: v._id, product_id: v.product_id })));

        categories = categories.map(cat => ({
            ...cat,
            products: products.filter(p => p.category_id.toString() === cat._id.toString()).map(p => {
                // Lấy variants của product
                const productVariants = variants.filter(v => v.product_id.toString() === p._id.toString());
                // Lấy images của product và variant
                const productImages = [
                    ...images.filter(img => img.product_id && img.product_id.toString() === p._id.toString()),
                    ...images.filter(img => img.product_variant_id && productVariants.some(v => v._id.toString() === img.product_variant_id.toString()))
                ];
                // Lấy tags của product
                const productTags = tags.filter(t => t.product_id.toString() === p._id.toString() && t.tag_id);
                return {
                    ...p,
                    variants: productVariants,
                    images: productImages,
                    tags: productTags.map(t => t.tag_id).filter(Boolean)
                };
            }),
            children: childCategories.filter(child => 
                child.parent_id.toString() === cat._id.toString()
            ).map(child => {
                const childProds = childProducts.filter(p => p.category_id.toString() === child._id.toString());
                return {
                    ...child,
                    products: childProds.map(p => {
                        const productVariants = variants.filter(v => v.product_id.toString() === p._id.toString());
                        const productImages = [
                            ...images.filter(img => img.product_id && img.product_id.toString() === p._id.toString()),
                            ...images.filter(img => img.product_variant_id && productVariants.some(v => v._id.toString() === img.product_variant_id.toString()))
                        ];
                        const productTags = tags.filter(t => t.product_id.toString() === p._id.toString() && t.tag_id);
                        return {
                            ...p,
                            variants: productVariants,
                            images: productImages,
                            tags: productTags.map(t => t.tag_id).filter(Boolean)
                        };
                    })
                };
            })
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