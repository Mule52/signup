angular
    .module('signup.app', [
        'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            //.state('home', {
            //    url: '/',
            //    templateUrl: 'home.html',
            //    //controller: 'homeCtrl'
            //})
            //.state('about', {
            //    url: '/about',
            //    templateUrl: '/about.html',
            //    //controller: 'aboutCtrl'
            //})
            //.state('profile', {
            //    url: '/profile',
            //    templateUrl: '/profile.html',
            //    //controller: 'aboutCtrl'
            //})
            .state('signup', {
                url: '/',
                templateUrl: '/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'main'
            })
            //.state('package', {
            //    url: '/package',
            //    templateUrl: '/package.html',
            //    controller: 'aboutCtrl'
            //})
            //.state('payment', {
            //    url: '/payment',
            //    templateUrl: '/payment.html',
            //    controller: 'aboutCtrl'
            //})
            //.state('confirm', {
            //    url: '/confirm',
            //    templateUrl: '/confirm.html',
            //    controller: 'aboutCtrl'
            //})
    }])
;
