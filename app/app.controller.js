(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['authService'];

  function AppController(authService) {
    var vm = this;

    vm.logout = function () {
      authService.logout();
    };
  }
})();
