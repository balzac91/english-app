(function () {
  'use strict';

  angular
    .module('app')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories'];

  function CategoriesController(categories) {
    var vm = this;

    vm.categories = categories.categories;
  }
})();
