import { isDate, isEmpty, isObject, properObject } from '../utils';

const diff = (lhs, rhs) => {
  if (lhs === rhs) return {}; // equal return no diff

  if (!isObject(lhs) || !isObject(rhs)) return rhs; // return updated rhs

  const l = properObject(lhs);
  const r = properObject(rhs);

  const deletedValues = Object.keys(l).reduce((acc, key) => {
    //Returning 'REMOVED' string instead of undefined so that Mongo registers the key-value.
    return r.hasOwnProperty(key) ? acc : { ...acc, [key]: 'REMOVED' };
  }, {});

  if (isDate(l) || isDate(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return r;
  }

  if (Array.isArray(r) && Array.isArray(l)) {
    const deletedValues = l.reduce((acc, item, index) => {
      //Returning 'REMOVED' string instead of undefined so that Mongo registers the key-value.
      return r.hasOwnProperty(index) ? acc.concat(item) : acc.concat('REMOVED');
    }, []);

    return r.reduce((acc, rightItem, index) => {
      if (!deletedValues.hasOwnProperty(index)) {
        return acc.concat(rightItem);
      }

      const leftItem = l[index];
      const difference = diff(rightItem, leftItem);

      if (isObject(difference) && isEmpty(difference) && !isDate(difference)) {
        delete acc[index];
        return acc; // return no diff
      }

      return acc.slice(0, index).concat(rightItem).concat(acc.slice(index + 1)); // return updated key
    }, deletedValues);
  }

  return Object.keys(r).reduce((acc, key) => {
    if (!l.hasOwnProperty(key)) return { ...acc, [key]: r[key] }; // return added r key

    const difference = diff(l[key], r[key]);

    if (isObject(difference) && isEmpty(difference) && !isDate(difference)) return acc; // return no diff

    return { ...acc, [key]: difference }; // return updated key
  }, deletedValues);
};

export default diff;
