import { isEmpty, isObject, properObject } from '../utils';

const deletedDiff = (lhs, rhs) => {
  if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {};

  const l = properObject(lhs);
  const r = properObject(rhs);

  return Object.keys(l).reduce((acc, key) => {
    if (r.hasOwnProperty(key)) {
      const difference = deletedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference)) return acc;

      return { ...acc, [key]: difference };
    }
    //Returning 'REMOVED' string instead of undefined so that Mongo registers the key-value.
    return { ...acc, [key]: 'REMOVED' };
  }, {});
};

export default deletedDiff;
