/**
 * Recipe card directive
 *
 * # Implementation
 *
 * <foc-recipe-card name="Name of my recipe" slug="recipe-slug" img-src="/path/to/recipe/image.jpg"></foc-recipe-card>
 *
 * @return {Object} Directive's options
 */
var recipeCardDirective = function recipeCardDirective() {

  var TEMPLATE_URL = 'public/js/directives/recipeCard/recipeCardView.html';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      name:   '@',
      slug:   '@',
      imgSrc: '@'
    },
    templateUrl: TEMPLATE_URL
  };

};

angular.module('focApp').directive('focRecipeCard', recipeCardDirective);
