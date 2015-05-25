"use strict";

var Controller = (function () {
    function Controller($scope, NavigationService, DataService, $timeout, $state) {
        this.$scope = $scope;
        this.navigationService = NavigationService;
        this.dataService = DataService;
        this.$timeout = $timeout;
        this.$state = $state;
        this.parentFromDb = null;
        this.playersFromDb = null;
        this.packages = [];
        this.selectedPackage = null;

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

        var self = this;
        this.dataService.getPackages().then(function(result){
            self.packages = result;
        })
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
                this.hasProfileErrors = true;
                this.hasNameErrors = true;
                this.errors = "A player with this name already exists in our system associated with the parent email address of "
                    + this.ParentEmail + ".";
                this.$scope.signupForm.PlayerFirstName.$setValidity("PlayerFirstName", false);
                this.$scope.signupForm.PlayerLastName.$setValidity("PlayerLastName", false);
            } else {
                this.hasProfileErrors = false;
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
                self.hasProfileErrors = true;
                self.hasEmailErrors = true;
                self.errors = "The email addresses must match and must be valid.";
                self.$scope.signupForm.ParentEmail.$setValidity("ParentEmail", false);
                self.$scope.signupForm.ParentEmailConfirm.$setValidity("ParentEmailConfirm", false);
            } else {
                self.hasProfileErrors = false;
                self.hasEmailErrors = false;
                self.errors = null;
                self.$scope.signupForm.ParentEmail.$setValidity("ParentEmail", true);
                self.$scope.signupForm.ParentEmailConfirm.$setValidity("ParentEmailConfirm", true);
            }
        });
    }, 1000);

    Controller.prototype.resetFields = function () {
        this.ParentFirstName = '';
        this.ParentLasttName = '';
        this.ParentPhone = '';
        this.ParentEmail = '';
        this.ParentEmailConfirm = '';
        this.PlayerFirstName = '';
        this.PlayerLastName = '';
        this.PlayerTeam = '';
        this.Position = this.Positions[0];
        this.selectedPackage = '';

        this.hasProfileErrors = false;
        this.errors = null;
        this.hasNameErrors = false;
        this.$scope.signupForm.PlayerFirstName.$setValidity("PlayerFirstName", true);
        this.$scope.signupForm.PlayerLastName.$setValidity("PlayerLastName", true);
        this.hasEmailErrors = false;
        this.$scope.signupForm.ParentEmail.$setValidity("ParentEmail", true);
        this.$scope.signupForm.ParentEmailConfirm.$setValidity("ParentEmailConfirm", true);
    };

    Controller.prototype.submitForm = function () {
        console.log("submit");
    };

    Controller.prototype.isPackageSelected = function () {
        return this.selectedPackage != null;
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

    Controller.prototype.onProfileClick = function (nextView) {
        var self = this;
        this.dataService.saveSignupProfile(
            this.ParentEmail,
            this.ParentFirstName,
            this.ParentLasttName,
            this.ParentPhone,
            this.PlayerFirstName,
            this.PlayerLastName,
            this.PlayerTeam,
            this.Position.name)
            .then(function (res) {
                // Parent/Player info saved, redirect to next view
                if (res.errors){
                    var errs = [];
                    _.each(res.errors, function(e){
                       errs.push(e.type + " " + e.message);
                    });
                    self.hasProfileErrors = true;
                    self.errors = "Failed to save the profile information due to: " + errs.join('') + ".";
                } else {
                    self.hasProfileErrors = false;
                    self.errors = null;
                    self.$state.go(nextView);
                }
            }, function (err) {
                // TODO: err, do something now?
                console.log(err);
                self.hasProfileErrors = true;
                self.errors = "Failed to save the profile information due to: "
                    + err.status + " " + err.statusText + ".";
            });
    };

    Controller.prototype.getSelectedLabelClass = function (title) {
        return this.selectedPackage && this.selectedPackage.title == title ? 'selected-label' : '';
    };

    Controller.$inject = ['$scope', 'NavigationService', 'DataService', '$timeout', '$state'];
    return Controller;
})();
angular.module('signup.app').controller('SignupCtrl', Controller);