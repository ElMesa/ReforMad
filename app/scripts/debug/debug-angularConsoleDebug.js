//Helpers to ease angular console debugging

var DEBUG = DEBUG || {};

(function() {

    DEBUG.angularScope = new function angularScope() {

        this.targetScopeId = "view_mainContent";
        this.scopeActive = undefined; //The actual angular scope gathered

        this.get = function get(attribute) {
            var getted;

            if (this._scopeCheckAndGather()) {
                getted = this.scopeActive[attribute];
            }

            return getted;
        }

        //Setter for angular scopes. Includes aplying changes to update bindings (So views react acordinglly and enables a rough debugging)
        this.set = function set(attribute, value) {
            if (this._scopeCheckAndGather()) {
                this.scopeActive[attribute] = value;
                this.scopeActive.$apply();
            }
        }

        //Boolean switch for scope attributes
        this.toggle = function toggle(attribute) {
            if (this._scopeCheckAndGather()) {
                var oldValue = this.scopeActive[attribute];
                this.set(attribute, !oldValue);
            }
        }

        this.list = function list() {
            var listedAttributes = {};

            if (this._scopeCheckAndGather()) {

                for (attributeName in this.scopeActive) {
                    if (attributeName[0] != '$') {
                        listedAttributes[attributeName] = this.scopeActive[attributeName];
                    }
                }

            }

            return listedAttributes;
        }

        this.debugEvents = function debugEvents() {
            if (this._scopeCheckAndGather()) {
                var issueBO = this.scopeActive.issueBO;
                var eventTemplate = issueBO.model.events[0];

                event1 = this._clone(eventTemplate);
                event2 = this._clone(eventTemplate);
                event3 = this._clone(eventTemplate);

                event1.type = 'STATE_CHANGE_PENDING';
                event2.type = 'STATE_CHANGE_INPROGRESS';
                event3.type = 'STATE_CHANGE_DONE';

                issueBO.model.events.push(event1);
                issueBO.model.events.push(event2);
                issueBO.model.events.push(event3);

                issueBO.updateViewData();

                this.scopeActive.$apply();
            }
        }

        this.debugLastModifiedDate = function debugLastModifiedDate() {
            if (this._scopeCheckAndGather()) {
                var issue;
                var issueEditing;

                if(this.scopeActive.issue && this.scopeActive.issue.models && this.scopeActive.issue.models.issue) issue = this.scopeActive.issue.models.issue;
                if(this.scopeActive.issueEditing && this.scopeActive.issueEditing.models && this.scopeActive.issueEditing.models.issue) issueEditing = this.scopeActive.issueEditing.models.issue;

                if(issue.lastModifiedDate) console.log('debugLastModifiedDate() - issue       : %O', Date(issue.lastModifiedDate));
                if(issueEditing.lastModifiedDate) console.log('debugLastModifiedDate() - issueEditing: %O', Date(issueEditing.lastModifiedDate));
                
            }
        }

        this._scopeCheckAndGather = function _scopeCheckAndGather() {
            var done = true;

            if (this.scopeActive == undefined) this._scopeGather();
            if (this.scopeActive == undefined) {
                done = false;
                console.log("DEBUG.angularScope._scopeCheckAndGather() - Error - No scope gathered.");
            }

            return done;
        }

        this._scopeGather = function _scopeGather() {
            var targetDOM = document.getElementById(this.targetScopeId);
            this.scopeActive = angular.element(targetDOM).scope();
        }

        this._clone = function clone(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }

    }

})();

