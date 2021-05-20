const child_process = require ('child_process');

function exec (cmd) {
  return new Promise (function (resolve, reject) {
    child_process.exec (cmd, function (err, stdout, stderr) {
      if (err) {
        reject (err);
      } else {
        resolve ({
          stdout,
          stderr,
        });
      }
    });
  });
}
exports.exec = exec;
