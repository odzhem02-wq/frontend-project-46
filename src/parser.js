import fs from 'fs';
import path from 'path';
import parse from './parsers';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export default (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(absolutePath);

  return parse(data, format);
};
