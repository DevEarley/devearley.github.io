angular.module('DEVE').controller('AppController',
function AppController($scope, $rootScope, $location, $timeout, $window) {
    var vm = this;

    
    vm.Themes = ['fish', 'aura', 'ocean', 'stairs'];
    vm.Popping = null;
    vm.Change = function(newTheme)
    {
        vm.Popping = true;
        $timeout(function () {
            vm.Popping = false;
            vm.Theme = newTheme;
        }, 300);
    }
    vm.Email = function (emailId, subject, message) {
        $window.open("mailto:alexearley@me.com", "_self");
    }
    vm.Shuffle = function()
    {

        vm.Popping = true;
        $timeout(function () {

            vm.Popping = false;
            var index = Math.floor(Math.random() *( vm.Themes.length ));
            vm.Theme = vm.Themes[index];
          
        }, 300);
       
    }
    vm.Shuffle();

    $scope.$on("$destroy", function () {
        window.onbeforeunload = undefined;
    });

    function handleOnbeforeUnload() {
      
    }

    $window.onbeforeunload = handleOnbeforeUnload;
});