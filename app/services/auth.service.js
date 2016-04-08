(function () {
  'use strict';

  angular
    .module('app')
    .factory('authService', authService);

  authService.$inject = ['$http', 'config'];

  function authService($http, config) {
    var session = {};

    return {
      getSession: getSession,
      isAuthorized: isAuthorized,
      login: login,
      logout: logout
    };

    function getSession() {
      return session;
    }

    function isAuthorized() {
      var sessionData = getSession();
      return !!(sessionData && sessionData.sessionId);
    }

    function login(email, password) {
      var data = {
        email: email,
        password: password
      };

      return $http.post(config.apiUrl + 'authorization/login.json', data)
        .then(function (response) {
          session = response.data.data;
          return session;
        });
    }

    function logout(sessionId) {
      var data = {
        sessionId: sessionId
      };

      return $http.post(config.apiUrl + 'authorization/logout.json', data)
        .then(function () {
          session = {};
        });
    }
  }
})();
