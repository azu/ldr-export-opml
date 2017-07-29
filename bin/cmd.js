#!/usr/bin/env node
'use strict';
const meow = require('meow');
const path = require('path');
const convertJsonToXML = require("../src/ldr-export-opml").convertJsonToXML;
const concat = require('concat-stream');
const fs = require('fs');
const cli = meow(`
    Usage
      $ ldr-export-opml ldr.json

    Options:
    
      --output path to output
      
    Examples
      $ ldr-export-opml path/to/ldr.json
      $ cat path/to/ldr.json | ldr-export-opml 
`);
if (cli.flags.help) {
    cli.showHelp();
}
const file = process.argv[2];
const input = file && file !== '-'
    ? fs.createReadStream(process.argv[2])
    : process.stdin;
input.pipe(concat(function(buf) {
    const opml = convertJsonToXML(JSON.parse(buf.toString('utf8')));
    if (cli.flags.output) {
        fs.writeFileSync(path.resolve(process.cwd(), cli.flags.output), opml, "utf-8");
    } else {
        console.log(opml);
    }
}));