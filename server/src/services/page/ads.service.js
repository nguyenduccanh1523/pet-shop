import {
  Advertisement,
  Media
} from '../../models/index.js';
import mongoose from 'mongoose';


// Lấy tất cả quảng cáo (có phân trang, tìm kiếm, lọc)
export const getAllAds = async ({
    page = 1,
    pageSize = 12,
    keyword = '',
    startDate,
    endDate,
    sort = 'created_at:desc',
    populate = false
}) => {
    const [sortField, sortOrderStr] = sort.split(':');
    const sortOrder = sortOrderStr?.toLowerCase() === 'desc' ? -1 : 1;

    const filter = { deleted_at: null };
    
    // Tìm kiếm theo keyword
    if (keyword) {
        filter.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { content: { $regex: keyword, $options: 'i' } }
        ];
    }

    // Lọc theo ngày bắt đầu
    if (startDate) {
        filter.created_at = { $gte: startDate };
    }

    // Lọc theo ngày kết thúc
    if (endDate) {
        filter.created_at = { ...filter.created_at, $lte: endDate };
    }

    const skip = (page - 1) * pageSize;
    const total = await Advertisement.countDocuments(filter);

    let query = Advertisement.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize);

    // Populate media
    if (populate) {
        query = query.populate('media_id', 'file_path')
    }

    const ads = await query.lean();
    let finalAds = ads;

    // Nếu populate, lấy thêm thông tin images
    if (populate && ads.length > 0) {
        const mediaIds = ads.map(ad => ad.media_id);

        // Lấy images của quảng cáo
        const images = await Media.find({
            _id: { $in: mediaIds },
            deleted_at: null
        }).lean();

        const mediaMap = new Map(images.map(img => [img._id.toString(), img]));

        finalAds = ads.map(ad => ({
            ...ad,
            media: ad.media_id ? mediaMap.get(ad.media_id.toString()) || null : null
        }));
    }

    return {
        data: ads,
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

// Tạo mới quảng cáo
export const createAds = async (data) => {
    const ad = new Advertisement(data);
    await ad.save();
    return ad;
};

// Cập nhật quảng cáo
export const updateAds = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');

    const updated = await Advertisement.findOneAndUpdate(
        { _id: id, deleted_at: null },
        { ...data, updated_at: Date.now() },
        { new: true }
    );

    if (!updated) throw new Error('Không tìm thấy quảng cáo');
    return updated;
};

// Xóa mềm quảng cáo
export const deleteAds = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID không hợp lệ');

    const deleted = await Advertisement.findOneAndUpdate(
        { _id: id, deleted_at: null },
        { deleted_at: Date.now() },
        { new: true }
    );
    
    if (!deleted) throw new Error('Không tìm thấy sản phẩm');
    return { message: 'Xóa sản phẩm thành công' };
};


