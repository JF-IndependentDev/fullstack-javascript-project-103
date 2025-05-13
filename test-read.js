import { readFile } from './src/parsers.js';

console.log('Leyendo archivos...');

try {
  const file1 = readFile('__fixtures__/file1.json');
  const file2 = readFile('__fixtures__/file2.json');

  console.log('Contenido de file1.json:', file1);
  console.log('Contenido de file2.json:', file2);
} catch (e) {
  console.error('Error leyendo archivos:', e.message);
}


