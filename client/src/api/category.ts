import { fetchWrap } from '@/utils/util';

export const createCategory = ({
  name,
  type,
  color,
}: {
  name: string;
  type: 'income' | 'outcome';
  color: string;
}) =>
  fetchWrap({
    method: 'post',
    url: '/categories',
    body: { name, type, color },
  });
