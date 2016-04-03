(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/strona-glowna');

    $stateProvider
      .state('app', {
        url: '/',
        abstract: true,
        templateUrl: './app.html'
      })
      .state('app.dashboard', {
        url: 'strona-glowna',
        templateUrl: './pages/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('app.learning', {
        url: 'nauka-slowek',
        templateUrl: './pages/learning/learning.html',
        controller: 'LearningController',
        controllerAs: 'vm'
      })
      .state('app.words', {
        url: 'lista-slowek',
        templateUrl: './pages/words/words.html',
        controller: 'WordsController',
        controllerAs: 'vm'
      })
      .state('app.profile', {
        url: 'profil',
        templateUrl: './pages/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .state('app.settings', {
        url: 'ustawienia',
        templateUrl: './pages/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm'
      })
      .state('app.logout', {
        url: 'wyloguj',
        templateUrl: './pages/logout/logout.html',
        controller: 'LogoutController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/logowanie',
        templateUrl: './pages/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
})();
