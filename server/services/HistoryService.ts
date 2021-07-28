import { getRepository } from 'typeorm';
import { History } from '../models/history';

async function findHistory({ id }: { id: string }) {
  const repo = getRepository(History);

  const result = await repo.findOne({
    where: { id },
    relations: ['category', 'payment', 'user'],
  });
  return result;
}

// TODO: 날짜 관련 필터링 추가
async function findHistories({
  userId,
  categoryId,
}: {
  userId?: string;
  categoryId?: string;
}) {
  const repo = getRepository(History);

  const result = await repo.find({
    where: {
      ...(userId && { user: { id: userId } }),
      ...(categoryId && { category: { id: categoryId } }),
    },
    relations: ['category', 'payment', 'user'],
  });
  return result;
}

async function createHistory({
  userId,
  paymentId,
  categoryId,
  date,
  content,
  amount,
}: {
  userId: string;
  paymentId?: string | null;
  categoryId?: string | null;
  date: Date;
  content: string;
  amount: string;
}) {
  const repo = getRepository(History);

  const history = repo.create({
    date,
    content,
    amount,
    user: { id: userId },
    ...(paymentId && { payment: { id: paymentId } }),
    ...(categoryId && { category: { id: categoryId } }),
  });

  const result = await repo.insert(history);
  return result;
}

async function updateHistory(
  { id }: { id: string },
  {
    paymentId,
    categoryId,
    date,
    content,
    amount,
  }: {
    paymentId?: string | null;
    categoryId?: string | null;
    date?: Date;
    content?: string;
    amount?: string;
  }
) {
  const repo = getRepository(History);

  const result = await repo.update(
    { id },
    {
      ...(paymentId && { payment: { id: paymentId } }),
      ...(categoryId && { category: { id: categoryId } }),
      ...(date && { date }),
      ...(content && { content }),
      ...(amount && { amount }),
    }
  );
  return result;
}

async function deleteHistory({ id }: { id: string }) {
  const repo = getRepository(History);

  const result = await repo.delete({ id });
  return result;
}

export const HistoryService = {
  findHistory,
  findHistories,
  createHistory,
  updateHistory,
  deleteHistory,
};
