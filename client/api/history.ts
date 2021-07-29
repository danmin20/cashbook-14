import axios from 'axios';

export const getMonthlyHistory = async ({ YYYYMM }: { YYYYMM: string }) => {
  try {
    const { data } = await axios.get('/api/me/histories', {
      params: {
        date: YYYYMM,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
