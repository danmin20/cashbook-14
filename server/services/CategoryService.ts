import { getRepository } from 'typeorm';
import { Category } from '../models/category';

async function findCategory({ id }: { id: string }) {
  const repo = getRepository(Category);

  const result = await repo.findOne({
    where: { id },
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
  { id }: { id: string },
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
    { id },
    {
      ...(name && { name }),
      ...(type && { type }),
      ...(color && { color }),
    }
  );
  return result;
}

async function deleteCategory({ id }: { id: string }) {
  const repo = getRepository(Category);

  const result = await repo.delete({ id });
  return result;
}

export const CategoryService = {
  findCategory,
  findCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
