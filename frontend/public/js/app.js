var app = angular.module('event', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'login.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'register.html'
  });
  
});




