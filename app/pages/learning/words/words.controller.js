(function () {
  'use strict';

  angular
    .module('app')
    .controller('WordsController', WordsController);

  WordsController.$inject = ['words'];

  function WordsController(words) {
    var vm = this;

    vm.words = words.words;
  }
})();
