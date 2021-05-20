#! /usr/bin/env node

const {gitConfig} = require ('../config');
const {exec} = require ('../util');
const [, , ...argvs] = process.argv;

(async function () {
  if (argvs[0] == 'git') {
    if (argvs[1] == 'config') {
      if (argvs[2]) {
        await runGitConfig (argvs[2]);
      }
    }
  }
}) ();

async function runGitConfig (name) {
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
