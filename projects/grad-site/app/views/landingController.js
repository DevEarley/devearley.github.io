angular.module('GradSite').controller('LandingController',['$scope', '$rootScope', '$location', 'studentNames',
    function ($scope, $rootScope, $location, studentNames) {
        var vm = this;
        vm.studentNames = studentNames;
    }]);