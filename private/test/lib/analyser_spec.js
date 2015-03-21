var fs = require('fs');
var exec = require('child_process').execSync;
var expect = require('chai').expect;
var Analyser = require('../../lib/analyser.js');

describe('Analyser', function () {

  var DUMMY_RECIPES = ['recipe_1', 'recipe_2', 'recipe_3'];

  describe('Analyser.recipesIndexing', function () {

    beforeEach(function () {
      Analyser.recipesIndexing.STORE = './private/test/dummyStore/recipes/';
      Analyser.recipesIndexing.INDEX = Analyser.recipesIndexing.STORE + '_index.json';
    });

    describe('Analyser.recipesIndexing.exec', function () {
      beforeEach(function () {
        Analyser.recipesIndexing.exec();
      });
      afterEach(function () {
        try {
          exec('rm ' + Analyser.recipesIndexing.INDEX);
        } catch(e) {}
      });

      it('creates an index file', function (done) {
        expect(fs.existsSync(Analyser.recipesIndexing.INDEX)).to.be.true;
        done();
      })

      it('writes JSON index into file', function (done) {
        expect(JSON.parse(fs.readFileSync(Analyser.recipesIndexing.INDEX, 'utf8'))).to.eql({_index: {recipe_1: {}, recipe_2: {}, recipe_3: {}}});
        done();
      });
    });

    describe('Analyser.recipesIndexing._toJSON', function () {
      it('indexes recipes into a json data structure', function (done) {
        expect(Analyser.recipesIndexing._toJSON(DUMMY_RECIPES)).to.eql('{"_index":{"recipe_1":{},"recipe_2":{},"recipe_3":{}}}');
        done();
      });
    });

    describe('Analyser.recipesIndexing._getRecipesList', function () {

      describe('when the store contains recipes', function () {
        it('returns an array of strings matching the recipes\' names', function (done) {
          expect(Analyser.recipesIndexing._getRecipesList()).to.eql(DUMMY_RECIPES);
          done();
        });

        it('returns an array of size that equals the number of recipes', function (done) {
          expect(Analyser.recipesIndexing._getRecipesList().length).to.equal(DUMMY_RECIPES.length);
          done();
        });
      });

      describe('when the store is empty', function () {
        beforeEach(function () {
          // Empty recipe store
          var path = Analyser.recipesIndexing.STORE.replace(/\/$/, '');
          try {
            exec('mv ' + ([path, path + '.backup']).join(' '));
            exec('mkdir ' + path);
          } catch(e) {}
        });

        afterEach(function () {
          // Reinstate recipes in store
          var path = Analyser.recipesIndexing.STORE.replace(/\/$/, '');
          try {
            exec('rm -rf ' + path);
            exec('mv ' + ([path + '.backup', path]).join(' '));
          } catch(e) {}
        });

        it('returns an empty array', function (done) {
          expect(Analyser.recipesIndexing._getRecipesList()).to.eql([]);
          done();
        });
      });

    });

  });

});
