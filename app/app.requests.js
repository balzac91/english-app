(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    interceptor.$inject = ['$q', '$injector'];

    function interceptor($q, $injector) {
      return {
        request: function (requestConfig) {
          return requestConfig;
        },
        requestError: function (rejection) {
          return $q.reject(rejection);
        },
        response: function (response) {
          return response;
        },
        responseError: function (rejection) {
          if (rejection.status === 401) {
            $injector.get('$state').go('login', {unauthorized: true});
          }

          return $q.reject(rejection);
        }
      };
    }

    $httpProvider.interceptors.push(interceptor);
  }
})();
