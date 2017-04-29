angular.module('LegendaryMapApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngTouch', 'LegendaryMap'])
.config(function ($mdThemingProvider) {

}).run(function ($rootScope, $http) {

});

angular.module('LegendaryMapApp').controller('LegendaryMapController',
function LegendaryMapController($scope, $rootScope, $mdDialog, $timeout, $window) {
    var vm = this;
   vm.showTilesToolBar = false,
   vm.showTriggersToolBar = false,
   vm.showLayersToolBar = true,
   vm.showEventsToolBar = false,
   vm.showActionsToolBar = false,
   vm.showConditionsToolBar = false,
   vm.showParamsToolBar = false,
   vm.showMapToolBar = false,
   vm.selectedTool = 0,
   vm.mouseDown = false,
   vm.inputLocked = false;
   vm.sx
   vm.sy = 0;
        
});
 