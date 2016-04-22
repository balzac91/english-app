(function () {
  'use strict';

  angular
    .module('app')
    .controller('LearningWordsController', LearningWordsController);

  LearningWordsController.$inject = ['words', 'wordsService', '$state', '$stateParams'];

  function LearningWordsController(words, wordsService, $state, $stateParams) {
    var vm = this;

    vm.words = words.words;
    vm.currentWord = vm.words.shift();
    vm.correctTranslation = null;
    vm.disableInput = false;
    vm.correct = null;
    vm.progress = 0;
    vm.totalWords = vm.words.length;


    vm.formData = {
      translation: null,
      proposedTranslation: null
    };

    vm.states = {
      next: 'Dalej',
      load: 'Pobierz',
      check: 'Sprawdź'
    };

    vm.submitButtonText = 'Sprawdź';
    vm.action = 'check';

    vm.submitForm = submitForm;
    //vm.submitProposedTranslationForm = submitProposedTranslationForm;

    function submitForm() {
      switch (vm.action) {
        case 'check':
          vm.correct = false;
          vm.currentWord.polish.split(/[,;]/).forEach(function (word) {
            if (word.trim() === vm.formData.translation) {
              vm.correct = true;
            }
          });

          vm.progress = 100 * (vm.totalWords - vm.words.length + 1) / (vm.totalWords + 1);
          vm.correctTranslation = vm.currentWord.polish;
          vm.action = vm.words.length ? 'next' : 'load';
          break;

        case 'next':
          vm.currentWord = vm.words.shift();
          vm.formData.translation = null;
          vm.correctTranslation = null;
          vm.action = 'check';
          break;

        case 'load':
          vm.disableInput = true;
          $state.go('app.learning.words', {categoryId: $stateParams.categoryId}, {reload: true});
          break;
      }
    }

//vh do loadera
    //function submitProposedTranslationForm () {
    //  vm.requestSent = true;
    //  wordsService.proposeTranslation(vm.currentWord.id, vm.proposedTranslation).then(function (response) {
    //    vm.requestSent = false;
    //  }, function () {
    //    vm.requestSent = false;
    //  });
    //}
  }
})();
