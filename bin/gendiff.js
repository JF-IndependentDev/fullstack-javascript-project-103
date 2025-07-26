#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'first file path')
  .argument('<filepath2>', 'second file path')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
   const diff = genDiff(filepath1, filepath2, options.format);
   console.log(diff);
  });
program.parse();
