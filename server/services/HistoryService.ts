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

async function findHistories({
  userId,
  categoryId,
  type,
  start,
  last,
}: {
  userId?: string;
  categoryId?: string;
  type?: string;
  start?: { year: number; month: number };
  last?: { year: number; month: number };
}) {
  const repo = getRepository(History);

  let result = await repo.find({
    where: {
      ...(userId && { user: { id: userId } }),
      ...(categoryId && { category: { id: categoryId } }),
    },
    relations: ['category', 'payment', 'user'],
  });

  // TODO: 필터링 개선(DB 수준에서의 필터링을 구현하기) 근데 쿼리 작성하기 귀찮다... ㅎㅎ
  if (type === '지출') {
    result = result.filter((history) => +history.amount < 0);
  }
  if (type === '수입') {
    result = result.filter((history) => +history.amount > 0);
  }

  if (start) {
    result = result.filter((history) => {
      const cmpFullYear = history.date.getFullYear() - start.year;
      const cmpMonth = history.date.getMonth() - start.month;
      return cmpFullYear > 0 || (cmpFullYear === 0 && cmpMonth >= 0);
    });
  }
  if (last) {
    result = result.filter((history) => {
      const cmpFullYear = history.date.getFullYear() - last.year;
      const cmpMonth = history.date.getMonth() - last.month;
      return cmpFullYear < 0 || (cmpFullYear === 0 && cmpMonth <= 0);
    });
  }

  return result;
}

async function getSumOfAmountsGroupByMonth({
  userId,
  categoryId,
  type,
  start,
  last,
}: {
  userId?: string;
  categoryId?: string;
  type?: string;
  start: { year: number; month: number };
  last: { year: number; month: number };
}) {
  let histories = await findHistories({
    ...(userId && { userId }),
    ...(categoryId && { categoryId }),
    ...(type && { type }),
    start,
    last,
  });

  // 그룹화
  const startValue = start.year * 12 + start.month;
  const lastValue = last.year * 12 + last.month;
  const result: number[] = Array.from(
    { length: lastValue - startValue + 1 },
    () => 0
  );
  histories.forEach((history) => {
    const group = history.date.getFullYear() * 12 + history.date.getMonth();
    result[group - startValue] += +history.amount;
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
  getSumOfAmountsGroupByMonth,
};
