
angular.module('LegendaryMap').directive('legendaryMapCanvas', function ($timeout, $rootScope, $parse) {
    return {
        restrict: 'A',
        scope: {
          
        },
        controllerAs: 'vm',
        link: function ($scope, element) {
            $scope.ctx = element[0].getContext('2d');
            $scope.cw = 2048;
            $scope.ch = 2048;
            $scope.mx = 0;
            $scope.my = 0;
            $scope.ctx.canvas.height = cw;
            $scope.ctx.canvas.width = ch;
            $scope.ctx.font = "10px Lucida Console";

        },
        controller: function ($scope, $element, $mdDialog) {
            var vm = this;
         



        },
        templateUrl: 'gallery-awesome.html'
    };
});

