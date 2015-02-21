var app = angular.module('focApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // FIXME Not working on github pages
  // $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('cookbook', {
      url: '/',
      templateUrl: '/public/views/cookbook.html',
      controller: 'cookbookController'
    }).state('recipe-show', {
      url: "/recipe/:name",
      templateUrl: '/public/views/recipe.html',
      controller: 'recipeController'
    });

});
