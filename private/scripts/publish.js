var CI = require('../lib/CI');

console.log('Checking if this change need to be publish');

// Only pulish is CI has the right environment to do so
if(CI.isReadyForPublication()) {
  console.log('Ready for publication');
  CI.mergePreReleaseToMaster();
} else {
  console.log('These changes don\'t need to be published');
}

console.log('End of the publish script');
