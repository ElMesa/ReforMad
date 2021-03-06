'use strict';

/**
 * @ngdoc function
 * @name reforMadApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the reforMadApp
 */
function Map() {

    var self = this;

    this.init = function init() {
        this.initDefaults();
        this.initTiles();
        this.initIcons();
        this.initMarkers();
        this.initPaths();

        this.setCenter(this.default.center);
    };

    this.initDefaults = function initDefaults() {
        this.default = {};
        this.default.center = {
            lat: 40.416955,
            lng: -3.703517,
            zoom: 11
        };
    };

    this.initTiles = function initTiles() {
        
        this.tiles = {
            osm: {
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                options: {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
            },
            mapboxDark: {
                url: "https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png",
                options: {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://www.mapbox.com/about/maps/">MapBox</a> contributors'
                }
            }
        }

        this.tiles.active = this.tiles.mapboxDark;

    }

    this.initIcons = function initIcons() {
        //var iconSize = [22, 31];

        /*
        iconUrl: 'img/leaf-green.png',
        shadowUrl: 'img/leaf-shadow.png',
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
         */

        this.icons = {};
        this.icons.template = {
            iconUrl: 'trashcan-icon.png',
            iconSize: [32, 42],
            //iconSize: iconSize,
            //iconAnchor: [(iconSize[0] / 2), iconSize[1]],
            //popupAnchor: [0, -iconSize[1]]
            //type: 'awesomeMarker',
            //prefix: 'fa',
            //icon: 'check',
            //markerColor: 'green'
        };

        //this.icons.issue.state.INPROGRESS.icon = 'cog';
        //this.icons.issue.state.INPROGRESS.markerColor = 'orange';
        //this.icons.issue.state.INPROGRESS.spin = true;
        //this.icons.issue.state.INPROGRESS.extraClasses = 'colorYellow';

        this.icons.userLocation = {};
        this.icons.userLocation.icon = 'check';
        this.icons.userLocation.markerColor = 'green';
    };

    this.iconNew = function iconNew(iconOverride) {
        var iconTemplateOverrided = $.extend({}, self.icons.template, iconOverride);
        return iconTemplateOverrided;
    };

    this.initMarkers = function initMarkers() {
        self.markers = {};
        self.markers.active = {};

        self.markers.template = {
            lat: undefined,
            lng: undefined,
            icon: self.iconNew(), //self.icons.template
            message: '<p>Para confirmar que hay suciedad a tu alrededor pulsa al botón inferior</p>',
            //draggable: true,
            //data: {} //Custom data holder
        }
    };

    this.markerNew = function markerNew(markerOverride) {
        var templateOverrided = $.extend({}, self.markers.template, markerOverride);
        return templateOverrided;
    };

    this.markerSet = function markerSet(marker) {
        var settedMarker = undefined;
        if (marker != undefined && marker.id != undefined && self.markers != undefined) {
            self.markers[marker.id] = marker;
            settedMarker = marker;
        }
        return settedMarker
    };

    this.markerActivate = function markerActivate(markerId) {
        if (markerId != undefined && self.markers != undefined && self.markers[markerId] != undefined && self.markers.active != undefined) {
            self.markers.active[markerId] = self.markers[markerId];
        }
    };

    this.initPaths = function initPaths() {
        self.paths = {};
        self.paths.active = {};

        self.paths.template = {
            type: "circle",
            radius: 30,
            weight: 1,
            //fillColor: 'green',
            //latlngs: 
        }
    }

    this.pathNew = function pathNew(override) {
        var templateOverrided = $.extend({}, self.paths.template, override);
        return templateOverrided;
    };

    this.pathSet = function markerSet(path) {
        var settedPath = undefined;
        if (path != undefined && path.id != undefined && self.paths != undefined) {
            self.paths[path.id] = path;
            settedPath = path;
        }
        return settedPath
    };

    this.pathActivate = function pathActivate(id) {
        if (id != undefined && self.paths != undefined && self.paths[id] != undefined && self.paths.active != undefined) {
            self.paths.active[id] = self.paths[id];
        }
    };

    this.setCenter = function setCenter(center) {
        var defaultOverride;
        self.center = $.extend(defaultOverride, self.default.center, center);
        return self.center;
    };

    this.init();
};

function MapReforMad() {

    var self = this;

    this.init = function init() {
        this.map = new Map();
    };

    this.updateUserLocation = function updateUserLocation(navigatorPosition) {
        var leafletCenter = {
            lat: navigatorPosition.coords.latitude,
            lng: navigatorPosition.coords.longitude,
            zoom: 18
        }

        self.map.setCenter(leafletCenter);

        var markerId = 'userLocation';
        var leafletMarker = {
            id: markerId,
            lat: navigatorPosition.coords.latitude,
            lng: navigatorPosition.coords.longitude,
        }
        leafletMarker = self.map.markerNew(leafletMarker);
        self.map.markerSet(leafletMarker);
        self.map.markerActivate(markerId);

        var pathId = 'locationAccuracy';
        var leafletPath = {
            id: pathId,
            latlngs: {
                lat: navigatorPosition.coords.latitude,
                lng: navigatorPosition.coords.longitude
            },
            radius: navigatorPosition.coords.accuracy
        }
        leafletPath = self.map.pathNew(leafletPath);
        self.map.pathSet(leafletPath);
        //self.map.pathActivate(pathId);
    };

    this.init();
};

function initToastr() {
    toastr.options = {
        //"closeButton": true,
        //"positionClass": "toast-bottom-full-width",
        "showDuration": "300",
        //"hideDuration": "0",
        //"extendedTimeOut": "0",
        //"timeOut": "0",
    }
}

angular.module('reforMadApp')
    .controller('MapCtrl', ['$scope', '$http', 'User', function($scope, $http, User) {

        initToastr();

        $scope.reformadMap = new MapReforMad();

        //$scope.user = new User();
        $scope.user = User;

        $scope.testToastId = toastr['info']('Buscando el lugar a limpiar, por favor, espere.');

        $scope.userLocation = undefined;
        var deferred = $scope.user.locate();
        deferred.done(function(position) {
            console.log('MapCtrl - locateUser() - PROMISE SUCCESS - position: %O', position);
            //toastr['success']('Located with ' + position.coords.accuracy + ' meters accuracy');
            toastr['success']('Listo! Ya puedes pedir que limpien este lugar');

            $scope.reformadMap.updateUserLocation(position);

            $scope.$apply();
        });
        deferred.fail(function(error) {
            toastr['error']('No ha sido posible localizar el lugar a limpiar, disculpe las molestias.');
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    //toastr['error']('User did not share geolocation data\nERROR: ' + error.message);
                    break;
                case error.POSITION_UNAVAILABLE:
                    //toastr['error']('Could not detect current position\nERROR: ' + error.message);
                    break;
                case error.TIMEOUT:
                    //toastr['error']('Retrieving position timed out\nERROR: ' + error.message);
                    break;
                default:
                    //toastr['error']('Unknown error\nERROR: ' + error.message);
                    break;
            }
        });

        $scope.twitterLogin = function() {

            var auth_host = "http://localhost:8080";
            var auth_requestTokenURL = auth_host + '/auth/requestToken';

            $http.get(auth_requestTokenURL).success(function(data, status, headers, config) {
                window.location = data;
            });
        }

    }]);

/*
circle: {
                    type: "circle",
                    radius: 500 * 1000,
                    latlngs: europeCapitals.Brussels
                }
circleMarker: {
                    type: "circleMarker",
                    radius: 50,
                    latlngs: europeCapitals.Rome
                }
 */