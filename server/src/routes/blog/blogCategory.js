import express from 'express'
import * as blogCategoryController from '../../controllers/blog/blogCategory.js'
// import { verifyToken } from '../../middlewares/auth.js'

const router = express.Router()

// Lấy tất cả danh mục (có phân trang, tìm kiếm, lọc)
router.get('/', blogCategoryController.getAllCategories)

// Lấy danh mục theo ID
router.get('/:id', blogCategoryController.getCategoryById)

// Tạo mới danh mục
router.post('/', blogCategoryController.createCategory)

// Cập nhật danh mục
router.put('/:id', blogCategoryController.updateCategory)

// Xóa mềm danh mục
router.delete('/:id', blogCategoryController.deleteCategory)

// // Thống kê số lượng bài post trong tháng và tỷ lệ tăng/giảm
// router.get('/stats/monthly', verifyToken, postController.getMonthlyPostStats)

export default router 