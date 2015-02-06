var exec = require('child_process').exec;

const PRE_RELEASE_BRANCH = 'pre-release';
const MASTER_BRANCH      = 'master';


var mergePreReleaseToMaster = function mergePreReleaseToMaster() {

  var command = 'git checkout ' + MASTER_BRANCH + ' && '
              + 'git merge ' + PRE_RELEASE_BRANCH + ' && '
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

switch(process.env.TRAVIS_BRANCH) {

  case PRE_RELEASE_BRANCH:
    mergePreReleaseToMaster();
    break;

}
