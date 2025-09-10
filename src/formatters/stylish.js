import _ from 'lodash';
import {
  ADD_VALUE,
  CHANGED_VALUE,
  DELETED_VALUE,
  NESTED_VALUE,
  ROOT_VALUE,
  UNCHANGED_VALUE,
} from '../constants.js';


const getIndentation = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);


const formatPrimitive = (val) => {
  if (val === null) return 'null';
  if (typeof val === 'string') return val === '' ? '""' : val;
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  return String(val);
};


const formatObject = (obj, depth) => {
  const entries = Object.entries(obj).map(([key, value]) => {
    const formattedValue = _.isPlainObject(value)
      ? formatObject(value, depth + 1)
      : formatPrimitive(value);
    return `${getIndentation(depth + 1)}  ${key}: ${formattedValue}`;
  });
  return `{\n${entries.join('\n')}\n${getIndentation(depth)}}`;
};


const formatValue = (data, depth) => {
  if (!_.isPlainObject(data)) return formatPrimitive(data);
  return formatObject(data, depth);
};


const renderFunctions = {
  [ROOT_VALUE]: ({ children }, depth, iterate) => {
    const renderedChildren = children.map((child) => iterate(child, depth + 1));
    return `{\n${renderedChildren.join('\n')}\n}`;
  },

  [NESTED_VALUE]: ({ key, children }, depth, iterate) => {
    const nestedChildren = children.map((child) => iterate(child, depth + 1));
    return `${getIndentation(depth)}  ${key}: {\n${nestedChildren.join('\n')}\n${getIndentation(depth)}}`;
  },

  [ADD_VALUE]: (node, depth) =>
    `${getIndentation(depth)}+ ${node.key}: ${formatValue(node.value, depth)}`,

  [DELETED_VALUE]: (node, depth) =>
    `${getIndentation(depth)}- ${node.key}: ${formatValue(node.value, depth)}`,

  [UNCHANGED_VALUE]: (node, depth) =>
    `${getIndentation(depth)}  ${node.key}: ${formatValue(node.value, depth)}`,

  [CHANGED_VALUE]: (node, depth) => {
    const { key, value1, value2 } = node;
    const formattedValue1 = `${getIndentation(depth)}- ${key}: ${formatValue(value1, depth)}`;
    const formattedValue2 = `${getIndentation(depth)}+ ${key}: ${formatValue(value2, depth)}`;
    return [formattedValue1, formattedValue2].join('\n');
  },
};


const renderAST = (ast) => {
  const iterate = (node, depth) => renderFunctions[node.type](node, depth, iterate);
  return iterate(ast, 1); 
};

export default renderAST;
