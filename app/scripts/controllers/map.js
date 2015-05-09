'use strict';

/**
 * @ngdoc function
 * @name reforMadApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the reforMadApp
 */
angular.module('reforMadApp')
    .controller('MapCtrl', ['$scope', function($scope) {
        
    	var map = {};

    	map.center = {
            lat: 40.416955,
            lng: -3.703517,
            zoom: 11
        };

        $scope.map = map;
    }]);