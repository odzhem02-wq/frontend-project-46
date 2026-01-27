import parseFile from './parser';
import buildDiff from './buildDiff';
import getFormatter from './formatters';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diffTree = buildDiff(data1, data2);
  const formatter = getFormatter(formatName);

  return formatter(diffTree);
};
