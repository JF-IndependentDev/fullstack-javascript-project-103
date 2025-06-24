import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getDiff from './utils/diff.js';
import format from './formatters/index.js';

export const readFile = (filepath) => {



  try {

    return fs.readFileSync(filepath, 'utf-8');
  } catch (err) {
    console.error(`Error leyendo archivo: ${filepath}`, err.message);
    return null;
  }
};

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export default function genDiff(path1, path2, formatType = 'stylish') {
  const fullPath1 = getFullPath(path1);
  const fullPath2 = getFullPath(path2);

  const extension1 = path.extname(fullPath1).slice(1).toLowerCase().trim();
  const extension2 = path.extname(fullPath2).slice(1).toLowerCase().trim();


  const raw1 = readFile(fullPath1);
  const raw2 = readFile(fullPath2);



  if (!raw1 || !raw2) {
    return 'Error leyendo uno de los archivos.';
  }

  const data1 = parse(raw1, extension1);
  const data2 = parse(raw2, extension2);

  const diff = getDiff(data1, data2);

  const formattedDiff = format({ data: diff, formatType });

  return formattedDiff;
}
