var fs = require('fs');

/**
 * Analyser namespace
 */
var Analyser = {};

/**
 * Analyser for recipe indexing
 */
Analyser.recipesIndexing = {};

Analyser.recipesIndexing.STORE = './public/store/recipes/';
Analyser.recipesIndexing.INDEX = Analyser.recipesIndexing.STORE + '_index.json';

/**
 * Check all existing recipes and index them into a file
 */
Analyser.recipesIndexing.exec = function analyserRecipesIndexingExec() {
  var recipes = Analyser.recipesIndexing._getRecipesList();
  var json = Analyser.recipesIndexing._toJSON(recipes);

  fs.writeFileSync(Analyser.recipesIndexing.INDEX, json);
};

/**
 * Return a json structured index
 *
 * @param {array} recipes Array of recipe names
 *
 * @return {JSON}
 */
Analyser.recipesIndexing._toJSON = function _toJSON(recipes) {
  var json = {_index: {}};
  recipes.forEach(function (recipeSlug) {
    json._index[recipeSlug] = {};
  });
  return JSON.stringify(json);
};

/**
 * Get the list of all existing recipes
 *
 * @return {array}
 */
Analyser.recipesIndexing._getRecipesList = function _getRecipesList() {
  var list = fs.readdirSync(Analyser.recipesIndexing.STORE) || [];
  return list.map(function(fileName){ return fileName.replace(/\.json$/, '');  });
};

module.exports = Analyser;
