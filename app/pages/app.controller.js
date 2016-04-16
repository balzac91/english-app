(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['session', 'authService', '$rootScope', '$state'];

  function AppController(session, authService, $rootScope, $state) {
    var vm = this;
    vm.session = session;
    vm.$state = $state;

    vm.logout = function () {
      $rootScope.pageLoading = true;
      authService.logout(session.sessionId).then(function () {
        $rootScope.pageLoading = false;
        $state.go('login');
      }, function () {
        $rootScope.pageLoading = false;
      });
    };
  }
})();
