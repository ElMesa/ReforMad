'use strict';

function DataGenerator() {

    var self = this;

    this.init = function init() {
        //this.columns = ['date', 'time', 'latitude', 'longitude', 'user', 'district', 'neighbourhood', 'address'];
        this.columns = ['datetime', 'latitude', 'longitude', 'user', 'district', 'neighbourhood', 'address'];
        this.colIndex = this.generateColIndex(this.columns);
    }

    this.generateColIndex = function generateColIndex(columns) {
        var colIndex = {};

        for (var columnIndex in columns) {
            colIndex[this.columns[columnIndex]] = columnIndex;
        }

        return colIndex;
    }

    this.generateRows = function generateRows(count) {
        var rows = [];

        for (var i = 0; i < count; i++) {
            rows.push(self.generateRow());
        }

        return rows;
    }

    this.generateRow = function generateRow() {
        var row = [];
        var data = {};

        /*
        var date = chance.date({
            string: true,
            american: false,
            year: 2014
        });
        */
        var datetime = chance.date();
        datetime = moment(datetime).year(2014);
        datetime = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
        data.datetime = datetime;

        /*
        var hour = chance.hour({
            twentyfour: true
        });
        var minute = chance.minute();
        var second = chance.second();
        data.time = hour + ':' + minute + ':' + second;
        */
       
        //Madrid
        //top left: 40.506277, -3.841551
        //bottom right: 40.319571, -3.565464
        data.latitude = chance.latitude({
            min: 40.319571,
            max: 40.506277
        });
        data.longitude = chance.longitude({
            min: -3.841551,
            max: -3.565464
        });

        data.user = '@' + chance.name().split(' ')[0];

        data.address = chance.address();

        data.district = chance.state({
            full: true
        })

        data.neighbourhood = chance.province({
            full: true
        });

        for (var columnName in data) {
            row[self.colIndex[columnName]] = data[columnName];
        }

        return row;
    }

    this.table2csv = function table2csv(table, columns) {
        var csv = '';
        var csvRow;

        if(columns != undefined) csv += columns.join() + '\n'

        for (var i = 0; i < table.length; i++) {
            csvRow = table[i].join();
            csv += csvRow + '\n';
        }

        return csv;
    }

    this.init();
};

/**
 * @ngdoc function
 * @name reforMadApp.controller:DatageneratorCtrl
 * @description
 * # DatageneratorCtrl
 * Controller of the reforMadApp
 */
angular.module('reforMadApp')
    .controller('DatageneratorCtrl', function($scope) {
        $scope.DataGenerator = new DataGenerator();
        $scope.csvRowCount = 100;

        $scope.init = function init() {
        	$scope.generate();
        }

        $scope.generate = function generate() {
        	var dataArray = $scope.DataGenerator.generateRows($scope.csvRowCount);
        	$scope.csv = $scope.DataGenerator.table2csv(dataArray, $scope.DataGenerator.columns);
        }

        //From: http://stackoverflow.com/questions/17836273/export-javascript-data-to-csv-file-without-server-interaction
        $scope.download = function download() {
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
            hiddenElement.download = 'ReforMad-DataGenerator-v1-' + dateString +'.csv';
            hiddenElement.click();
        }

        $scope.init();
    });