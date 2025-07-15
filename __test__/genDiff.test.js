import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/genDiff.js';
import { readFileSync } from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff with JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const expected = `{
  - follow: false
    host: "codica.io"
  - proxy: "123.234.53.22"
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});

test('genDiff with YAML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  const expected = `{
  - follow: false
    host: "codica.io"
  - proxy: "123.234.53.22"
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});

test('genDiff with nested JSON files (stylish)', () => {
  const file1 = getFixturePath('nestFile1.json');
  const file2 = getFixturePath('nestFile2.json');
  const expected = readFixture('expectedStylish.txt');

  expect(genDiff(file1, file2, 'stylish')).toBe(expected.trim());
});

test('genDiff with nested JSON files (plain)', () => {
  const file1 = getFixturePath('nestFile1.json');
  const file2 = getFixturePath('nestFile2.json');
  const expected = readFixture('expectedPlain.txt');

  expect(genDiff(file1, file2, 'plain')).toBe(expected.trim());
});
