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

    DataService.prototype.isEmailInUse = function (parentEmail) {
        return this.$http.post(ContactsHelper.Url.GetLeadTypes, parentEmail).then(function (response) { return response.data; });
    };

    //
    //this.getLeadContact = function (leadContactUID) {
    //    return IESafeGet(WorkflowLeadDetailsHelper.Url.GetLeadContact + '?leadContactUID=' + leadContactUID).then(function (response) {
    //        return response.data;
    //    });
    //};
    //this.saveLeadData = function (createRoleViewModel) {
    //    return $http.post(WorkflowLeadDetailsHelper.Url.SaveLeadData, createRoleViewModel).then(function (response) {
    //        return response.data;
    //    });
    //};
    //this.createRole = function (createRoleViewModel) {
    //    return $http.post(MembersRoleHelper.Url.Create, createRoleViewModel).then(function (response) {
    //        return response.data;
    //        // Object {success: true, RoleUID: 32274, editUrl: "/Members/Role/Edit?id=32274"}
    //    });
    //};


    DataService.$inject = ["$http"];
    return DataService;
})();
angular.module('signup.app').service('DataService', DataService);