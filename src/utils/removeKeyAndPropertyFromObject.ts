const removeKeyAndPropertyFromObject = (object: any, keys: string[]) => {
  const newObject = { ...object };
  keys.forEach((key) => {
    delete newObject[key];
  });
  return newObject;
};
