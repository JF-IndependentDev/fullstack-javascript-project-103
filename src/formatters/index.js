import stylish from './stylish.js';

export default (diffTree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Unknown format type: ${formatType}`);
  }
};