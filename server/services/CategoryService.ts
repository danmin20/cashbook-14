import { getRepository } from 'typeorm';
import { Category } from '../models/category';

// TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
// 이름 중복 확인(수입/지출 따로)
// ...

async function findCategory({ id }: { id: string }) {
  const repo = getRepository(Category);

  const result = await repo.findOne({
    where: { id },
    relations: ['user'],
  });
  return result;
}

async function findCategories({
  userId,
  type,
}: {
  userId?: string;
  type?: string;
}) {
  const repo = getRepository(Category);

  const result = await repo.find({
    where: { ...(userId && { user: { id: userId } }), ...(type && { type }) },
    relations: ['user'],
  });

  return result;
}

async function createCategory({
  userId,
  name,
  type,
  color,
}: {
  userId: string;
  name: string;
  type: string;
  color: string;
}) {
  const repo = getRepository(Category);

  const category = repo.create({ name, type, color, user: { id: userId } });

  const result = await repo.insert(category);
  return result;
}

async function updateCategory(
  { id, userId }: { id: string; userId?: string },
  {
    name,
    type,
    color,
  }: {
    name?: string;
    type?: string;
    color?: string;
  }
) {
  const repo = getRepository(Category);

  const result = await repo.update(
    { id, ...(userId && { user: { id: userId } }) },
    {
      ...(name && { name }),
      ...(type && { type }),
      ...(color && { color }),
    }
  );
  return result;
}

async function deleteCategory({ id, userId }: { id: string; userId?: string }) {
  const repo = getRepository(Category);

  const result = await repo.delete({
    id,
    ...(userId && { user: { id: userId } }),
  });
  return result;
}

export const CategoryService = {
  findCategory,
  findCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
