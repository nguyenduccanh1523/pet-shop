import express from 'express';
import * as productController from '../../controllers/product/product.js';

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Tìm kiếm sản phẩm
router.get('/search/:keyword', productController.searchProducts);

// Lấy sản phẩm theo category
router.get('/category/:categoryId', productController.getProductsByCategory);

// Lấy sản phẩm theo ID
router.get('/:id', productController.getProductById);

// Tạo mới sản phẩm
router.post('/', productController.createProduct);

// Cập nhật sản phẩm
router.put('/:id', productController.updateProduct);

// Xóa sản phẩm
router.delete('/:id', productController.deleteProduct);

export default router;
