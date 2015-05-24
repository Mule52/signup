angular
    .module('signup.app', [
        'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'main'
            })

            // url will be nested (/signup/profile)
            .state('signup.profile', {
                url: '/profile',
                templateUrl: 'profile.html'
                //controller: 'SignupCtrl',
                //controllerAs: 'main'
            })

            // url will be nested (/signup/package)
            .state('signup.package', {
                url: '/package',
                templateUrl: 'package.html'
                //controller: 'SignupCtrl',
                //controllerAs: 'main'
            })

            // url will be nested (/signup/payment)
            .state('signup.payment', {
                url: '/payment',
                templateUrl: 'payment.html'
                //controller: 'SignupCtrl',
                //controllerAs: 'main'
            });

            // catch all, send users to the form page
            $urlRouterProvider.otherwise('/signup/profile');
    }])
;
