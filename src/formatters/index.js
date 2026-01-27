import stylish from './stylish';
import plain from './plain';
import json from './json';

export default (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};
