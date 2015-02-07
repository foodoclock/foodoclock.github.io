var exec = require('child_process').exec;

var CI = {};

CI.PRE_RELEASE_BRANCH = 'pre-release';
CI.MASTER_BRANCH      = 'master';

/**
 * Merge the pre-release branch into master, then push it
 */
CI.mergePreReleaseToMaster = function mergePreReleaseToMaster() {

  var command = 'git checkout ' + CI.MASTER_BRANCH + ' && '
              + 'git merge ' + CI.PRE_RELEASE_BRANCH + ' && '
              + 'git push origin ' + CI.MASTER_BRANCH;

  exec(command, { cwd: '.' }, function execCallback(error, stdout, stderr) {

    if(!!error) {

      console.error(error);
      process.exit(1);

    } else {

      console.log(stdout);
      process.exit(0);

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
