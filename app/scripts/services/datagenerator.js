'use strict';

//http://jsfiddle.net/dacxp/apKmv/
function PerlinNoise() {

	var self = this;

	this.init = function init(seed) {
        if(seed == undefined) seed = 'default';
		self.width = 100;
		self.height = 100;

        self.setRandomSeed(seed);
        self.plane = self.generate();
	}

    this.generate = function generate() {
        var plane;
        var noiseArr = new Array();

        for (var i = 0; i <= 5; i++) {
            noiseArr[i] = new Array();

            for (var j = 0; j <= 5; j++) {
                var height = self.random.floating({min: 0, max: 1});

                if (i == 0 || j == 0 || i == 5 || j == 5)
                    height = 1;

                noiseArr[i][j] = height;
            }
        }

        plane = (self.flatten(self.interpolate(noiseArr))) 

        self.plane = plane;
        return plane;
    }

    this.interpolate = function interpolate(points) {
        var noiseArr = new Array()
        var x = 0;
        var y = 0;

        for (var i = 0; i < self.height; i++) {
        //for (var i = 0; i < 150; i++) {
            if (i != 0 && i % 30 == 0)
                x++;

            noiseArr[i] = new Array();
            for (var j = 0; j < self.width; j++) {
            //for (var j = 0; j < 150; j++) {

                if (j != 0 && j % 30 == 0)
                    y++;

                var mu_x = (i % 30) / 30;
                var mu_2 = (1 - Math.cos(mu_x * Math.PI)) / 2;

                var int_x1 = points[x][y] * (1 - mu_2) + points[x + 1][y] * mu_2;
                var int_x2 = points[x][y + 1] * (1 - mu_2) + points[x + 1][y + 1] * mu_2;

                var mu_y = (j % 30) / 30;
                var mu_2 = (1 - Math.cos(mu_y * Math.PI)) / 2;
                var int_y = int_x1 * (1 - mu_2) + int_x2 * mu_2;

                noiseArr[i][j] = int_y;
            }
            y = 0;
        }
        return (noiseArr);
    }

    this.flatten = function flatten(points) {
        var noiseArr = new Array()
        for (var i = 0; i < points.length; i++) {
            noiseArr[i] = new Array()
            for (var j = 0; j < points[i].length; j++) {

                if (points[i][j] < 0.2)
                    noiseArr[i][j] = 0;

                else if (points[i][j] < 0.4)
                    noiseArr[i][j] = 0.2;

                else if (points[i][j] < 0.6)
                    noiseArr[i][j] = 0.4;

                else if (points[i][j] < 0.8)
                    noiseArr[i][j] = 0.6;

                else
                    noiseArr[i][j] = 1;
            }
        }

        return (noiseArr);
    }

    this.setRandomSeed = function setRandomSeed(seed) {
        self.randomSeed = seed;
        self.random = new Chance(seed);
    }

    this.init();
};

