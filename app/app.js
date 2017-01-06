angular.module('DEVE', ['ngRoute','ngTouch', 'ngMaterial','perfectParallax' ])
.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'app/templates/home.html',       
    })   
}).run(function ($rootScope, $http) {
    $rootScope.IsMobile = WURFL.is_mobile;
    
    var json = 'https://ipv4.myexternalip.com/json';
    $http.get(json).then(function (result) {
        $rootScope.IPAddress = result.data.ip;
    }, function (e) {
        console.log("Couldn't find IP");
    });

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