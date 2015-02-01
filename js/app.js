var app = angular.module('focApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // FIXME Not working on github pages
  // $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('default', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: function($scope, $http) {

        $http.get('/store/recipes/_index.json')
          .success(function(data) {

            $scope.recipes = data._index;;

          });

      },
      controllerAs: 'homeCtrl'
    }).state('recipe-show', {
      url: "/recipe/:name",
      templateUrl: 'views/recipe.html',
      controller: function($scope, $state, $http) {

        $http.get('/store/recipes/' + $state.params.name  +  '.json')
          .success(function(data) {
            $scope.recipe = data.recipe;
          });

      },
      controllerAs: 'recipeCtrl'
    });

});
