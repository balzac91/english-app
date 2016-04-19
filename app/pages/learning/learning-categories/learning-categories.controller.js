(function () {
  'use strict';

  angular
    .module('app')
    .controller('LearningCategoriesController', LearningCategoriesController);

  LearningCategoriesController.$inject = ['categories'];

  function LearningCategoriesController(categories) {
    var vm = this;

    vm.categories = categories.categories;
  }
})();
