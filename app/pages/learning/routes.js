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
        templateUrl: './pages/learning/categories/categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
          categories: ['wordsService', function (wordsService) {
            return wordsService.getCategories();
          }]
        }
      })
      .state('app.learning.words', {
        url: '/kategoria/:categoryId/slowka',
        templateUrl: './pages/learning/words/words.html',
        controller: 'WordsController',
        controllerAs: 'vm',
        resolve: {
          words: ['wordsService', '$stateParams', function (wordsService, $stateParams) {
            return wordsService.getWords($stateParams.categoryId);
          }]
        }
      });
  }
})();
