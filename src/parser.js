import fs from 'fs';
import path from 'path';
import parse from './parsers/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export default (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const extname = path.extname(absolutePath);

  return parse(data, extname);
};
