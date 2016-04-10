(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['config', 'session'];

  function ProfileController(config, session) {
    var vm = this;

    vm.config = config;
    vm.user = session.user;
  }
})();
