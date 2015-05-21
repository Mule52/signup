"use strict";

var NavigationService = (function () {
    function NavigationService() {
    }
    NavigationService.prototype.redirectToPackages = function () {
        console.log("redirecting");

    };
    return NavigationService;
})();
angular.module('signup.app').service('NavigationService', NavigationService);