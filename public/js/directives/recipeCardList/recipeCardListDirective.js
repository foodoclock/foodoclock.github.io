/**
 * Recipe card list directive
 *
 * # Implementation
 *
 * <foc-recipe-card-list recipes="arrayOfRecipes"></foc-recipe-card-list>
 *
 * @return {Object} Directive's options
 */
var recipeCardListDirective = function recipeCardListDirective() {

  var TEMPLATE_URL = 'public/js/directives/recipeCardList/recipeCardListView.html';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      recipes: '='
    },
    templateUrl: TEMPLATE_URL
  };

};

angular.module('focApp').directive('focRecipeCardList', recipeCardListDirective);
