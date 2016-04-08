(function () {
  'use strict';

  var config = {
    apiUrl: 'http://english.dev/api/'
  };

  angular
    .module('app')
    .constant('config', config);
})();
