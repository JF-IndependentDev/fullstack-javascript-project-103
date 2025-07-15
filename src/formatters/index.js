import stylish from './stylish.js';
import plain from './plain.js';

export default (diffTree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    default:
      throw new Error(`Unknown format type: ${formatType}`);
  }
};