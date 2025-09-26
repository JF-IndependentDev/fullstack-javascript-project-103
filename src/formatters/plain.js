import {
  ADD_VALUE,
  CHANGED_VALUE,
  DELETED_VALUE,
  NESTED_VALUE,
} from '../constants.js';

const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const plain = (node, parentPath = '') => {
  const lines = node.children.map((child) => {
    const propertyPath = parentPath ? `${parentPath}.${child.key}` : child.key;

    switch (child.type) {
      case NESTED_VALUE:
        return plain(child, propertyPath);

      case ADD_VALUE:
        return `Property '${propertyPath}' was added with value: ${formatValue(child.value)}`;

      case DELETED_VALUE:
        return `Property '${propertyPath}' was removed`;

      case CHANGED_VALUE:
        return `Property '${propertyPath}' was updated. From ${formatValue(child.value1)} to ${formatValue(child.value2)}`;

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown node type: ${child.type}`);
    }
  }).flat();

  return lines.join('\n');
};

export default plain;
