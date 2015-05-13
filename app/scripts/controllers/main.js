'use strict';

/**
 * @ngdoc function
 * @name reforMadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reforMadApp
 */
angular.module('reforMadApp')
  .controller('MainCtrl', ['$scope', 'User', 'Issue', 'API', function ($scope, User, Issue, API) {
    
    $scope.user = User;
	$scope.issue = Issue;    

    $scope.send = function send() {
    	$scope.issue.send($scope.user);
    }

    $scope.enableLocalMode = function enableLocalMode() {
    	API.setHost('local');
    }

  }]);
