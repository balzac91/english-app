(function () {
  'use strict';

  var config = {
    dateFormat: 'd MMMM yyyy',
    timeFormat: 'H:mm',
    apiUrl: 'http://english.dev/api/'
  };

  angular
    .module('app')
    .constant('config', config);
})();
