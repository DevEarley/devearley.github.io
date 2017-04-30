
angular.module('LegendaryMap').directive('legendaryMapDropdown', function ($timeout, $rootScope, $parse) {
    return {
        restrict: 'EA',
        scope: {
            
        },
        controllerAs: 'vm',
        link: function ($scope, element) {
            $scope.$watch('columns', function () {
                updateThumbs();
            });

            $scope.$watch('radius', function () {
                updateThumbs();
            });

            function updateThumbs() {
                var newColWidth = parseInt((80 / parseInt($scope.columns))) - 2;
                var newStyle = "height:" + newColWidth + "vw;width:" + newColWidth + "vw;" +
                    "clip-path:clip-path: circle(" + $scope.radius + "vw at 50% 50%);" +
     "-webkit-clip-path: circle(" + $scope.radius + "vw at  50% 50%);";
                angular.forEach(document.getElementsByClassName('gallery-awesome-thumb'), function (elem) {
                    elem.setAttribute("style", newStyle);
                });
            }

        },
        controller: function ($scope, $element, $mdDialog) {
            var vm = this;


        },
        replace:false
    };
});

