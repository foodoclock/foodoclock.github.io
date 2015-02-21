/**
 * Loader clock directive
 *
 * # Implementation
 *
 * <foc-loader-clock></foc-loader-clock>
 *
 * @return {Object} Directive's options
 */
var loaderClockDirective = function loaderClockDirective() {

  var TEMPLATE_URL    = 'public/js/directives/loader/clock/loaderClockView.html';
  var DEFAULT_MESSAGE = 'loading ...';

  /**
   * Link function
   *
   * @param {Scope} scope Directive's scope
   */
  var _link = function _link(scope) {
    scope.message = scope.message || DEFAULT_MESSAGE;
  };

  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      message: '@'
    },
    templateUrl: TEMPLATE_URL,
    link: _link
  };

};

angular.module('focApp').directive('focLoaderClock', loaderClockDirective);
