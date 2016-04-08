(function () {
  'use strict';

  angular
    .module('app')
    .factory('authService', authService);

  authService.$inject = ['config', '$cookies', '$http'];

  function authService(config, $cookies, $http) {
    var session = {};

    return {
      getSession: getSession,
      isAuthorized: isAuthorized,
      login: login,
      logout: logout
    };

    function getSession() {
      var cookieSession = $cookies.getObject('session');
      if (cookieSession) {
        session = cookieSession;
      }

      return session;
    }

    function isAuthorized() {
      var sessionData = getSession();
      return !!(sessionData && sessionData.sessionId);
    }

    function login(email, password, rememberMe) {
      var data = {
        email: email,
        password: password
      };

      return $http.post(config.apiUrl + 'authorization/login.json', data)
        .then(function (response) {
          session = response.data.data;
          if (rememberMe) {
            $cookies.putObject('session', session);
          }
          return session;
        });
    }

    function logout(sessionId) {
      var data = {
        sessionId: sessionId
      };

      return $http.post(config.apiUrl + 'authorization/logout.json', data)
        .then(function () {
          resetData();
        });
    }

    function resetData() {
      session = {};
      $cookies.remove('session');
    }
  }
})();
