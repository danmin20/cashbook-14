import express from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = express.Router();

router.post('/', CategoryController.createCategory);
router.put('/:categoryId', CategoryController.updateCategory);
router.delete('/:categoryId', CategoryController.deleteCategory);

export default router;
