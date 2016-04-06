(function () {
  'use strict';

  angular
    .module('app')
    .factory('authService', authService);

  authService.$inject = ['$http', 'config'];

  function authService($http, config) {
    return {
      login: login
    };

    function login(email, password) {
      var data = {
        email: email,
        password: password
      };

      return $http.post(config.apiUrl + 'authorization/login.json', data)
        .then(function () {
        });
    }
  }
})();
