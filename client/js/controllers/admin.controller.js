"use strict";

var Controller = (function () {
    function Controller($scope) {
        this.$scope = $scope;

    }

    Controller.prototype.onPlayerNameChange = function () {
    };

    Controller.$inject = ['$scope'];
    return Controller;
})();
angular.module('signup.app').controller('AdminCtrl', Controller);