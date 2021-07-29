import { getRepository } from 'typeorm';
import { User } from '../models/user';

async function findUser({ email }: { email: string }) {
  const repo = getRepository(User);

  const result = await repo.findOne({
    where: { email },
  });
  return result;
}

async function findUsers({ email }: { email?: number }) {
  const repo = getRepository(User);

  const result = await repo.find({
    where: { ...(email && { email }) },
  });
  return result;
}

async function createUser({
  id,
  email,
  token,
}: {
  id: number;
  email: string;
  token: string;
}) {
  console.log(token);
  const repo = getRepository(User);

  const user = repo.create({ id, email, token });

  // const result = await repo.insert(user);
  // return result;
}

export const UserService = {
  findUser,
  findUsers,
  createUser,
};
