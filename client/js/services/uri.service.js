"use strict";

var UriService = (function () {
    function UriService() {
    }

    UriService.prototype.url = {
        getSignupParentsByEmail: '/signup/get/email',
        getPackages: '/signup/get/packages',
        saveSignupProfile: '/signup/save/profile'
    } ;

    UriService.$inject = [];
    return UriService;
})();
angular.module('signup.app').service('UriService', UriService);