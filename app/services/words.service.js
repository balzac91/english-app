(function () {
  'use strict';

  angular
    .module('app')
    .factory('wordsService', wordsService);

  wordsService.$inject = ['authService', 'config', '$http'];

  function wordsService(authService, config, $http) {
    return {
      getCategories: getCategories,
      getWords: getWords,
      getAllWords: getAllWords,
      proposeTranslation: proposeTranslation,
      answer: answer
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

    function getWords(categoryId) {
      var data = {
        sessionId: authService.getSession().sessionId,
        categoryId: categoryId
      };

      return $http.post(config.apiUrl + 'words/get.json', data)
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

    function proposeTranslation(wordId, proposedTranslation) {
      var data = {
        sessionId: authService.getSession().sessionId,
        wordId: wordId,
        polish: proposedTranslation
      };

      return $http.post(config.apiUrl + 'words/proposeTranslation.json', data)
        .then(function (response) {
          return response.status;
        });
    }

    function answer(answers) {
      var data = {
        sessionId: authService.getSession().sessionId,
        answers: answers
      };

      return $http.post(config.apiUrl + 'words/answer.json', data)
        .then(function (response) {
          return response.status;
        });
    }
  }
})();
