import * as adsService from '../../services/page/ads.service.js';

// Lấy tất cả quảng cáo
export const getAllAds = async (req, res) => {
    try {
        const {
            page = 1,
            pageSize = 12,
            keyword = '',
            startDate,
            endDate,
            sort = 'created_at:desc',
            populate = false
        } = req.query;

        const result = await adsService.getAllAds({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            keyword,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            sort,
            populate: populate === 'true'
        });

        res.json({
            success: true,
            message: 'Lấy danh sách quảng cáo thành công',
            data: result.data,
            meta: result.meta
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách quảng cáo',
            error: error.message
        });
    }
};

// Tạo mới quảng cáo
export const createAds = async (req, res) => {
    try {
        const adsData = req.body;

        // Validate dữ liệu
        if (!adsData.name || !adsData.media_id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin bắt buộc: name, media_id'
            });
        }

        const ads = await adsService.createAds(adsData);

        res.status(201).json({
            success: true,
            message: 'Tạo quảng cáo thành công',
            data: ads
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo quảng cáo',
            error: error.message
        });
    }
};

// Cập nhật quảng cáo
export const updateAds = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const ads = await adsService.updateAds(id, updateData);

        res.json({
            success: true,
            message: 'Cập nhật quảng cáo thành công',
            data: ads
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Không tìm thấy quảng cáo hoặc lỗi khi cập nhật',
            error: error.message
        });
    }
};

// Xóa quảng cáo
export const deleteAds = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await productService.deleteAds(id);

        res.json({
            success: true,
            message: result.message
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Không tìm thấy quảng cáo hoặc lỗi khi xóa',
            error: error.message
        });
    }
};

