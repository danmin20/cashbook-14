import { fetchWrap } from '@/utils/util';

export const createPayment = ({ name }: { name: string }) =>
  fetchWrap({
    method: 'post',
    url: '/payments',
    body: { name },
  });

export const deletePayment = ({ paymentId }: { paymentId: number }) =>
  fetchWrap({ method: 'delete', url: `/payments/${paymentId}` });
