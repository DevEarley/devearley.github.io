angular.module('CC0Gallery', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'content/views/login/landing.html',
            controller: 'landingController',
            controllerAs: 'vm'
        });

    $locationProvider.html5mode = true;

}).run(function ($rootScope, $http, $location) {
    $http.defaults.url = "localhost:1234";
});