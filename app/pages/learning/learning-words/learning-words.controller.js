(function () {
  'use strict';

  angular
    .module('app')
    .controller('LearningWordsController', LearningWordsController);

  LearningWordsController.$inject = ['words', 'validationErrors', 'wordsService', '$state', '$stateParams'];

  function LearningWordsController(words, validationErrors, wordsService, $state, $stateParams) {
    var vm = this;

    vm.words = words.words;
    vm.validationErrors = validationErrors;
    vm.currentWord = vm.words.shift();
    vm.translationSent = false;
    vm.proposedTranslationError = false;
    vm.correctTranslation = null;
    vm.disableInput = false;
    vm.correct = null;
    vm.progress = 0;
    vm.totalWords = vm.words.length;
    vm.results = [];
    vm.answers = [];

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
    vm.submitProposedTranslationForm = submitProposedTranslationForm;

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
          vm.results.push({
            lp: vm.totalWords - vm.words.length + 1,
            english: vm.currentWord.english,
            answer: vm.formData.translation,
            polish: vm.currentWord.polish,
            correct: vm.correct
          });
          vm.answers.push({
            wordId: vm.currentWord.id,
            correct: vm.correct
          });
          break;

        case 'next':
          vm.currentWord = vm.words.shift();
          vm.formData.translation = null;
          vm.formData.proposedTranslation = null;
          vm.translationSent = false;
          vm.proposedTranslationError = false;
          vm.correctTranslation = null;
          vm.action = 'check';
          break;

        case 'load':
          wordsService.answer(vm.answers);
          vm.answers = [];
          vm.disableInput = true;
          $state.go('app.learning.words', {categoryId: $stateParams.categoryId}, {reload: true});
          break;
      }
    }

    function submitProposedTranslationForm() {
      vm.requestSent = true;
      wordsService.proposeTranslation(vm.currentWord.id, vm.formData.proposedTranslation).then(function () {
        vm.requestSent = false;
        vm.translationSent = true;
        vm.proposedTranslationError = false;
      }, function () {
        vm.requestSent = false;
        vm.proposedTranslationError = true;
      });
    }
  }
})();
