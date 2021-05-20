#! /usr/bin/env node

const {gitConfig} = require ('../config');
const {exec} = require ('../util');

const {program} = require ('commander');
program.version ('0.0.1');

program
  .command ('gc [name]')
  .option ('-l,--log')
  .action (async function (name) {
    if (this.opts ().log) {
      if (name) {
        await config (name);
      }
      await log ();
    } else if (name) {
      await config (name);
    }
  });

program.parse (process.argv);

async function log () {
  try {
    const {stdout} = await exec (
      [
        `git config user.name`,
        `git config user.email`,
        `git config --global user.name`,
        `git config --global user.email`,
      ].join ('&')
    );
    console.log (stdout);
  } catch (e) {
    console.log (e);
  }
}
async function config (name) {
  const email = gitConfig[name];
  try {
    await exec (
      [
        `git config user.name ${name}`,
        `git config user.email ${email}`,
        `git config --global user.name ${name}`,
        `git config --global user.email ${email}`,
      ].join ('&')
    );
  } catch (e) {
    console.log (e);
  }
}
