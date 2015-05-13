'use strict';

function Issue(API) {

	var self = this;

	this.init = function init() {
	}

	this.send = function send(user) {
		var deferred = $.Deferred();

		self.creation_date = moment().format('YYYY-MM-DD HH:mm:ss');

		user.getPosition().done(function (position) {
			self.latitude = position.latitude;
			self.longitude = position.longitude;

			var data = {
				latitude: self.latitude,
				longitude: self.longitude,
				creation_date: self.creation_date
			}

			var url = API.getBaseURL() + 'issues';
			
			$.ajax({
				type: "POST",
				url: url,
				data: JSON.stringify(data),
				//success: success,
				contentType: "application/json"
			}).done(function (data) {
				console.log('Service - Issue.send() - DONE - data: %O', data);
			}).fail(function () {
				console.log('Service - Issue.send() - FAIL');
			});
			/*
			$.post(url, {
					latitude: self.latitude,
					longitude: self.longitude
				}
				, "json"
			).done(function (data) {
				console.log('Service - Issue.send() - DONE - data: %O', data);
			}).fail(function () {
				console.log('Service - Issue.send() - FAIL');
			});
			*/
		});

		return deferred;
	}

	this.init();
}

/**
 * @ngdoc service
 * @name reforMadApp.Issue
 * @description
 * # Issue
 * Service in the reforMadApp.
 */
angular.module('reforMadApp')
  .service('Issue', ['API', function (API) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var IssueSingleton = new Issue(API);
    return IssueSingleton;
  }]);
