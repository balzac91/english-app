(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['session', 'authService', '$state'];

  function AppController(session, authService, $state) {
    var vm = this;

    vm.logout = function () {
      authService.logout(session.sessionId).then(function () {
        $state.go('login');
      });
    };
  }
})();
