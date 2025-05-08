#!/usr/bin/env node


import { program } from "commander";

program
    .description("Compares two configuration files and shows a difference.")
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'first file path')
    .argument('<filepath2>', 'second file path')
    .action((filepath1, filepath2) => {
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
    })
    .parse();

