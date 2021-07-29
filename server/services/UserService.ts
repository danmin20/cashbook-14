import { getRepository } from 'typeorm';
import { User } from '../models/user';

async function findUser({ githubId }: { githubId: string }) {
  const repo = getRepository(User);

  const result = await repo.findOne({
    where: { githubId },
  });
  return result;
}

async function findUsers({ githubId }: { githubId?: number }) {
  const repo = getRepository(User);

  const result = await repo.find({
    where: { ...(githubId && { githubId }) },
  });
  return result;
}

async function createUser({
  githubId,
  githubName,
}: {
  githubId: string;
  githubName: string;
}) {
  console.log(githubName);
  const repo = getRepository(User);

  const user = repo.create({ githubId, githubName });

  const result = await repo.insert(user);
  return result;
}

export const UserService = {
  findUser,
  findUsers,
  createUser,
};
