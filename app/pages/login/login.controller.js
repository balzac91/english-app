(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService'];

  function LoginController(authService) {
    var vm = this;

    vm.formData = {
      email: null,
      password: null
    };

    vm.submitForm = function () {
      authService.login(vm.formData.email, vm.formData.password);
    };
  }
})();
