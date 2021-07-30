import axios from 'axios';

export const getMyMonthlyHistory = async ({ YYYYMM }: { YYYYMM: string }) => {
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

export const getMyIncomeCategories = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:3000/api/me/categories',
      {
        params: {
          type: 'income',
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getMyOutcomeCategories = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:3000/api/me/categories',
      {
        params: {
          type: 'outcome',
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getMyPayments = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/me/payments', {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error;
  }
};
