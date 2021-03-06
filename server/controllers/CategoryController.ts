import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/CategoryService';

async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.user;

    const { body } = req;

    const result = await CategoryService.createCategory({ userId, ...body });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.user;

    const { categoryId } = req.params;

    const { body } = req;

    const result = await CategoryService.updateCategory(
      { id: parseInt(categoryId), userId },
      { ...body }
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.user;

    const { categoryId } = req.params;

    const result = await CategoryService.deleteCategory({
      id: parseInt(categoryId),
      userId,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const CategoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
};
