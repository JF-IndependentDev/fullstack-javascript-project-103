import stylish from './stylish.js';

const format = ({ data, formatType }) => {
  switch (formatType) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown format type: ${formatType}`);
  }
};

export default format;
