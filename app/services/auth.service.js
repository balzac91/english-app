(function () {
  'use strict';

  angular
    .module('app')
    .factory('authService', authService);

  function authService() {
    return {
      login: login
    };

    function login(login, password) {
    }
  }
})();