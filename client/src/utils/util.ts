export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;
