import { getRepository } from 'typeorm';
import { User } from '../models/user';

async function findUser({ id }: { id: string }) {
  const repo = getRepository(User);

  const result = await repo.findOne({
    where: { id },
  });
  return result;
}

async function findUsers({ nickname }: { nickname?: string }) {
  const repo = getRepository(User);

  const result = await repo.find({
    where: { ...(nickname && { nickname }) },
  });
  return result;
}

async function createUser({
  token,
}: {
  token: string;
  // id: string;
  // nickname: string;
  // password: string;
}) {
  console.log(token);
  const repo = getRepository(User);

  // const user = repo.create({ id, nickname, password });

  // const result = await repo.insert(user);
  // return result;
}

export const UserService = {
  findUser,
  findUsers,
  createUser,
};
