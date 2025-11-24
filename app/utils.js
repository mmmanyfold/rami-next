export const processItemsByKey = (items, key) => {
  return items.reduce(
    (ret, item) => {
      const val = item[key];
      if (ret.itemsByKey[val]) {
        ret.itemsByKey[val] = [...ret.itemsByKey[val], item];
      } else {
        ret.itemsByKey[val] = [item];
        ret.keys = [...ret.keys, val];
      }
      return ret;
    },
    { itemsByKey: {}, keys: [] }
  );
};

export const processCvDataByYear = (rows) => {
  if (!rows) {
    return { itemsByKey: {}, years: [] };
  }
  const { itemsByKey, keys } = processItemsByKey(rows, "year");
  return { 
    itemsByKey, 
    years: keys.sort().reverse()
  }
};
