(function () {
  'use strict';

  var config = {
    apiUrl: 'http://www.balzac.vot.pl/english/api/'
  };

  angular
    .module('app')
    .constant('config', config);
})();
