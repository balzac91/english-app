(function () {
  'use strict';

  angular
    .module('app')
    .directive('focusInput', focusInput);

  function focusInput() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element) {
      element.focus();
    }
  }
})();
