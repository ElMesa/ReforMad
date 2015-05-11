'use strict';

/**
 * @ngdoc function
 * @name reforMadApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the reforMadApp
 */

function User() {

    var self = this;

    this.init = function init() {

    };

    this.locate = function locate() {
        var deferred = $.Deferred();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                console.log('locateUser() - SUCCESS - position: %O', position);
                toastr['success']('Located with ' + position.coords.accuracy + ' meters accuracy');
                deferred.resolve(position);
            }, function handle_errors(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        toastr['error']('User did not share geolocation data\nERROR: ' + error.message);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        toastr['error']('Could not detect current position\nERROR: ' + error.message);
                        break;
                    case error.TIMEOUT:
                        toastr['error']('Retrieving position timed out\nERROR: ' + error.message);
                        break;
                    default:
                        toastr['error']('Unknown error\nERROR: ' + error.message);
                        break;
                }
            });
        } else {
            toastr['error']('Browser not capable of HTML5 geolocation');
        }

        return deferred;
    };

    this.init();
}

function locateUser() {
    var deferred = $.Deferred();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function success(position) {
            console.log('locateUser() - SUCCESS - position: %O', position);
            toastr['success']('Located with ' + position.coords.accuracy + ' meters accuracy');
            deferred.resolve(position);
        }, function handle_errors(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert('user did not share geolocation data');
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert('could not detect current position');
                    break;

                case error.TIMEOUT:
                    alert('retrieving position timed out');
                    break;

                default:
                    alert('unknown error');
                    break;
            }
        });
    } else {
        console.log('Warning: Not geolocation capable');
    }

    return deferred;
};

/*

 */

function Map() {

    var self = this;

    this.init = function init() {
        this.initDefaults();
        this.initIcons();
        this.initMarkers();

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

    this.initIcons = function initIcons() {
        //var iconSize = [22, 31];

        this.icons = {};
        this.icons.template = {
            //iconSize: iconSize,
            //iconAnchor: [(iconSize[0] / 2), iconSize[1]],
            //popupAnchor: [0, -iconSize[1]]
            type: 'awesomeMarker',
            prefix: 'fa',
            icon: 'check',
            markerColor: 'green'
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
            message: '<p>Drag the marker to the exact location</p>',
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
            zoom: 15
        }

        self.map.setCenter(leafletCenter);

        var markerId = 'userLocation';
        var leafletMarker = {
            id: markerId,
            lat: navigatorPosition.coords.latitude,
            lng: navigatorPosition.coords.longitude,
        }
        self.map.markerSet(leafletMarker);
        self.map.markerActivate(markerId);
    };

    this.init();
};

angular.module('reforMadApp')
    .controller('MapCtrl', ['$scope', function($scope) {

        $scope.reformadMap = new MapReforMad();

        $scope.userLocation = undefined;
        var deferred = locateUser();
        deferred.done(function(position) {
            console.log('MapCtrl - locateUser() - PROMISE SUCCESS - position: %O', position);
            /*
            $scope.userLocation = position;

            var leafletCenter = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 15
            }

            $scope.map.setCenter(leafletCenter);
            */

            $scope.reformadMap.updateUserLocation(position);

            $scope.$apply();
        });

    }]);