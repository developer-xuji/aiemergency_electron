const formatString = (original: string, removed: string) => {
  if (original === undefined || original === null) return '';

  const reg = new RegExp(removed, 'g');
  const formated: string = original.replace(reg, '');

  return formated;
};

export default formatString;
