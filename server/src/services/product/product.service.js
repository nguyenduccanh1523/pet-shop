import {
  Product,
  Brand,
  ProductVariant,
  ProductImage,
  ProductTag,
  ProductCategory,
  ProductVariantAttribute,
  AttributeValue,
  Tag,
  Media
} from '../../models/index.js';
import mongoose from 'mongoose';


// Lấy tất cả sản phẩm (có phân trang, tìm kiếm, lọc)
export const getAllProducts = async ({
    page = 1,
    pageSize = 12,
    keyword = '',
    category_id,
    brand_id,
    minPrice,
    maxPrice,
    sort = 'created_at:desc',
    populate = false
}) => {
    const [sortField, sortOrderStr] = sort.split(':');
    const sortOrder = sortOrderStr?.toLowerCase() === 'desc' ? -1 : 1;

    const filter = { deleted_at: null };
    
    // Tìm kiếm theo keyword
    if (keyword) {
        filter.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
        ];
    }
    
    // Lọc theo category
    if (category_id) {
        if (mongoose.Types.ObjectId.isValid(category_id)) {
            filter.category_id = new mongoose.Types.ObjectId(category_id);
        }
    }
    
    // Lọc theo brand
    if (brand_id) {
        if (mongoose.Types.ObjectId.isValid(brand_id)) {
            filter.brand_id = new mongoose.Types.ObjectId(brand_id);
        }
    }
    
    // Lọc theo giá
    if (minPrice || maxPrice) {
        filter.base_price = {};
        if (minPrice) filter.base_price.$gte = Number(minPrice);
        if (maxPrice) filter.base_price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * pageSize;
    const total = await Product.countDocuments(filter);
    
    let query = Product.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize);

    // Populate category và brand nếu cần
    if (populate) {
        query = query.populate('category_id', 'name').populate('brand_id', 'name');
    }

    const products = await query.lean();

    // Nếu populate, lấy thêm thông tin variants, images, tags
    if (populate && products.length > 0) {
        const productIds = products.map(p => p._id);
        
        // Lấy variants
        const variants = await ProductVariant.find({ 
            product_id: { $in: productIds }, 
            deleted_at: null 
        }).lean();
        
        // Lấy images
        const images = await ProductImage.find({ 
            product_id: { $in: productIds }, 
            deleted_at: null 
        }).populate('media_id').lean();
        
        // Lấy images của các variant
        const variantIds = variants.map(v => v._id);
        const variantImages = await ProductImage.find({
            product_variant_id: { $in: variantIds },
            deleted_at: null
        }).populate('media_id').lean();
        
        // Lấy tags
        const tags = await ProductTag.find({ 
            product_id: { $in: productIds } 
        }).populate('tag_id').lean();
        
        // Gán thông tin vào từng product
        products.forEach(product => {
            product.variants = variants.filter(v => v.product_id.toString() === product._id.toString());
            product.images = [
                ...images.filter(img => img.product_id.toString() === product._id.toString()),
                ...variantImages.filter(img => img.product_variant_id.toString() === product._id.toString())
            ];
            product.tags = tags.filter(tag => tag.tag_id);
        });
    }

    return {
        data: products,
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

// Lấy sản phẩm theo ID
export const getProductById = async (id, populate = false) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    
    let query = Product.findOne({ _id: id, deleted_at: null });
    
    if (populate) {
        query = query.populate('category_id', 'name').populate('brand_id', 'name');
    }
    
    const product = await query.lean();
    if (!product) throw new Error('Không tìm thấy sản phẩm');
    
    // Nếu populate, lấy thêm thông tin chi tiết
    if (populate) {
        // Lấy variants
        const variants = await ProductVariant.find({ 
            product_id: product._id, 
            deleted_at: null 
        }).lean();
        
        // Lấy variant attributes cho từng variant
        const variantIds = variants.map(v => v._id);
        const variantAttributes = await ProductVariantAttribute.find({
            product_variant_id: { $in: variantIds },
            deleted_at: null
        }).populate('attribute_value_id').lean();
        
        // Gán attributes vào từng variant
        variants.forEach(variant => {
            variant.attributes = variantAttributes.filter(
                attr => attr.product_variant_id.toString() === variant._id.toString()
            );
        });
        
        // Lấy images
        const images = await ProductImage.find({ 
            product_id: product._id, 
            deleted_at: null 
        }).populate('media_id').lean();
        
        // Lấy images của các variant
        const variantImages = await ProductImage.find({
            product_variant_id: { $in: variantIds },
            deleted_at: null
        }).populate('media_id').lean();
        
        // Gộp lại
        product.images = [
            ...images,
            ...variantImages
        ];
        
        // Lấy tags
        const tags = await ProductTag.find({ 
            product_id: product._id 
        }).populate('tag_id').lean();
        
        // Gán thông tin vào product
        product.variants = variants;
        product.images = product.images;
        product.tags = tags.filter(tag => tag.tag_id);
    }
    
    return product;
};

