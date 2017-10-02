angular.module('GradSite').controller('StudentController', ['$scope', '$location', 'StudentDataService', '$routeParams',
    function ($scope, $location, StudentDataService, $routeParams) {
        var vm = this;
        vm.student = StudentDataService.getStudentInfo($routeParams.studentId);
        vm.images = StudentDataService.getStudentImages($routeParams.studentId);
        vm.clickHome = function () {
            $location.path('/');
        }
    }]);