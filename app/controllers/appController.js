angular.module('DEVE').controller('AppController',
function AppController($scope, $rootScope, $location, $timeout, $window) {
    var vm = this;
    vm.IsMobile = $rootScope.IsMobile;
    $rootScope.$watch('IsMobile', function (newData, oldData) {
        vm.IsMobile = $rootScope.IsMobile;
    });
    vm.Themes = ['fish', 'aura', 'ocean', 'stairs','bushes'];
    vm.Popping = null;
    vm.ShowProjects = false;
    vm.ShowResumes = false;
    vm.ShowProjectsSemaphore = true;
    vm.gotoBlog = function () {
        $location.path("blog");
    }    
    vm.gotoHome = function () {
        $location.path("/");
    }    
    vm.Change = function(newTheme)
    {
        vm.Popping = true;
        $timeout(function () {
            vm.Popping = false;
            vm.Theme = newTheme;
        }, 300);
    }

    vm.OpenProjects = function (e) {
        if (vm.ShowProjectsSemaphore == false) return;
        $timeout(function () { vm.ShowProjectsSemaphore = true; }, 500);
        vm.ShowProjectsSemaphore = false;
        e.preventDefault();
        vm.ShowProjects = !vm.ShowProjects;

        vm.ShowResumes = false;
    }

    vm.OpenResumes = function (e) {
        if (vm.ShowProjectsSemaphore == false) return;
        $timeout(function () { vm.ShowProjectsSemaphore = true; }, 500);
        vm.ShowProjectsSemaphore = false;
        e.preventDefault();
        vm.ShowResumes = !vm.ShowResumes;
        vm.ShowProjects = false;
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