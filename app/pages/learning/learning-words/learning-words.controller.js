(function () {
  'use strict';

  angular
    .module('app')
    .controller('LearningWordsController', LearningWordsController);

  LearningWordsController.$inject = ['words', '$state', '$stateParams'];

  function LearningWordsController(words, $state, $stateParams) {
    var vm = this;

    vm.formData = {
      translation: null
    };

    vm.words = words.words;
    vm.wordsQueue = angular.copy(vm.words);
    vm.currentWord = vm.wordsQueue.shift();
    vm.correctTranslation = null;
    vm.submitButtonText = 'Sprawdź';
    vm.action = 'check';
    vm.disableInput = false;
    vm.correct = null;
    vm.submitForm = submitForm;

    function submitForm() {
      if (vm.action === 'check') {
        var words = vm.currentWord.polish;
        var splittedWords = words.split(/[,;]/);
        vm.correct = false;

        splittedWords.forEach(function (element) {
          if (element.trim() === vm.formData.translation) {
            vm.correct = true;
          }
        });

        vm.correctTranslation = vm.currentWord.polish;
        if (vm.wordsQueue.length) {
          vm.submitButtonText = 'Dalej';
          vm.action = 'next';
        } else {
          vm.submitButtonText = 'Pobierz';
          vm.action = 'load';
        }
      } else if (vm.action === 'next') {
        vm.currentWord = vm.wordsQueue.shift();
        vm.correctTranslation = null;
        vm.submitButtonText = 'Sprawdź';
        vm.action = 'check';
        vm.formData.translation = null;
      } else if (vm.action === 'load') {
        vm.disableInput = true;
        $state.go('app.learning.words', {categoryId: $stateParams.categoryId}, {reload: true});
      }
    }
  }
})();
