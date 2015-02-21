/**
 * Cookbook controller
 *
 * @param {Scope} $scope Controller's scope
 * @param {Http}  $http  Http service
 */
var cookbookController = function cookbookController($scope, $http) {

  var RECIPES_INDEX = '/public/store/recipes/_index.json';

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
  setState(cookbookController.state.loading());

  // Load recipes
  $http.get(RECIPES_INDEX)
    .success(function (data) {
      // Set the state to successful
      setState(cookbookController.state.successful(data._index));
    })
    .error(function () {
      // Set the state to error
      setState(cookbookController.state.error());
    });

};

/**
 * List of the cookbook's states
 */
cookbookController.state = {
  /**
   * Successful state
   *
   * @param {array} recipes List of recipes
   * @return {Object}
   */
  successful: function successful(recipes) {
    return {
      loading: false,
      failed:  false,
      recipes: recipes
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
      recipes: null
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
      recipes: undefined
    };
  }
};

angular.module('focApp').controller('cookbookController', ['$scope', '$http', cookbookController]);
