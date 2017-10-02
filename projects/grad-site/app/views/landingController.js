angular.module('GradSite').controller('LandingController', ['$scope', '$rootScope', '$location','StudentDataService',
    function ($scope, $rootScope, $location, StudentDataService) {
        var vm = this;
        vm.studentNames = StudentDataService.getStudentNames();
    }]);