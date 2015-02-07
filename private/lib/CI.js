var exec = require('child_process').exec;

var CI = {};

CI.PRE_RELEASE_BRANCH = 'pre-release';
CI.MASTER_BRANCH      = 'master';

/**
 * Merge the pre-release branch into master, then push it
 */
CI.mergePreReleaseToMaster = function mergePreReleaseToMaster() {

  var sshAdd   = 'touch ../rsa && '
               + 'echo \'' + process.env.GITHUB_PRIVATE_KEY_BASE_64 + '\' | base64 --decode > ../rsa && '
               + 'chmod 600 ../rsa && '
               + 'eval `ssh-agent -s` && '
               + 'ssh-add ../rsa';
  var fetch    = 'git fetch origin ' + CI.MASTER_BRANCH + ':' + CI.MASTER_BRANCH;
  var checkout = 'git checkout ' + CI.MASTER_BRANCH;
  var pull     = 'git pull origin ' + CI.MASTER_BRANCH;
  var merge    = 'git merge ' + CI.PRE_RELEASE_BRANCH + ' --ff-only';
  var push     = 'git push origin ' + CI.MASTER_BRANCH;

  CI.runCommands([sshAdd, fetch, checkout, pull, merge, push]);

};

/**
 * Run commands
 *
 * @param {array} cmd Command to be executed
 */
CI.runCommands = function runCommand(cmds) {

  var cmd = cmds[0];
  var nextCommands = cmds.slice(1, cmds.length);

  exec(cmd, { cwd: '.' }, function execCallback(error, stdout, stderr) {

    if(!!error) {

      console.log(stdout);
      console.error(error);

      process.exit(1);

    } else {

      console.log(stdout);

      if(nextCommands.length > 0) {
        CI.runCommands(nextCommands);
      } else {
        process.exit(0);
      }

    }

  });

};

/**
 * Check if the current run is being triggered by a pull request
 *
 * @return {boolean}
 */
CI.isPullRequest = function isPullRequest() {
  return process.env.TRAVIS_PULL_REQUEST !== 'false';
};

/**
 * Check if the current affected branch is pre-release
 *
 * @return {boolean}
 */
CI.isPreReleaseBranch = function isPreReleaseBranch() {
  return process.env.TRAVIS_BRANCH === CI.PRE_RELEASE_BRANCH;
};

/**
 * Check if the current environment is valid to merge and push to master
 *
 * @return {boolean}
 */
CI.isReadyForPublication = function isReadyForPublication() {
  return !CI.isPullRequest() && CI.isPreReleaseBranch();
};

module.exports = CI;
