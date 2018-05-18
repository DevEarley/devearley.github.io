angular.module('DEVE', ['ngRoute','ngTouch', 'ngMaterial' ])
.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'app/templates/home.html',
        })
        .when('/mockups', {
            templateUrl: 'app/templates/mockups.html',
        })
        .when('/mockups/web', {
            templateUrl: 'app/templates/mockups-web-apps.html',
        })
        .when('/mockups/web-2', {
            templateUrl: 'app/templates/mockups-web-apps-2.html',
        })
        .when('/mockups/iot', {
            templateUrl: 'app/templates/mockups-iot.html',
        })
        .when('/mockups/mobile', {
            templateUrl: 'app/templates/mockups-mobile.html',
        })
        .when('/mockups/windows', {
            templateUrl: 'app/templates/mockups-windows.html',
        })
        .when('/mockups/design-doc', {
            templateUrl: 'app/templates/mockups-design-doc.html',
        })
        .when('/blog', {
            templateUrl: 'app/templates/blog.html',
        }).when('/blog/angularjs-typescript-1', {
            templateUrl: 'app/templates/blogs/angularjs-typescript-1.html',
        }).when('/blog/angularjs-typescript-2', {
            templateUrl: 'app/templates/blogs/angularjs-typescript-2.html',
        }).when('/blog/angularjs-typescript-3', {
            templateUrl: 'app/templates/blogs/angularjs-typescript-3.html',
        })
}).run(function ($rootScope, $http) {

    toastr.options = {
        "positionClass": "toast-bottom-right",
        "showDuration": "0",
        "hideDuration": "0",
        "timeOut": "4000",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "swing",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.options.newestOnTop = false;

});

angular.module('DEVE').filter('unsafe', function ($sce) { return $sce.trustAsHtml; });