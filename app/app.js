(function () {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.bootstrap', 'ui.checkbox', 'ngAnimate', 'ngCookies'])
    .run(runBlock);

  runBlock.$inject = ['authService', '$rootScope', '$state'];

  function runBlock(authService, $rootScope, $state) {
    var onStateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      $rootScope.pageLoading = true;

      if (authService.isAuthorized() && !toParams.unauthorized && toState.name === 'login') {
        event.preventDefault();
        if (fromState.name === 'app.dashboard') {
          $rootScope.pageLoading = false;
        } else {
          $state.go('app.dashboard');
        }
      }

      if (!authService.isAuthorized() && toState.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    });

    var onStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.pageLoading = false;
    });

    var onStateChangeError = $rootScope.$on('$stateChangeError', function () {
      $rootScope.pageLoading = false;
    });

    $rootScope.$on('$destroy', onStateChangeStart);
    $rootScope.$on('$destroy', onStateChangeSuccess);
    $rootScope.$on('$destroy', onStateChangeError);
  }
})();
