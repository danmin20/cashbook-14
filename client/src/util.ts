export const stateCmp = (
  prevState: {},
  nextState: {}
): 'Same' | 'Different' => {
  if (JSON.stringify(prevState) === JSON.stringify(nextState)) {
    return 'Same';
  }
  return 'Different';
};
