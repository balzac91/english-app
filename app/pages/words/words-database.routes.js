(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.wordsDatabase', {
        url: 'baza-slowek',
        templateUrl: './pages/words/words-database.html',
        controller: 'WordsDatabaseController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('app.wordsDatabase.categories', {
        url: '/kategorie',
        templateUrl: './pages/words/categories/categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
          categories: ['wordsService', function (wordsService) {
            return wordsService.getCategories();
          }]
        }
      })
      .state('app.wordsDatabase.words', {
        url: '/kategoria/:categoryId/slowka',
        templateUrl: './pages/words/words/words.html',
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
