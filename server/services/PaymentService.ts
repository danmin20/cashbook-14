import { getRepository } from 'typeorm';
import { Payment } from '../models/payment';

async function findPayment({ id }: { id: string }) {
  const repo = getRepository(Payment);

  const result = await repo.findOne({
    where: { id },
  });
  return result;
}

async function findPayments({ userId }: { userId?: string }) {
  const repo = getRepository(Payment);

  const result = await repo.find({
    where: { ...(userId && { user: { id: userId } }) },
  });

  return result;
}

async function createPayment({
  userId,
  name,
}: {
  userId: string;
  name: string;
  type: string;
  color: string;
}) {
  const repo = getRepository(Payment);

  const payment = repo.create({ name, user: { id: userId } });

  const result = await repo.insert(payment);
  return result;
}

async function updatePayment(
  { id }: { id: string },
  {
    name,
  }: {
    name?: string;
  }
) {
  const repo = getRepository(Payment);

  const result = await repo.update(
    { id },
    {
      ...(name && { name }),
    }
  );
  return result;
}

async function deletePayment({ id }: { id: string }) {
  const repo = getRepository(Payment);

  const result = await repo.delete({ id });
  return result;
}

export const PaymentService = {
  findPayment,
  findPayments,
  createPayment,
  updatePayment,
  deletePayment,
};
