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
  if (typeof val === 'string') return val;
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  return String(val);
};

const formatValue = (data, depth, renderFunctions) => {
  if (!_.isPlainObject(data)) return formatPrimitive(data);

  const entries = Object.entries(data)
    .map(([key, value]) => renderFunctions[UNCHANGED_VALUE]({ key, value }, depth + 1));

  return `{\n${entries.join('\n')}\n${getIndentation(depth)}  }`;
};

const renderFunctions = {
  [ROOT_VALUE]: ({ children }, depth, iterate) => {
    const renderedChildren = children.map((child) => iterate(child, depth + 1));
    return `{\n${renderedChildren.join('\n')}\n}`;
  },

  [NESTED_VALUE]: ({ key, children }, depth, iterate) => {
    const nestedChildren = children.map((child) => iterate(child, depth + 1));
    return `${getIndentation(depth)}  ${key}: {\n${nestedChildren.join('\n')}\n${getIndentation(depth)}  }`;
  },

  [ADD_VALUE]: (node, depth) => `${getIndentation(depth)}+ ${node.key}: ${formatValue(node.value, depth, renderFunctions)}`,

  [DELETED_VALUE]: (node, depth) => `${getIndentation(depth)}- ${node.key}: ${formatValue(node.value, depth, renderFunctions)}`,

  [UNCHANGED_VALUE]: (node, depth) => `${getIndentation(depth)}  ${node.key}: ${formatValue(node.value, depth, renderFunctions)}`,

  [CHANGED_VALUE]: (node, depth) => {
    const { key, value1, value2 } = node;
    const formattedValue1 = `${getIndentation(depth)}- ${key}: ${formatValue(value1, depth, renderFunctions)}`;
    const formattedValue2 = `${getIndentation(depth)}+ ${key}: ${formatValue(value2, depth, renderFunctions)}`;
    return `${formattedValue1}\n${formattedValue2}`;
  },
};

const renderAST = (ast) => {
  const iterate = (node, depth) => renderFunctions[node.type](node, depth, iterate);
  return iterate(ast, 0);
};

export default renderAST;
