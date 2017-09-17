angular.module('GradSite').controller('StudentController', ['$scope', '$rootScope', '$location', 'student',
    function ($scope, $rootScope, $location, student) {
        var vm = this;
        vm.student = student;
    }]);