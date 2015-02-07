var CI = require('../lib/CI');

// Only pulish is CI has the right environment to do so
if(CI.isReadyForPublication()) {
  CI.mergePreReleaseToMaster();
}
