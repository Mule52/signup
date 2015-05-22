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
    //DataService.prototype.saveSignupInfo = function () {
    //    return this.$http.post(ContactsHelper.Url.GetLeadTypes, null).then(function (response) { return response.data; });
    //};

    DataService.prototype.getSignupParentsByEmail = function (parentEmail) {
        return this.$http.post(
            this.uriService.url.getSignupParentsByEmail, {parentEmail: parentEmail})
            .then(function (response) { return response.data; });
    };

    DataService.$inject = ["$http", "UriService"];
    return DataService;
})();
angular.module('signup.app').service('DataService', DataService);