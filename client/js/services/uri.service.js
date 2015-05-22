"use strict";

var UriService = (function () {
    function UriService() {
    }

    UriService.prototype.url = {
        getSignupParentsByEmail: '/signup/email'
    } ;

    UriService.$inject = [];
    return UriService;
})();
angular.module('signup.app').service('UriService', UriService);