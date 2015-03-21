var CI = require('../lib/CI');
var Analyser = require('../lib/analyser');

// Only analyse when ready for publication
if(CI.isReadyForPublication()) {
  console.log('Running analysis');
  Analyser.indexing();
} else {
  console.log('Skipping analysis');
}
