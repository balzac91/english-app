(function () {
  'use strict';

  var validationErrors = {
    incorrectEmail: 'Wpisany adres e-mail jest niepoprawny',
    incorrectEmailOrPassword: 'Niepoprawny e-mail lub hasło',
    emptyField: 'Pole nie może zostać puste',
    anyError: 'Wystąpił błąd, proszę spróbować ponownie',
    unauthorized: 'Twoja sesja wygasła, zaloguj się ponownie'
  };

  angular
    .module('app')
    .constant('validationErrors', validationErrors);
})();
