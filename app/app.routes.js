(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/strona-glowna');

    $stateProvider
      .state('dashboard', {
        url: '/strona-glowna',
        templateUrl: './pages/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('learning', {
        url: '/nauka-slowek',
        templateUrl: './pages/learning/learning.html',
        controller: 'LearningController',
        controllerAs: 'vm'
      })
      .state('words', {
        url: '/lista-slowek',
        templateUrl: './pages/words/words.html',
        controller: 'WordsController',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profil',
        templateUrl: './pages/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/ustawienia',
        templateUrl: './pages/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/wyloguj',
        templateUrl: './pages/logout/logout.html',
        controller: 'LogoutController',
        controllerAs: 'vm'
      });
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
})();
