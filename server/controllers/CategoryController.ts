import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/CategoryService';

async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { body } = req;
    // TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
    // 이름 중복 확인(수입/지출 따로)
    // ...

    // TODO
    const result = await CategoryService.createCategory({ userId, ...body });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// 중요! update 문제 발생 소지가 있음: type이 기존에 연결된 history의 것과 달라지는 경우
async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { categoryId } = req.params;
    // TODO: forbidden check
    // 수도코드:
    // await CategoryService.checkForbidden({ userId, categoryId });
    /*
      const cur = await CategoryService.findById({ id: categoryId });
      if (cur.user.id !== userId) {
        forbidden;
        return;
      }
    */

    const { body } = req;
    // TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
    // 이름 중복 확인(수입/지출 따로)
    // ...

    // TODO
    const result = await CategoryService.updateCategory(
      { id: categoryId },
      { ...body }
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { categoryId } = req.params;
    // TODO: forbidden check

    const result = await CategoryService.deleteCategory({ id: categoryId });

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
