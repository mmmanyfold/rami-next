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
