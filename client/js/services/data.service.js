"use strict";

var DataService = (function () {
    function DataService($http, UriService) {
        this.$http = $http;
        this.uriService = UriService;
    }

    //DataService.prototype.getUserInfo = function () {
    //    return this.$http.post(ContactsHelper.Url.GetLeadTypes, null).then(function (response) { return response.data; });
    //};
    //
    DataService.prototype.saveSignupProfile = function (parentEmail, parentFirstName, parentLastName, parentPhone,
                                                        playerFirstName, playerLastName, playerTeam, playerPosition) {
        return this.$http.post(
            this.uriService.url.saveSignupProfile, {
                parentEmail: parentEmail,
                parentFirstName: parentFirstName,
                parentLastName: parentLastName,
                parentPhone: parentPhone,
                playerFirstName: playerFirstName,
                playerLastName: playerLastName,
                playerTeam: playerTeam,
                playerPosition: playerPosition
            })
            .then(function (response) {
                return response.data;
            });
    };

    DataService.prototype.getSignupParentsByEmail = function (parentEmail) {
        return this.$http.post(
            this.uriService.url.getSignupParentsByEmail, {parentEmail: parentEmail})
            .then(function (response) {
                return response.data;
            });
    };

    DataService.prototype.doesParentPlayerExist =
        function (players, playerFirstName, playerLastName) {
            // if the player info matches any of the data.players, is dupe
            var found = _.find(players, function (p) {
                return p.first_name.toLowerCase() == playerFirstName.toLowerCase()
                    && p.last_name.toLowerCase() == playerLastName.toLowerCase();
            });
            return found ? true : false;
        };

    DataService.prototype.getPackages = function () {
        return this.$http.post(
            this.uriService.url.getPackages, {})
            .then(function (response) {
                if (response && response.data){
                    return response.data.packages;
                }
                return response.data;
            });
    };

    DataService.$inject = ["$http", "UriService"];
    return DataService;
})();
angular.module('signup.app').service('DataService', DataService);