angular
    .module('signup.app')

    // TODO: Check the validity of the pattern - how is this differnet than ngPattern?
    .directive("rpattern", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModel) {
                elem.bind('blur', function(){
                    var pattern = attrs.rpattern;
                    var regex = new RegExp(pattern.substr(1, pattern.length - 2));
                    var value = ngModel.$viewValue;
                    if (value == null || value === "" || regex.test(value)){
                        ngModel.$setValidity('pattern', true);
                        return value;
                    }
                    else {
                        ngModel.$setValidity('pattern', false);
                    }
                });
            }
        };
    })
;