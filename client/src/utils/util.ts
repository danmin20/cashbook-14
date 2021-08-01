import axios from 'axios';

export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;

export const returnPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const checkLogin = (data: { message: string }) => {
  if (data.message === 'forbidden') location.href = '/#/login';
};

export const fetchWrap = async (method: string, url: string, params?: {}) => {
  try {
    const option = {
      baseURL: 'http://localhost:3000/api',
      withCredentials: true,
      params,
    };
    const { data } =
      (method === 'get' && (await axios.get(url, option))) ||
      (method === 'post' && (await axios.get(url, option))) ||
      {};
    checkLogin(data);
    return data;
  } catch (error) {
    return error;
  }
};
