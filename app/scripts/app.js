'use strict';

/**
 * @ngdoc overview
 * @name reforMadApp
 * @description
 * # reforMadApp
 *
 * Main module of the application.
 */
angular
  .module('reforMadApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
