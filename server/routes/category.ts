import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const router = express.Router();

router.post('/', authenticateAccessToken, CategoryController.createCategory);
router.put(
  '/:categoryId',
  authenticateAccessToken,
  CategoryController.updateCategory
);
router.delete(
  '/:categoryId',
  authenticateAccessToken,
  CategoryController.deleteCategory
);

export default router;
