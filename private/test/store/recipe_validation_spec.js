var fs        = require('fs');
var expect    = require('chai').expect;
var validator = require('recipe-schema');
var Analyser  = require('../../lib/analyser');

describe('Recipes Schema', function() {

  function isRecipe (e) {
    return ignored.indexOf(e) === -1 ? true : false;
  }

  var ignored   = [
    Analyser.recipesIndexing.INDEX_FILE_NAME,
  ];
  var storePath = Analyser.recipesIndexing.STORE;
  var recipes   = fs.readdirSync(storePath).filter(isRecipe)

  recipes.forEach(function (e) {

    describe(e, function () {
      it('has a valid schema', function(done) {
        var recipePath = storePath + e
        var recipe     = JSON.parse(fs.readFileSync(recipePath));

        validator.validate(recipe, function (err, data) {
          if (err) {
            console.error(err);
          }
          expect(err).to.be.empty;
          done();
        });
      });
    });
  });

});

