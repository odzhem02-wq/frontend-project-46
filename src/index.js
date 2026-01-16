import _ from 'lodash';
import parseFile from './parser';

const stringify = (value) => {
  if (value === null) return 'null';
  return String(value);
};

const buildDiffLines = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.flatMap((key) => {
    const has1 = Object.hasOwn(data1, key);
    const has2 = Object.hasOwn(data2, key);

    if (has1 && !has2) {
      return `  - ${key}: ${stringify(data1[key])}`;
    }

    if (!has1 && has2) {
      return `  + ${key}: ${stringify(data2[key])}`;
    }

    if (data1[key] !== data2[key]) {
      return [
        `  - ${key}: ${stringify(data1[key])}`,
        `  + ${key}: ${stringify(data2[key])}`,
      ];
    }

    return `    ${key}: ${stringify(data1[key])}`;
  });
};

export default (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const lines = buildDiffLines(data1, data2);

  return ['{', ...lines, '}'].join('\n');
};
