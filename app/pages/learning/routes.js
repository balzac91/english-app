(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.learning', {
        url: 'nauka-slowek',
        templateUrl: './pages/learning/learning.html',
        abstract: true
      })
      .state('app.learning.categories', {
        url: '/kategorie',
        templateUrl: './pages/learning/learning-categories/learning-categories.html',
        controller: 'LearningCategoriesController',
        controllerAs: 'vm',
        resolve: {
          categories: ['wordsService', function (wordsService) {
            return wordsService.getCategories();
          }]
        }
      })
      .state('app.learning.words', {
        url: '/kategoria/:categoryId/slowka',
        templateUrl: './pages/learning/learning-words/learning-words.html',
        controller: 'LearningWordsController',
        controllerAs: 'vm',
        resolve: {
          words: ['wordsService', '$stateParams', function (wordsService, $stateParams) {
            return wordsService.getWords($stateParams.categoryId);
          }]
        }
      });
  }
})();
