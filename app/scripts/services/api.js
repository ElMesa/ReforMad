'use strict';

function API () {

	var self = this;

	this.init = function init() {
		self.initHosts();
		self.setHost('heroku');
	}

	this.initHosts = function initHosts() {
		self.hosts = {
			local: 'http://localhost:8080/',
			heroku: 'https://reformad-api.herokuapp.com/'
		};
	}

	this.setHost = function setHost(name) {
		if(self.hosts != undefined && self.hosts[name] != undefined) {
			self.host = self.hosts[name];
			console.log('Service - API - Host set to: %O', self.host);
		}
	}

	this.getBaseURL = function getBaseURL () {
		return self.host;
	}

	this.init();
}

var APISingleton = new API();

/**
 * @ngdoc service
 * @name reforMadApp.API
 * @description
 * # API
 * Service in the reforMadApp.
 */
angular.module('reforMadApp')
  .service('API', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return APISingleton;
  });
