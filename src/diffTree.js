import _ from 'lodash';
import {
  UNCHANGED_VALUE,
  ADD_VALUE,
  CHANGED_VALUE,
  DELETED_VALUE,
  NESTED_VALUE,
  ROOT_VALUE,
} from './constants.js';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, type: ADD_VALUE, value: value2 };
    }

    if (!_.has(data2, key)) {
      return { key, type: DELETED_VALUE, value: value1 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: NESTED_VALUE,
        children: getDiff(value1, value2),
      };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: CHANGED_VALUE,
        value1,
        value2,
      };
    }

    return { key, type: UNCHANGED_VALUE, value: value1 };
  });
};

const buildDiffTree = (data1, data2) => ({
  type: ROOT_VALUE,
  children: getDiff(data1, data2),
});

export default buildDiffTree;
