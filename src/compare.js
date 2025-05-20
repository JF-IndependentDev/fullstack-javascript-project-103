import { readFile, parse } from './parsers.js';
import { differenceWith, isEqual } from 'lodash-es';



export const compareFiles = (filepath1, filepath2) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const obj1 = parse(content1, '.json');
  const obj2 = parse(content2, '.json');

  const diferencias1 = differenceWith([obj1], [obj2], isEqual);
  const diferencias2 = differenceWith([obj2], [obj1], isEqual);

  return { diferencias1, diferencias2 };
};
