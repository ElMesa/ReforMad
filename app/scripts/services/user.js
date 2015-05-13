'use strict';

function User() {

    var self = this;

    this.init = function init() {
        self.position = {
            latitude: undefined,
            longitude: undefined,
            position_raw: undefined, //Holds navigator.geolocation.getCurrentPosition();
        }
    };

    this.locate = function locate() {
        self.locate_deferred = $.Deferred();

        if (navigator.geolocation) {

            var options = {
                enableHighAccuracy: true
            };

            navigator.geolocation.getCurrentPosition(self.locate_success, self.locate_error, options);
        } else {
            toastr['error']('Browser not capable of HTML5 geolocation');
        }

        return self.locate_deferred;
    };

    this.locate_success = function locate_success(position) {
        console.log('locateUser() - SUCCESS - position: %O', position);

        self.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            raw: position
        };

        self.locate_deferred.resolve(position);
    }

    this.locate_error = function locate_error(error) {
        self.locate_deferred.reject(error);
    }

    this.getPosition = function getPosition() {
    	var deferred = $.Deferred();

    	self.locate_deferred.done(function () {
    		deferred.resolve(self.position);
    	});

    	return deferred;
    }

    this.init();
}

var UserSingleton = new User();

/**
 * @ngdoc service
 * @name reforMadApp.User
 * @description
 * # User
 * Service in the reforMadApp.
 */
angular.module('reforMadApp')
    .service('User', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        return UserSingleton;
    });