//angular.module('signup.app')
//    .controller('signupCtrl', ['$scope', function ($scope) {
//        //$scope.somedata = Math.random();
//    }])
//;
//
//
////Do this instead
//var SignUpController = function($scope){
//    var _this = this;
//
//    $scope.doStuff = function(){
//        _this.doStuff();
//    };
//};
//
//SignUpController.prototype.doStuff = function(){
//    //Really long function body
//};
//
//SignUpController.$inject = ['$scope'];
//
//angular.module('signup.app').controller('signupCtrl', SignUpController);




var Controller = (function () {
    function Controller($scope) {
        this.$scope = $scope;

        this.Positions = [
            {name:'Attack'},
            {name:'Midfield'},
            {name:'Longstick Midfield'},
            {name:'Defense'},
            {name:'Golie'},
            {name:'Other'},
        ];

        this.ParentFirstName = 'asd';
        this.ParentLasttName = 'werwe';
    }

    Controller.prototype.resetFields = function () {
        this.ParentFirstName = '';
        this.ParentLasttName = '';
        this.ParentPhone = '';
        this.ParentEmail = '';
        this.ParentEmailConfirm = '';
        this.PlayersFirstName = '';
        this.PlayersLastName = '';
        this.PlayersTeam = '';
        // reset position
        console.log("reset");
    };

    Controller.prototype.submitForm = function () {
        console.log("submit");
    };
    Controller.$inject = ['$scope'];
    return Controller;
})();
angular.module('signup.app').controller('signupCtrl', Controller);