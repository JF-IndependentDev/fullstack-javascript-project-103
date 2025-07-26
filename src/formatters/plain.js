import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
};

const plain = (tree, parentPath = '') => {
  const lines = tree.flatMap((node) => {
    const propertyPath = parentPath ? `${parentPath}.${node.key}` : node.key;

    switch (node.type) {
      case 'nested':
        return plain(node.children, propertyPath);

      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;

      case 'removed':
        return `Property '${propertyPath}' was removed`;

      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default plain;
