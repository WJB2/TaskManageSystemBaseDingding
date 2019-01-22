function find(treeList, childrenProp, filterFunc) {
  if (!treeList || treeList.length === 0) {
    return null;
  }

  const filteredArray = [];

  for (let i = 0; i < treeList.length; i += 1) {
    const result = filterFunc(treeList[i]);

    if (result) {
      filteredArray.push(treeList[i]);
    }

    if (treeList[i][childrenProp] && treeList[i][childrenProp].length > 0) {
      const filteredChildren = find(treeList, childrenProp, filterFunc);

      filteredArray.push(filteredChildren);
    }
  }

  return filteredArray;
}

function findFirst(treeList, childrenProp, filterFunc) {
  if (!treeList || treeList.length === 0) {
    return null;
  }

  for (let i = 0; i < treeList.length; i += 1) {
    const result = filterFunc(treeList[i]);

    if (result) {
      return treeList[i];
    }
  }

  for (let i = 0; i < treeList.length; i += 1) {
    if (treeList[i][childrenProp] && treeList[i][childrenProp].length > 0) {
      const filterItem = findFirst(treeList[i][childrenProp], childrenProp, filterFunc);

      if (filterItem) {
        return filterItem;
      }
    }
  }

  return null;
}

function forEach(treeList, childrenProp, mapFunc) {
  if (!treeList || treeList.length === 0) {
    return treeList;
  }

  for (let i = 0; i < treeList.length; i += 1) {
    mapFunc(treeList[i]);
  }

  for (let i = 0; i < treeList.length; i += 1) {
    if (treeList[i][childrenProp] && treeList[i][childrenProp].length > 0) {
      forEach(treeList[i][childrenProp], childrenProp, mapFunc);
    }
  }
}

export default {
  find,
  findFirst,
  forEach,
};
