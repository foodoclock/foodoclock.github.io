var exec = require('child_process').exec;

const PRE_RELEASE_BRANCH = 'pre-release';
const MASTER_BRANCH      = 'master';

/**
 * Merge the pre-release branch into master, then push it
 */
var mergePreReleaseToMaster = function mergePreReleaseToMaster() {

  var command = 'git fetch origin ' + MASTER_BRANCH + ':' + MASTER_BRANCH + ' && '
              + 'git checkout ' + MASTER_BRANCH + ' && '
              + 'git pull origin ' + MASTER_BRANCH + ' && '
              + 'git merge ' + PRE_RELEASE_BRANCH + ' --ff-only && '
              + 'git push origin ' + MASTER_BRANCH;

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
var isPullRequest = function isPullRequest() {
  return !!JSON.parse(process.env.TRAVIS_PULL_REQUEST);
};

/**
 * Check if the current affected branch is pre-release
 *
 * @return {boolean}
 */
var isPreReleaseBranch = function isPreReleaseBranch() {
  return process.env.TRAVIS_BRANCH === PRE_RELEASE_BRANCH;
};

// Only try to merge to master if the current task was not triggered by a pull request
// and the current branch is pre-release
if(!isPullRequest() && isPreReleaseBranch()) {
  mergePreReleaseToMaster();
}
