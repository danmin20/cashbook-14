import { getRepository } from 'typeorm';
import { Payment } from '../models/payment';

// TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
// 이름 중복 확인
// ...

async function findPayment({
  id,
  name,
  userId,
}: {
  id?: string;
  name?: string;
  userId?: string;
}) {
  const repo = getRepository(Payment);

  const result = await repo.findOne({
    where: {
      ...(id && { id }),
      ...(name && { name }),
      ...(userId && { user: { id: userId } }),
    },
    relations: ['user'],
  });
  return result;
}

async function findPayments({ userId }: { userId?: string }) {
  const repo = getRepository(Payment);

  const result = await repo.find({
    where: { ...(userId && { user: { id: userId } }) },
    relations: ['user'],
  });

  return result;
}

async function createPayment({
  userId,
  name,
}: {
  userId: string;
  name: string;
}) {
  const repo = getRepository(Payment);

  const payment = repo.create({ name: name, user: { id: userId } });

  const result = await repo.insert(payment);
  return result;
}

async function updatePayment(
  { id, userId }: { id: string; userId?: string },
  {
    name,
  }: {
    name?: string;
  }
) {
  const repo = getRepository(Payment);

  const result = await repo.update(
    { id, ...(userId && { user: { id: userId } }) },
    {
      ...(name && { name }),
    }
  );
  return result;
}

async function deletePayment({ id, userId }: { id: string; userId?: string }) {
  const repo = getRepository(Payment);

  const result = await repo.delete({
    id,
    ...(userId && { user: { id: userId } }),
  });
  return result;
}

export const PaymentService = {
  findPayment,
  findPayments,
  createPayment,
  updatePayment,
  deletePayment,
};
