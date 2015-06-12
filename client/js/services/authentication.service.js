"use strict";

var AuthenticationService = (function () {
    function AuthenticationService($http, UriService) {
        this.$http = $http;
        this.uriService = UriService;
    }

    AuthenticationService.prototype.logIn = function (email, password) {
        console.log("AuthenticationService logIn");
        return this.$http.post(
            this.uriService.url.login, {email: email, password: password})
            .then(function (response){
                // store token to reuse for next request
                debugger;
                return response.data;
            }, function(err){
                debugger;
                throw err;
            });
    };

    AuthenticationService.prototype.logOut = function () {
        console.log("AuthenticationService logOut");
        return this.$http.post(this.uriService.url.logout, {})
            .then(function (response) {
                return response.data;
            });
    };

    AuthenticationService.prototype.isAuthenticated = function () {
        return this.$http.post(this.uriService.url.isauth, {})
            .then(function (response) {
                return response.data;
            });
    };

    AuthenticationService.$inject = ['$http', 'UriService'];
    return AuthenticationService;
})();

angular.module('signup.app').service('AuthenticationService', AuthenticationService);