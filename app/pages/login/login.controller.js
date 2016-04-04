(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  function LoginController() {
    var vm = this;

    vm.formData = {
      email: null,
      password: null
    };

    vm.submitForm = function () {
    };
  }
})();
