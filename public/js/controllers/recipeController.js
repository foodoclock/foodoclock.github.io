/**
 * Recipe controller
 *
 * @param {Scope} $scope Controller's scope
 * @param {Http}  $http  Http service
 */
var recipeController = function recipeController($scope, $http, $state) {

  var RECIPE_SLUG = $state.params.name;
  var RECIPE_JSON = '/public/store/recipes/' + RECIPE_SLUG +  '.json';

  /**
   * Set the state of the controller
   *
   * @param {Object} values key-value pair of the scope to be updated
   */
  var setState = function setState(values) {
    for(var key in values) {
      var value = values[key];
      $scope[key] = value;
    };
  };

  // Start in the loading state
  setState(recipeController.state.loading());

  // Load recipe
  $http.get(RECIPE_JSON)
    .success(function(data) {
      // Set the state to successful
      setState(recipeController.state.successful(data.recipe));
    })
    .error(function() {
      // Set the state to error
      setState(recipeController.state.error());
    });

};

recipeController.state = {

  /**
   * Successful state
   *
   * @param {Object} recipe Recipe data
   * @return {Object}
   */
  successful: function successful(recipe) {
    return {
      loading: false,
      failed:  false,
      recipe:  recipe
    };
  },

  /**
   * Error state
   *
   * @return {Object}
   */
  error: function error() {
    return {
      loading: false,
      failed:  true,
      recipe:  null
    };
  },

  /**
   * Loading state
   *
   * @return {Object}
   */
  loading: function loading() {
    return {
      loading: true,
      failed:  false,
      recipe:  undefined
    };
  }

};

angular.module('focApp').controller('recipeController', ['$scope', '$http', '$state', recipeController]);
