'use strict';

function download(data, extension, filename) {
    var hiddenElement = document.createElement('a');

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dateString = year + '-' + month + '-' + day + '-' + hours + '-' + minutes + '-' + seconds;

    //hiddenElement.href = 'data:attachment/csv,' + $scope.csv.replace(/\n/g,'%0A');
    hiddenElement.href = 'data:attachment/' + extension + ',' + encodeURIComponent(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'ReforMad-' + filename  + '-' + dateString + '.' + extension;
    hiddenElement.click();
};

/**
 * @ngdoc function
 * @name reforMadApp.controller:DatageneratorCtrl
 * @description
 * # DatageneratorCtrl
 * Controller of the reforMadApp
 */
angular.module('reforMadApp')
    .controller('DatageneratorCtrl', ['$scope', 'DataGenerator', function($scope, DataGenerator) {
        $scope.DataGenerator = DataGenerator;
        $scope.csvRowCount = 100;

        $scope.init = function init() {
            //$scope.generate();
            $scope.generatorMode = 'nonUniform'
            $scope.generate($scope.generatorMode);
        }

        $scope.generate = function generate(mode) {
            if (mode == undefined) mode = 'default';
            var dataArray = $scope.DataGenerator.generateRows($scope.csvRowCount, mode);
            $scope.DEBUGPerlinNoiseCanvas(DataGenerator.PerlinNoise.plane);
            $scope.csv = $scope.DataGenerator.table2csv(dataArray, $scope.DataGenerator.columns);
        }

        //From: http://stackoverflow.com/questions/17836273/export-javascript-data-to-csv-file-without-server-interaction
        $scope.downloadData = function downloadData() {
            download($scope.csv, 'csv', 'DataGenerator_v2_rs_' + DataGenerator.PerlinNoise.randomSeed);
            /*
            var hiddenElement = document.createElement('a');

            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var dateString = year + '-' + month + '-' + day + '-' + hours + '-' + minutes + '-' + seconds;

            //hiddenElement.href = 'data:attachment/csv,' + $scope.csv.replace(/\n/g,'%0A');
            hiddenElement.href = 'data:attachment/csv,' + encodeURIComponent($scope.csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'ReforMad-DataGenerator-v1-' + dateString + '.csv';
            hiddenElement.click();
            */
        }

        $scope.regeneratePerlinNoise = function regeneratePerlinNoise() {
            console.log('DatageneratorCtrl.regeneratePerlinNoise(%O)',$scope.randomSeed);
            DataGenerator.PerlinNoise.init($scope.randomSeed);

            //DEBUG
            //download(DataGenerator.PerlinNoise.plane, 'json', 'PerlinNoisePlane_rs_' + DataGenerator.PerlinNoise.randomSeed);

            $scope.DEBUGPerlinNoiseCanvas(DataGenerator.PerlinNoise.plane);
        }

        $scope.DEBUGPerlinNoiseCanvas = function DEBUGPerlinNoiseCanvas(noise) {
            if (noise == undefined) noise = DataGenerator.PerlinNoise.generate();
            console.log('DatageneratorCtrl.DEBUGPerlinNoiseCanvas()');

            var canvas = document.getElementById('noise_1');
            var context = canvas.getContext('2d');

            for (var x = 0; x < noise.length; x++) {
                for (var y = 0; y < noise[x].length; y++) {
                    var color = Math.round((255 * noise[x][y]));

                    context.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
                    context.fillRect(x, y, 1, 1);
                }
            }
        }

        $scope.init();
    }]);