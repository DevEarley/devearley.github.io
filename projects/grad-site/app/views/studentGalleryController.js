angular.module('GradSite').controller('StudentGalleryController', ['$scope', '$rootScope', '$location', 'student','StudentDataService',
    function ($scope, $rootScope, $location, student, StudentDataService) {
        var vm = this;
        vm.student = student;
        vm.names = StudentDataService.getStudentNames();
    }]);