const stylish = (diff) => {
  const formatValue = (value) => {
    return typeof value === 'object' && value !== null
      ? JSON.stringify(value)
      : JSON.stringify(value);
  };

  const lines = diff.flatMap(({ key, type, value, oldValue, newValue }) => {
    switch (type) {
      case 'added':
        return `  + ${key}: ${formatValue(value)}`;
      case 'removed':
        return `  - ${key}: ${formatValue(value)}`;
      case 'changed':
        return [
          `  - ${key}: ${formatValue(oldValue)}`,
          `  + ${key}: ${formatValue(newValue)}`,
        ];
      case 'unchanged':
        return `    ${key}: ${formatValue(value)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default stylish;
