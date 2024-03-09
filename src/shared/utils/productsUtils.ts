export const removeDuplicates = (values: Array<string | number |null>): Array<string | number> => {
  const valuesMap = new Map();

  return values.reduce((acc: Array<string | number>, value) => {
    if (value && !valuesMap.get(value)) {
      valuesMap.set(value, value);
      acc.push(value)
    }

    return acc;
  }, [])
}

export const sortCompare = (a: string | number, b: string | number) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}