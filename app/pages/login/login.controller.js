(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', 'validationErrors', '$state', '$stateParams'];

  function LoginController(authService, validationErrors, $state, $stateParams) {
    var vm = this;

    vm.validationErrors = validationErrors;
    vm.formError = $stateParams.unauthorized ? vm.validationErrors.unauthorized : null;
    vm.requestSent = false;

    vm.formData = {
      email: null,
      password: null,
      rememberMe: false
    };

    vm.submitForm = function () {
      vm.requestSent = true;

      authService.login(vm.formData.email, vm.formData.password, vm.formData.rememberMe)
        .then(function () {
          vm.requestSent = false;
          $state.go('app.dashboard');
        }, function (response) {
          vm.requestSent = false;
          vm.formError = null;

          if (response.status === 401) {
            vm.formError = vm.validationErrors.incorrectEmailOrPassword;
          } else {
            vm.formError = vm.validationErrors.anyError;
          }
        });
    };
  }
})();
