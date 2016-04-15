(function () {
  'use strict';

  angular
    .module('app')
    .directive('contentHeight', contentHeight);

  contentHeight.$inject = ['$window', '$timeout'];

  function contentHeight($window, $timeout) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element) {
      $timeout(function () {
        setHeight();
      });

      angular.element($window).on('resize', function () {
        setHeight();
      });

      function setHeight() {
        element.css({'min-height': $window.innerHeight - angular.element(document).find('.navbar').height() + 'px'});
      }
    }
  }
})();
