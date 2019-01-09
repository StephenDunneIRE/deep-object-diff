import { isDate, isEmpty, isObject, properObject } from '../utils';

const diff = (lhs, rhs) => {
  if (lhs === rhs) return {}; // equal return no diff
  if (lhs.constructor.name == 'ObjectID' && !lhs.equals(rhs)) return rhs; // support for Mongoose ObjectID's
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

  return Object.keys(r).reduce((acc, key) => {
    if (!l.hasOwnProperty(key)) return { ...acc, [key]: r[key] }; // return added r key

    const difference = diff(l[key], r[key]);

    if (isObject(difference) && isEmpty(difference) && !isDate(difference)) return acc; // return no diff

    return { ...acc, [key]: difference }; // return updated key
  }, deletedValues);
};

export default diff;
