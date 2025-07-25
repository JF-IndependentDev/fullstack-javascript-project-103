import _ from 'lodash';

const indentSize = 4;
const makeIndent = (depth, marker = ' ') =>
  ' '.repeat(depth * indentSize - 2) + marker + ' ';
const makeBracketIndent = (depth) =>
  ' '.repeat((depth - 1) * indentSize);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (typeof value === 'string') {
      return value; // ← sin comillas
    }
    if (value === null) {
      return 'null';
    }
    return String(value);
  }

  const entries = Object.entries(value).map(
    ([key, val]) =>
      `${makeIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...entries, `${makeBracketIndent(depth + 1)}}`].join('\n');
};

const stylish = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'nested':
        return `${makeIndent(depth)}${key}: ${stylish(children, depth + 1)}`;
      case 'added':
        return `${makeIndent(depth, '+')}${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${makeIndent(depth, '-')}${key}: ${stringify(value, depth)}`;
      case 'unchanged':
        return `${makeIndent(depth)}${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          `${makeIndent(depth, '-')}${key}: ${stringify(oldValue, depth)}`,
          `${makeIndent(depth, '+')}${key}: ${stringify(newValue, depth)}`,
        ];
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
};

export default stylish;
