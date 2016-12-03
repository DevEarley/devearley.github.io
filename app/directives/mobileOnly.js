angular.module('DEVE').directive('mobileOnly', function ($timeout, $rootScope, $parse) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (!$rootScope.IsMobile) {
                element[0].style.display = "none";
            }
            //element.clas $rootScope.IsMoblie
        }
    };
});

angular.module('DEVE').directive('desktopOnly', function ($timeout, $rootScope, $parse) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if ($rootScope.IsMobile) {
                element[0].style.display = "none";
            }
            //element.clas $rootScope.IsMoblie
        }
    };
});