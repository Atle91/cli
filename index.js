#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */
const chalk = require('chalk');
const {
  newComponent,
  newPage,
  rename,
  toStateless
} = require('@creuna/react-scripts');

const printHelp = require('./print-help');
const [command, arg1, arg2] = process.argv.slice(2);

switch (command) {
  case 'new':
    console.log('Create new project');
    break;
  case 'component':
    newComponent(arg1, process.argv.indexOf('-s') !== -1 ? true : undefined);
    break;
  case 'page':
    newPage(arg1);
    break;
  case 'rename':
    rename(arg1, arg2);
    break;
  case 'stateful':
    console.log('To stateful');
    break;
  case 'stateless':
    toStateless(arg1);
    break;
  case undefined:
    printHelp();
    break;
  default:
    console.log(`Unrecognized command ${chalk.redBright(process.argv[2])}`);
    printHelp();
}
