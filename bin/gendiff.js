#!/usr/bin/env node

import { program } from "commander";
import  parse  from '../src/parsers.js';
import path from "node:path";
import getDiff from '../src/utils/diff.js';

import { readFile } from '../src/genDiff.js';


program
  .description("Compares two configuration files and shows a difference.")
  .version('0.0.1')
  .argument('<filepath1>', 'first file path')
  .argument('<filepath2>', 'second file path')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const content1 = readFile(filepath1);
    const content2 = readFile(filepath2);

    const extension1 = path.extname(filepath1);
    const extension2 = path.extname(filepath2);

    const data1 = parse(content1, extension1);
    const data2 = parse(content2, extension2);

    const diff = getDiff(data1, data2);
    console.log(diff);
  });

program.parse();
