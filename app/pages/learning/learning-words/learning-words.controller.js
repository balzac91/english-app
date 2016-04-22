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

    vm.formData = {
      translation: null,
      proposedTranslation: null
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

          vm.correctTranslation = vm.currentWord.polish;
          if (vm.words.length) {
            vm.submitButtonText = 'Dalej';
            vm.action = 'next';
          } else {
            vm.submitButtonText = 'Pobierz';
            vm.action = 'load';
          }
          break;

        case 'next':
          vm.currentWord = vm.words.shift();
          vm.formData.translation = null;
          vm.correctTranslation = null;
          vm.submitButtonText = 'Sprawdź';
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