// Tạo mới sản phẩm
export const createProduct = async (data) => {
    const product = new Product(data);
    await product.save();
    return product;
};

// Cập nhật sản phẩm
export const updateProduct = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    
    const updated = await Product.findOneAndUpdate(
        { _id: id, deleted_at: null },
        { ...data, updated_at: Date.now() },
        { new: true }
    );
    
    if (!updated) throw new Error('Không tìm thấy sản phẩm');
    return updated;
};

// Xóa mềm sản phẩm
export const deleteProduct = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');
    
    const deleted = await Product.findOneAndUpdate(
        { _id: id, deleted_at: null },
        { deleted_at: Date.now() },
        { new: true }
    );
    
    if (!deleted) throw new Error('Không tìm thấy sản phẩm');
    return { message: 'Xóa sản phẩm thành công' };
};

// Lấy sản phẩm theo category
export const getProductsByCategory = async (categoryId, options = {}) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) throw new Error('Category ID không hợp lệ');
    
    const { page = 1, pageSize = 12, sort = 'created_at:desc', populate = false } = options;
    const [sortField, sortOrderStr] = sort.split(':');
    const sortOrder = sortOrderStr?.toLowerCase() === 'desc' ? -1 : 1;

    const filter = { 
        category_id: new mongoose.Types.ObjectId(categoryId), 
        deleted_at: null 
    };

    const skip = (page - 1) * pageSize;
    const total = await Product.countDocuments(filter);
    
    let query = Product.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize);

    if (populate) {
        query = query.populate('category_id', 'name').populate('brand_id', 'name');
    }

    const products = await query.lean();

    // Nếu populate, lấy thêm thông tin variants, images, tags
    if (populate && products.length > 0) {
        const productIds = products.map(p => p._id);
        
        // Lấy variants
        const variants = await ProductVariant.find({ 
            product_id: { $in: productIds }, 
            deleted_at: null 
        }).lean();
        
        // Lấy images
        const images = await ProductImage.find({ 
            product_id: { $in: productIds }, 
            deleted_at: null 
        }).populate('media_id').lean();
        
        // Lấy images của các variant
        const variantIds = variants.map(v => v._id);
        const variantImages = await ProductImage.find({
            product_variant_id: { $in: variantIds },
            deleted_at: null
        }).populate('media_id').lean();
        
        // Lấy tags
        const tags = await ProductTag.find({ 
            product_id: { $in: productIds } 
        }).populate('tag_id').lean();
        
        // Gán thông tin vào từng product
        products.forEach(product => {
            product.variants = variants.filter(v => v.product_id.toString() === product._id.toString());
            product.images = [
                ...images.filter(img => img.product_id.toString() === product._id.toString()),
                ...variantImages.filter(img => img.product_variant_id.toString() === product._id.toString())
            ];
            product.tags = tags.filter(tag => tag.tag_id);
        });
    }

    return {
        data: products,
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

// Tìm kiếm sản phẩm
export const searchProducts = async (keyword, options = {}) => {
    const { page = 1, pageSize = 12, sort = 'created_at:desc', populate = false } = options;
    const [sortField, sortOrderStr] = sort.split(':');
    const sortOrder = sortOrderStr?.toLowerCase() === 'desc' ? -1 : 1;

    const filter = {
        deleted_at: null,
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
        ]
    };

    const skip = (page - 1) * pageSize;
    const total = await Product.countDocuments(filter);
    
    let query = Product.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize);

    if (populate) {
        query = query.populate('category_id', 'name').populate('brand_id', 'name');
    }

    const products = await query.lean();

    // Nếu populate, lấy thêm thông tin variants, images, tags
    if (populate && products.length > 0) {
        const productIds = products.map(p => p._id);
        
        // Lấy variants
        const variants = await ProductVariant.find({ 
            product_id: { $in: productIds }, 
            deleted_at: null 
        }).lean();
        
        // Lấy images
        const images = await ProductImage.find({ 
            product_id: { $in: productIds }, 
            deleted_at: null 
        }).populate('media_id').lean();
        
        // Lấy images của các variant
        const variantIds = variants.map(v => v._id);
        const variantImages = await ProductImage.find({
            product_variant_id: { $in: variantIds },
            deleted_at: null
        }).populate('media_id').lean();
        
        // Lấy tags
        const tags = await ProductTag.find({ 
            product_id: { $in: productIds } 
        }).populate('tag_id').lean();
        
        // Gán thông tin vào từng product
        products.forEach(product => {
            product.variants = variants.filter(v => v.product_id.toString() === product._id.toString());
            product.images = [
                ...images.filter(img => img.product_id.toString() === product._id.toString()),
                ...variantImages.filter(img => img.product_variant_id.toString() === product._id.toString())
            ];
            product.tags = tags.filter(tag => tag.tag_id);
        });
    }

    return {
        data: products,
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
