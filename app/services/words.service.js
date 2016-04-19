(function () {
  'use strict';

  angular
    .module('app')
    .factory('wordsService', wordsService);

  wordsService.$inject = ['authService', 'config', '$http'];

  function wordsService(authService, config, $http) {
    return {
      getCategories: getCategories,
      getAllWords: getAllWords
    };

    function getCategories() {
      var data = {
        sessionId: authService.getSession().sessionId
      };

      return $http.post(config.apiUrl + 'categories/get.json', data)
        .then(function (response) {
          return response.data.data;
        });
    }

    function getAllWords(categoryId) {
      var data = {
        sessionId: authService.getSession().sessionId,
        categoryId: categoryId
      };

      return $http.post(config.apiUrl + 'words/getAll.json', data)
        .then(function (response) {
          return response.data.data;
        });
    }
  }
})();
