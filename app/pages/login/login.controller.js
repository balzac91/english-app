(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', '$state'];

  function LoginController(authService, $state) {
    var vm = this;

    vm.invalidPassword = false;
    vm.unknownError = false;

    vm.formData = {
      email: null,
      password: null,
      rememberMe: false
    };

    vm.submitForm = function () {
      authService.login(vm.formData.email, vm.formData.password).then(function () {
        $state.go('app.dashboard');
      }, function (response) {
        vm.invalidPassword = false;
        vm.unknownError = false;

        if (response.status === 401) {
          vm.invalidPassword = true;
        } else {
          vm.unknownError = true;
        }
      });
    };
  }
})();
