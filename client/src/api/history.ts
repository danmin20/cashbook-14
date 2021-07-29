import axios from 'axios';

export const getMonthlyHistory = async ({ YYYYMM }: { YYYYMM: string }) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/me/histories', {
      params: {
        date: YYYYMM,
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error;
  }
};
