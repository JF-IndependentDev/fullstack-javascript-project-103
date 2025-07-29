import {
  ADD_VALUE,
  CHANGED_VALUE,
  DELETED_VALUE,
  NESTED_VALUE,
  UNCHANGED_VALUE,
  ROOT,
} from '../constants.js';

const makeIndent = (depth, symbol = ' ') => {
  const baseIndent = '    '.repeat(depth);
  return `${baseIndent.slice(0, -2)}${symbol} `;
};

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => {
    return `${makeIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${makeIndent(depth)}}`;
};

const stylish = (node, depth = 1) => {
  if (node.type === ROOT) {
    return stylish({ children: node.children }, depth); 
  }

  const lines = node.children.map((child) => {
    const {
      key, type, value, value1, value2, children,
    } = child;

    switch (type) {
      case NESTED_VALUE:
        return `${makeIndent(depth)}${key}: ${stylish({ children }, depth + 1)}`;

      case ADD_VALUE:
        return `${makeIndent(depth, '+')}${key}: ${stringify(value, depth)}`;

      case DELETED_VALUE:
        return `${makeIndent(depth, '-')}${key}: ${stringify(value, depth)}`;

      case UNCHANGED_VALUE:
        return `${makeIndent(depth)}${key}: ${stringify(value, depth)}`;

      case CHANGED_VALUE:
        return [
          `${makeIndent(depth, '-')}${key}: ${stringify(value1, depth)}`,
          `${makeIndent(depth, '+')}${key}: ${stringify(value2, depth)}`,
        ];

      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }).flat();

  return `{\n${lines.join('\n')}\n${makeIndent(depth - 1)}}`;
};

export default stylish;
