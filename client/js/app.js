angular
    .module('signup.app', [
        'ui.router'
    ])
    .config(['$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push(function ($q, $rootScope, $window) {
                return {
                    request: function (config) {
                        config.headers = config.headers || {};
                        if ($window.sessionStorage.token) {
                            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                        }
                        return config;
                    },
                    response: function (response) {
                        if (response.status === 401) {
                            // handle the case where the user is not authenticated
                            console.log("401 error, what do we do now?");
                        }
                        return response || $q.when(response);
                    }
                }
            });
        }
    ])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function ($urlRouterProvider, $stateProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            //var authenticated = ['$q', 'Auth', function ($q, Auth) {
            //    var deferred = $q.defer();
            //    Auth.isLoggedIn(false)
            //        .then(function (isLoggedIn) {
            //            if (isLoggedIn) {
            //                deferred.resolve();
            //            } else {
            //                deferred.reject('Not logged in');
            //            }
            //        });
            //    return deferred.promise;
            //}];

            $stateProvider
                .state('login', {
                    url: '/login',
                    //templateUrl: 'login.html',
                    //controller: 'LoginCtrl',
                    //controllerAs: 'main'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'admin.html',
                    controller: 'AdminCtrl',
                    controllerAs: 'main',
                    requiresAuthentication: true
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'signup.html',
                    controller: 'SignupCtrl',
                    controllerAs: 'main'
                    //redirectTo: 'signup.intro',
                })
                // url will be nested (/signup/profile)
                .state('signup.intro', {
                    url: '/intro',
                    templateUrl: 'intro.html'
                })
                // url will be nested (/signup/profile)
                .state('signup.profile', {
                    url: '/profile',
                    templateUrl: 'profile.html'
                })
                // url will be nested (/signup/package)
                .state('signup.package', {
                    url: '/package',
                    templateUrl: 'package.html'
                })
                // url will be nested (/signup/payment)
                .state('signup.payment', {
                    url: '/payment',
                    templateUrl: 'payment.html'
                })
                // url will be nested (/signup/terms)
                .state('signup.terms', {
                    url: '/terms',
                    templateUrl: 'terms.html'
                })
                // url will be nested (/signup/privacy)
                .state('signup.privacy', {
                    url: '/privacy',
                    templateUrl: 'privacy.html'
                })
            ;

            // catch all, send users to the form page
            $urlRouterProvider.otherwise('/signup/intro');
        }
    ])
    .run(function ($rootScope, $state, $window, $location) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            //if (toState.redirectTo) {
            //    console.log("redirecting to " + toState.redirectTo);
            //    event.preventDefault();
            //    $state.go(toState.redirectTo, toParams);
            //}
            if (toState.requiresAuthentication) {
                //console.log("redirecting to " + toState.redirectTo);
                console.log("private path");
                var token = $window.sessionStorage.token;

                // valid token means they are logged in
                if (!token) {
                    $state.go("login", toParams); // default
                    return;
                }

            } else {
                console.log("public path");
            }
        });
        $rootScope.$on('$stateChangeError', function (err, req) {
            //$state.go('login');
            //$location.path('/login');
            window.location = '/login'; // foreced redirect outside of states
        });
        $rootScope.$on('$stateChangeSuccess', function (success, req) {
            console.log("stateChangeSuccess for url " + req.url);
        });
    });
;
