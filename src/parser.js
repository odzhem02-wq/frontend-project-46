import fs from 'fs';
import path from 'path';

const getAbsolutePath = (filepath) =>
  path.resolve(process.cwd(), filepath);

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  throw new Error(`Unknown format: ${format}`);
};

export default (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(absolutePath);

  return parse(data, format);
};
