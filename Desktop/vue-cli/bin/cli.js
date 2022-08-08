#!/usr/bin/env node

const { Command } = require('commander');
const { name, version } = require('../package.json');
const program = new Command();
const commands = require('../command/index.js');
program.name(name).version(version);


Object.entries(commands).map(([commandName,commandItem]) => {
    program
    .command(`${commandName} ${commandItem.params}`)
    .description(commandItem.description)
    .action(commandItem.action)
})
program.parse();