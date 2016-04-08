(function () {
  'use strict';

  angular
    .module('app')
    .factory('authService', authService);

  authService.$inject = ['$http', 'config'];

  function authService($http, config) {
    return {
      login: login,
      logout: logout
    };

    function login(email, password) {
      var data = {
        email: email,
        password: password
      };

      return $http.post(config.apiUrl + 'authorization/login.json', data)
        .then(function (response) {
          return response.data.data;
        });
    }

    function logout() {
      var data = {
        sessionId: 'f8ca4620-fda1-4d53-893a-54f2e58dbbb9'
      };

      return $http.post(config.apiUrl + 'authorization/logout.json', data)
        .then(function () {
        });
    }
  }
})();
