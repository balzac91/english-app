(function () {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.bootstrap', 'ui.checkbox', 'ngAnimate', 'ngCookies'])
    .run(runBlock);

  runBlock.$inject = ['authService', '$rootScope', '$state'];

  function runBlock(authService, $rootScope, $state) {
    var onStateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      if (!fromState.name) {
        $rootScope.mainPageLoading = true;
      } else {
        $rootScope.pageLoading = true;
      }

      if (authService.isAuthorized() && !toParams.unauthorized && toState.name === 'login') {
        event.preventDefault();
        if (fromState.name === 'app.dashboard') {
          resetLoaders();
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
      resetLoaders();
    });

    var onStateChangeError = $rootScope.$on('$stateChangeError', function () {
      resetLoaders();
    });

    $rootScope.$on('$destroy', onStateChangeStart);
    $rootScope.$on('$destroy', onStateChangeSuccess);
    $rootScope.$on('$destroy', onStateChangeError);

    function resetLoaders () {
      $rootScope.pageLoading = false;
      $rootScope.mainPageLoading = false;
    }
  }
})();
