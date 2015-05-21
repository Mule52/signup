"use strict";

var DataService = (function () {
    function DataService($http) {
        this.$http = $http;
    }

    DataService.prototype.getUserInfo = function () {
        return this.$http.post(ContactsHelper.Url.GetLeadTypes, null).then(function (response) { return response.data; });
    };

    DataService.prototype.saveSignupInfo = function () {
        return this.$http.post(ContactsHelper.Url.GetLeadTypes, null).then(function (response) { return response.data; });
    };

    DataService.$inject = ["$http"];
    return DataService;
})();
angular.module('signup.app').service('DataService', DataService);