function DataGenerator() {

    var self = this;

    this.init = function init() {

    	self.PerlinNoise = new PerlinNoise();
        //this.columns = ['date', 'time', 'latitude', 'longitude', 'user', 'district', 'neighbourhood', 'address'];
        self.columns = ['datetime', 'latitude', 'longitude', 'user', 'district', 'neighbourhood', 'address'];
        self.colIndex = this.generateColIndex(this.columns);

        self.bounding = {
        	latitude: {
	            min: 40.319571,
	            max: 40.506277
	        },
	        longitude: {
	            min: -3.841551,
	            max: -3.565464
	        }
	    }
    }

    this.generateColIndex = function generateColIndex(columns) {
        var colIndex = {};

        for (var columnIndex in columns) {
            colIndex[this.columns[columnIndex]] = columnIndex;
        }

        return colIndex;
    }

    this.generateRows = function generateRows(count, mode) {
        if(mode == undefined) mode = 'default';
        var rows = [];

        var rowGenerator = {
        	default: self.generateRow,
        	nonUniform: self.generateRowNonUniform
        }

        console.log('Service - DataGenerator.generateRows - mode: %O', mode);

        for (var i = 0; i < count; i++) {
            rows.push(rowGenerator[mode]());
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
            min: self.bounding.latitude.min,
            max: self.bounding.latitude.max
        });
        data.longitude = chance.longitude({
            min: self.bounding.longitude.min,
            max: self.bounding.longitude.max
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

    this.generateRowNonUniform = function generateRowNonUniform() {
    	var row = self.generateRow();

    	while(!self.filter_PerlinNoise(row)) row = self.generateRow();

    	return row;
    }

    this.filter_PerlinNoise = function filter_PerlinNoise(row) {
    	var passesFilter = true;

    	var colIndex = self.colIndex;
        /*
        var yMin = self.bounding.latitude.min;
        var yMax = self.bounding.latitude.max;
        var xMin = self.bounding.longitude.min;
        var xMax = self.bounding.longitude.max;
        var positionY = row[colIndex['latitude']];
        var positionX = row[colIndex['longitude']];
        */
       
        var yMin = self.bounding.longitude.min;
        var yMax = self.bounding.longitude.max;
        var xMin = self.bounding.latitude.min;
        var xMax = self.bounding.latitude.max;
        var positionY = row[colIndex['longitude']];
        var positionX = row[colIndex['latitude']];

        var relativeLocation = self.relativePositionInPlane(xMin, xMax, yMin, yMax, positionX, positionY)

        var perlinXRange = self.PerlinNoise.width;
        var perlinX = relativeLocation.x * perlinXRange;
        var perlinXIndex = Math.floor(perlinX % perlinXRange);

        var perlinYRange = self.PerlinNoise.height;
        var perlinY = relativeLocation.y * perlinYRange;
        var perlinYIndex = Math.floor(perlinY % perlinYRange);

        //console.log('self.PerlinNoise:%O self.PerlinNoise.plane: %O perlinYIndex: %O, perlinXIndex: %O', self.PerlinNoise, self.PerlinNoise.plane, perlinYIndex, perlinXIndex);
        //console.log('perlinY:%O perlinYRange:%O Y:%O X:%O', perlinY, perlinYRange, perlinYIndex, perlinXIndex);
        var threshold = self.PerlinNoise.plane[perlinYIndex][perlinXIndex];
    
        if(Math.random() < threshold) passesFilter = false;

    	return passesFilter;
    }

    this.relativePositionInPlane = function relativePositionInPlane(xMin, xMax, yMin, yMax, positionX, positionY) {

        var relative = {};

        var xRange = xMax - xMin;
        var xLength = Math.abs(positionX - xMin);
        relative.x = 1 - (xLength / xRange);

        var yRange = yMax - yMin;
        var yLength = Math.abs(positionY - yMin);
        relative.y = yLength / yRange;

        return relative;
    }

    /*
    this.latlng2surface2DCluster = function mapping2DCluster(mapWidth, mapHeight, latitudeMin, latitudeMax, longitudeMin, longitudeMax, latitude, longitude) {
    	var latitudeRange = latitudeMax - latitudeMin;
    	var longitudeRange = longitudeMax - longitudeMin;

    	var latitudeBase0 = latitude - latitudeMin;
    	var latitudeRelativeToRange = latitudeBase0 / latitudeRange;
    	var latitudeClusterIndex = Math.floor(mapHeight * latitudeRelativeToRange);

    	var longitudeBase0 = longitude - longitudeMin;
    	var longitudeRelativeToRange = longitudeBase0 / longitudeRange;
    	var longitudeClusterIndex = Math.floor(mapHeight * latitudeRelativeToRange);

    	var cluster = {
    		i: latitudeClusterIndex,
    		j: longitudeClusterIndex
    	}

    	return cluster;
    }
    */

    this.table2csv = function table2csv(table, columns) {
        var csv = '';
        var csvRow;

        if (columns != undefined) csv += columns.join() + '\n'

        for (var i = 0; i < table.length; i++) {
            csvRow = table[i].join();
            csv += csvRow + '\n';
        }

        return csv;
    }

    this.init();
};

var DataGeneratorSingleton = new DataGenerator();

/**
 * @ngdoc service
 * @name reforMadApp.DataGenerator
 * @description
 * # DataGenerator
 * Service in the reforMadApp.
 */
angular.module('reforMadApp')
    .service('DataGenerator', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        return DataGeneratorSingleton;
    });