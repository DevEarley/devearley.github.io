'use strict';
angular.module('eCannexAdmin').directive('simpleAffix', ['$window',function ($window) {
    return {
        scope: {
            onAffix: "&", 
            onUnaffix: "&",
            affixHeight:"="
        },
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element, attrs)
        {
            var fixed = false;
            angular.element($window).bind("scroll", function ()
            {
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