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
    'ngRoute', 'leaflet-directive'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/Map'
      })
      .when('/Map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
