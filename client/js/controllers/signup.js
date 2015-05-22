"use strict";

var Controller = (function () {
    function Controller($scope, NavigationService, DataService) {
        this.$scope = $scope;
        this.navigationService = NavigationService;
        this.dataService = DataService;

        this.Positions = [
            {name: 'select a position', value: 0},
            {name: 'Attack', value: 1},
            {name: 'Midfield', value: 2},
            {name: 'Longstick Midfield', value: 3},
            {name: 'Defense', value: 4},
            {name: 'Golie', value: 5},
            {name: 'Other', value: 6},
        ];
        this.Position = this.Positions[0];
    }

    Controller.prototype.resetFields = function () {
        this.dataService.getSignupParentsByEmail(this.ParentEmail).then(function(data){
            console.log(data);
        });

        //this.ParentFirstName = '';
        //this.ParentLasttName = '';
        //this.ParentPhone = '';
        //this.ParentEmail = '';
        //this.ParentEmailConfirm = '';
        //this.PlayersFirstName = '';
        //this.PlayersLastName = '';
        //this.PlayersTeam = '';
        //this.Position = this.Positions[0];
    };

    Controller.prototype.submitForm = function () {
        console.log("submit");
        // TODO: write to DB, proceed to package page
        this.dataService.saveSignupInfo()
            .then(function (res) {
                this.navigationService.redirectToPackages();
            }, function (err) {
                // TODO: err, do something now?
            });
    };

    Controller.prototype.areFieldsValid = function () {
        // TODO: highlight fields that are not valid, use a directive
        if ((this.ParentFirstName != null || this.ParentFirstName !== '') &&
            (this.ParentLasttName != null || this.ParentLasttName !== '') &&
            (this.ParentPhone != null || this.ParentPhone !== '') &&
            (this.ParentEmail != null || this.ParentEmail !== '') &&
            (this.ParentEmailConfirm != null || this.ParentEmailConfirm !== '') &&
            (this.PlayersFirstName != null || this.PlayersFirstName !== '') &&
            (this.PlayersLastName != null || this.PlayersLastName !== '') &&
            (this.PlayersTeam != null || this.PlayersTeam !== '') &&
            (this.Position.value != 0) &&
            (this.$scope.modalAddBranchForm.$valid)) {

            // If all fields are ready, could check to see if the names already exists.
            // debounce it

            return true;
        }
        return false;

    };
    Controller.$inject = ['$scope', 'NavigationService', 'DataService'];
    return Controller;
})();
angular.module('signup.app').controller('SignupCtrl', Controller);