angular.module('GradSite').directive('simpleAffix', ['$window', function ($window) {
    return {
        scope: {
            onAffix: "&",
            onUnaffix: "&"
        },
        restrict: 'A',
        link: function (scope, element, attrs) {
            var fixed = false;
            scope.onUnaffix()
            angular.element($window).bind("scroll", debounce(scrollHandler, 10));
            function scrollHandler() {
                scope.affixHeight = "innerHeight" in window
                    ? window.innerHeight
                    : document.documentElement.offsetHeight;
                scope.affixHeight = scope.affixHeight - 100;
                if (fixed == false && scope.affixHeight < $window.pageYOffset) {
                    fixed = true;
                    scope.$apply(scope.onAffix());
                    return
                }
                if (fixed == true && scope.affixHeight >= $window.pageYOffset) {
                    fixed = false;
                    scope.$apply(scope.onUnaffix());
                }
            };
        }
    };
}]);

function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };

        if (!timeout) func.apply(context, args);
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}