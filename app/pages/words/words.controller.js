(function () {
  'use strict';

  angular
    .module('app')
    .controller('WordsController', WordsController);

  WordsController.$inject = ['categories'];

  function WordsController(categories) {
    var vm = this;

    vm.categories = categories.categories;
  }
})();
