import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getDiff from './compare.js'; 


const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (fullFilePath) => {
  try {
    const extension = path.extname(fullFilePath).slice(1);
    const rawContent = fs.readFileSync(fullFilePath, 'utf-8');
    return parse(rawContent, extension);
  } catch (err) {
    console.error(`Error leyendo archivo "${fullFilePath}":`, err.message);
    return null;
  }
};

export default function genDiff(path1, path2, formatType = 'stylish') {
  const fullPath1 = getFullPath(path1);
  const fullPath2 = getFullPath(path2);

  const data1 = readFile(fullPath1);
  const data2 = readFile(fullPath2);

  if (!data1 || !data2) {
    return 'Error leyendo uno de los archivos.';
  }

  const diff = getDiff(data1, data2);


  return JSON.stringify(diff, null, 2);
}
