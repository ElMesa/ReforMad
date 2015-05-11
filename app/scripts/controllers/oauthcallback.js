'use strict';

/**
 * @ngdoc function
 * @name reforMadApp.controller:OauthcallbackCtrl
 * @description
 * # OauthcallbackCtrl
 * Controller of the reforMadApp
 */
angular.module('reforMadApp')
  .controller('OauthcallbackCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.urlParams = $location.search();
  }]);
