import express from 'express';
import * as blogController from '../../controllers/blog/blog.js';

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
