(function () {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.bootstrap', 'ngCookies'])
    .run(runBlock);

  runBlock.$inject = ['authService', '$rootScope', '$state'];

  function runBlock(authService, $rootScope, $state) {
    var onCallback = $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (authService.isAuthorized() && toState.name === 'login') {
        event.preventDefault();
        $state.go('app.dashboard');
      }

      if (!authService.isAuthorized() && toState.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    });

    $rootScope.$on('$destroy', onCallback);
  }
})();
