(function () {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.bootstrap'])
    .run(runBlock);

  runBlock.$inject = ['authService', '$rootScope', '$state'];

  function runBlock(authService, $rootScope, $state) {
    var onCallback = $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (!authService.isAuthorized() && ['login'].indexOf(toState.name) === -1) {
        event.preventDefault();
        $state.go('login');
      }
    });

    $rootScope.$on('$destroy', onCallback);
  }
})();
