import { getRepository } from 'typeorm';
import { History } from '../models/history';

// TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
// 타입이 카테고리의 것과 같은가?
// 본인의 카테고리인가?
// 본인의 결제수단인가?
// ...

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
  { id, userId }: { id: string; userId?: string },
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
    { id, ...(userId && { user: { id: userId } }) },
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

async function deleteHistory({ id, userId }: { id: string; userId?: string }) {
  const repo = getRepository(History);

  const result = await repo.delete({
    id,
    ...(userId && { user: { id: userId } }),
  });
  return result;
}

export const HistoryService = {
  findHistory,
  findHistories,
  createHistory,
  updateHistory,
  deleteHistory,
};
