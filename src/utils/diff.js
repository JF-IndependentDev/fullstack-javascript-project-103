import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
  const sortedKeys = _.sortBy(keys, (a) => a);

  return sortedKeys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

export default getDiff;