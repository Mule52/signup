"use strict";

var Controller = (function () {
    function Controller($scope, AuthenticationService, DataService, $state, $window) {
        this.$scope = $scope;
        this.$state = $state;
        this.$window = $window;
        this.authenticationService = AuthenticationService;
        this.dataService = DataService;
    }

    Controller.prototype.areFieldsValid = function () {
        return this.email !== undefined && this.password !== undefined ? true : false;
    };

    Controller.prototype.submitForm = function () {
        if (this.email !== undefined && this.password !== undefined) {

            var self = this;
            this.authenticationService.logIn(this.email, this.password)
                .then(function(res){
                    console.log(res);
                    self.$window.sessionStorage.token = res.token;
                    self.hasLoginErrors = false;
                    self.errors = null;
                    self.$state.go('admin');
                    //Object {success: true, message: "Enjoy your token!",
                    //    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZ…1MzR9.nkTsb9gENG1nljDo6bJw86lq0pN7HGUdm2xK4srs

                }, function(err){
                    console.log(err);
                    // Erase the token if the user fails to log in
                    delete self.$window.sessionStorage.token;
                    self.hasLoginErrors = true;
                    self.errors = "Invalid email or password. Please try again.";
                });
        }
    };

    Controller.prototype.testAuth = function () {
        this.authenticationService.isAuthenticated()
            .then(function(res){
                console.log(res);
            }, function(err){
                console.log(err);
            });
    };

    Controller.$inject = ['$scope', 'AuthenticationService', 'DataService', '$state', '$window'];
    return Controller;
})();
angular.module('signup.app').controller('LoginCtrl', Controller);