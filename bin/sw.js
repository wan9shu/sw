#! /usr/bin/env node

const {gitConfig} = require ('../config');
const {exec} = require ('../util');
const [, , ...argvs] = process.argv;

(async function () {
  if (argvs[0] == 'git') {
    if (argvs[1] == 'config') {
      if (argvs[2] == 'log') {
        await log ();
      } else if (argvs[2]) {
        await config (argvs[2]);
      }
    }
  }
}) ();
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
