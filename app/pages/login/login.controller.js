(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService'];

  function LoginController(authService) {
    var vm = this;

    vm.invalidPassword = false;
    vm.unknownError = false;

    vm.formData = {
      email: null,
      password: null
    };

    vm.submitForm = function () {
      authService.login(vm.formData.email, vm.formData.password).then(function () {
      }, function (response) {
        if (response.status === 401) {
          vm.invalidPassword = true;
        } else {
          vm.unknownError = true;
        }
      });
    };
  }
})();
