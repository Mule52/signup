"use strict";

var Controller = (function () {
    function Controller($scope, NavigationService, DataService, $timeout) {
        this.$scope = $scope;
        this.navigationService = NavigationService;
        this.dataService = DataService;
        this.$timeout = $timeout;
        this.parentFromDb = null;
        this.playersFromDb = null;

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

    Controller.prototype.onPlayerNameChange = function () {
        // call to db to see if this player is valid
        if (this.playersFromDb){
            var firstName = this.PlayerFirstName ? this.PlayerFirstName.toLowerCase() : '';
            var lastName = this.PlayerLastName ? this.PlayerLastName.toLowerCase() : ''
            var fullName = firstName + " " + lastName;
            var found = _.find(this.playersFromDb, function(x){
                return x.fullName.toLowerCase() == fullName;
            });

            if (found){
                // dupe
                this.hasErrors = true;
                this.hasNameErrors = true;
                this.errors = "A player with this name already exists in our system associated with the parent email address of "
                    + this.ParentEmail + ".";
                this.$scope.signupForm.PlayerFirstName.$setValidity("PlayerFirstName", false);
                this.$scope.signupForm.PlayerLastName.$setValidity("PlayerLastName", false);
            } else {
                this.hasErrors = false;
                this.hasNameErrors = false;
                this.errors = null;
                this.$scope.signupForm.PlayerFirstName.$setValidity("PlayerFirstName", true);
                this.$scope.signupForm.PlayerLastName.$setValidity("PlayerLastName", true);
            }
        }
    };

    Controller.prototype.onParentEmailChange = _.debounce(function () {
        // See if any parents exist in the DB with this email address, if so
        // persist it to verify other fields like player first and last name.
        var self = this;
        this.dataService.getSignupParentsByEmail(this.ParentEmail).then(function(data) {
            self.parentFromDb = data.parent;
            self.playersFromDb = data.players;
        });
    }, 1000);

    Controller.prototype.onParentConfirmEmailChange = _.debounce(function () {
        var self = this;
        this.$timeout(function(){
            if (self.ParentEmail != self.ParentEmailConfirm){
                self.hasErrors = true;
                self.hasEmailErrors = true;
                self.errors = "The email addresses must match and must be valid.";
                self.$scope.signupForm.ParentEmail.$setValidity("ParentEmail", false);
                self.$scope.signupForm.ParentEmailConfirm.$setValidity("ParentEmailConfirm", false);
            } else {
                self.hasErrors = false;
                self.hasEmailErrors = false;
                self.errors = null;
                self.$scope.signupForm.ParentEmail.$setValidity("ParentEmail", true);
                self.$scope.signupForm.ParentEmailConfirm.$setValidity("ParentEmailConfirm", true);
            }
        });
    }, 1000);

    Controller.prototype.resetFields = function () {
        //var self = this;
        //this.dataService.getSignupParentsByEmail(this.ParentEmail).then(function(data){
        //    console.log(data);
        //
        //    if (data && data.parent && data.players && self.PlayerFirstName && self.PlayerLastName &&
        //        self.dataService.doesParentPlayerExist(data.players, self.PlayerFirstName, self.PlayerLastName)){
        //        self.hasErrors = true;
        //        self.hasNameErrors = true;
        //        self.errors = "A player with this name already exists in our system associated with the parent email address of "
        //            + self.ParentEmail + ".";
        //        this.$scope.signupForm.ParentEmailConfirm.$setValidity("ParentEmailConfirm", false);
        //
        //    } else {
        //        self.hasErrors = false;
        //        self.hasNameErrors = false;
        //        self.errors = null;
        //    }
        //});

        this.ParentFirstName = '';
        this.ParentLasttName = '';
        this.ParentPhone = '';
        this.ParentEmail = '';
        this.ParentEmailConfirm = '';
        this.PlayerFirstName = '';
        this.PlayerLastName = '';
        this.PlayerTeam = '';
        this.Position = this.Positions[0];
    };

    Controller.prototype.submitForm = function () {
        console.log("submit");
        // TODO: write to DB, proceed to package page
        this.dataService.saveSignupInfo(
            this.ParentEmail,
            this.ParentFirstName,
            this.ParentLasttName,
            this.ParentPhone,
            this.PlayerFirstName,
            this.PlayerLastName,
            this.PlayerTeam,
            this.Position)
            .then(function (res) {
                console.log(res);
                this.navigationService.redirectToPackages();
            }, function (err) {
                // TODO: err, do something now?
                console.log(err);
            });
    };

    Controller.prototype.areFieldsValid = function () {
        if ((this.ParentFirstName != null || this.ParentFirstName !== '') &&
            (this.ParentLasttName != null || this.ParentLasttName !== '') &&
            (this.ParentPhone != null || this.ParentPhone !== '') &&
            (this.ParentEmail != null || this.ParentEmail !== '') &&
            (this.ParentEmailConfirm != null || this.ParentEmailConfirm !== '') &&
            (this.PlayersFirstName != null || this.PlayersFirstName !== '') &&
            (this.PlayersLastName != null || this.PlayersLastName !== '') &&
            (this.PlayersTeam != null || this.PlayersTeam !== '') &&
            (this.Position.value != 0) &&
            (this.$scope.signupForm.$valid)) {
            return true;
        }
        return false;
    };

    Controller.$inject = ['$scope', 'NavigationService', 'DataService', '$timeout'];
    return Controller;
})();
angular.module('signup.app').controller('SignupCtrl', Controller);