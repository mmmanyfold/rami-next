export const processItemsByKey = (items, key) => {
  return items.reduce(
    (ret, item) => {
      const v = item[key];
      if (ret.itemsByKey[v]) {
        ret.itemsByKey[v] = [...ret.itemsByKey[v], item];
      } else {
        ret.itemsByKey[v] = [item];
        ret.values = [...ret.values, v];
      }
      return ret;
    },
    { itemsByKey: {}, values: [] }
  );
};
