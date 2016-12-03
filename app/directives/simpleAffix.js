angular.module('DEVE').directive('simpleAffix', ['$window', function ($window) {
    return {
        scope: {
            onAffix: "&",
            onUnaffix: "&",
            affixHeight: "=",
        },
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element, attrs) {
            var fixed = false;
            angular.element($window).bind("scroll", function () {
                if (fixed == false && scope.affixHeight < $window.pageYOffset) {
                    fixed = true;
                    scope.$apply(scope.onAffix());
                }
                if (fixed == true && scope.affixHeight >= $window.pageYOffset) {
                    fixed = false;
                    scope.$apply(scope.onUnaffix());
                }
            });

        }
    };
}]);


angular.module('DEVE').directive('elementAffix', ['$window', function ($window) {
    return {
        scope: {
            onAffix: "&",
            onUnaffix: "&",
            offset: "=",
        },
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element, attrs) {
            var fixed = false;
            scope.affixHeight = elmYPosition(element) + scope.offset - ($window.innerHeight / 2);
            scope.affixDistance = element.context.offsetHeight + scope.offset;
            scope.elementID = element.context.id;
            scope.element = element.context;
            angular.element($window).bind("scroll", function () {
                scope.affixHeight = elmYPosition(element) + scope.offset - ($window.innerHeight / 2);
                scope.affixDistance = element.context.offsetHeight + scope.offset;
                if (fixed == false && scope.affixHeight + scope.affixDistance > $window.pageYOffset && scope.affixHeight <= $window.pageYOffset) {
                    fixed = true;
                    scope.$apply(scope.onAffix());
                }
                if (fixed == true && (scope.affixHeight + scope.affixDistance <= $window.pageYOffset || scope.affixHeight > $window.pageYOffset)) {
                    fixed = false;
                    scope.$apply(scope.onUnaffix());
                }
            });
            function elmYPosition(elm) {
                var y = elm.context.offsetTop;
                var node = elm.context;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
        }
    };
}]);

angular.module('DEVE').directive('elementAffixBottom', ['$window', function ($window) {
    return {
        scope: {
            onAffix: "&",
            onUnaffix: "&",
            offset: "=",
        },
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element, attrs) {
            var fixed = false;
            scope.affixHeight = elmYPosition(element) + scope.offset - ($window.innerHeight );
            scope.affixDistance = element.context.offsetHeight + scope.offset;
            scope.elementID = element.context.id;
            scope.element = element.context;
            angular.element($window).bind("scroll", function () {
                scope.affixHeight = elmYPosition(element) + scope.offset - ($window.innerHeight );
                scope.affixDistance = element.context.offsetHeight + scope.offset;
                if (fixed == false && scope.affixHeight + scope.affixDistance > $window.pageYOffset && scope.affixHeight <= $window.pageYOffset) {
                    fixed = true;
                    scope.$apply(scope.onAffix());
                }
                if (fixed == true && (scope.affixHeight + scope.affixDistance <= $window.pageYOffset || scope.affixHeight > $window.pageYOffset)) {
                    fixed = false;
                    scope.$apply(scope.onUnaffix());
                }
            });
            function elmYPosition(elm) {
                var y = elm.context.offsetTop;
                var node = elm.context;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
        }
    };
}]);

angular.module('DEVE').directive('elementAffixTopBottom', ['$window', function ($window) {
    return {
        scope: {
            onAffix: "&",
            onUnaffixTop: "&",
            onUnaffixBottom: "&",
            offset: "=",
        },
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element, attrs) {
            var fixed = false;
            scope.affixHeight = elmYPosition(element) + scope.offset;
            scope.affixDistance = element.context.offsetHeight + scope.offset;
            scope.elementID = element.context.id;
            scope.element = element.context;
            angular.element($window).bind("scroll", function () {
                scope.affixHeight = elmYPosition(element) + scope.offset;
                scope.affixDistance = element.context.offsetHeight + scope.offset;
                if (fixed == false && scope.affixHeight + scope.affixDistance > $window.pageYOffset && scope.affixHeight <= $window.pageYOffset) {
                    fixed = true;
                    scope.$apply(scope.onAffix());
                }
                if (fixed == true && (scope.affixHeight + scope.affixDistance <= $window.pageYOffset ))
                {
                    fixed = false;
                    scope.$apply(scope.onUnaffixBottom());
                }
                    
                if (fixed == true && ( scope.affixHeight > $window.pageYOffset)) {
                    fixed = false;
                    scope.$apply(scope.onUnaffixTop());
                }
            });
            function elmYPosition(elm) {
                var y = elm.context.offsetTop;
                var node = elm.context;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
        }
    };
}]);