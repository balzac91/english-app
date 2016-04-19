(function () {
  'use strict';

  angular
    .module('app')
    .controller('LearningWordsController', LearningWordsController);

  LearningWordsController.$inject = ['words'];

  function LearningWordsController(words) {
    var vm = this;

    vm.words = words.words;
  }
})();
