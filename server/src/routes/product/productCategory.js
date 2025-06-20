import express from 'express'
import * as productCategoryController from '../../controllers/product/productCategory.js'
// import { verifyToken } from '../../middlewares/auth.js'

const router = express.Router()

// Lấy tất cả danh mục (có phân trang, tìm kiếm, lọc)
router.get('/', productCategoryController.getAllCategories)

// Lấy danh mục theo ID
router.get('/:id', productCategoryController.getCategoryById)

// Tạo mới danh mục
router.post('/', productCategoryController.createCategory)

// Cập nhật danh mục
router.put('/:id', productCategoryController.updateCategory)

// Xóa mềm danh mục
router.delete('/:id', productCategoryController.deleteCategory)

// // Thống kê số lượng bài post trong tháng và tỷ lệ tăng/giảm
// router.get('/stats/monthly', verifyToken, postController.getMonthlyPostStats)

export default router 