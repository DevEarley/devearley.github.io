angular.module('DEVE', ['ngRoute','ngTouch', 'ngMaterial' ])
.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'app/templates/home.html',
        })
        .when('/blog', {
            templateUrl: 'app/templates/blog.html',
        }).when('/blog/angularjs-typescript-1', {
            templateUrl: 'app/templates/blogs/angularjs-typescript-1.html',
        }).when('/blog/angularjs-typescript-2', {
            templateUrl: 'app/templates/blogs/angularjs-typescript-2.html',
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