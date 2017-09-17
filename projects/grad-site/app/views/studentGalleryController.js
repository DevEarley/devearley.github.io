angular.module('GradSite').controller('StudentGalleryController', ['$scope', '$rootScope', '$location', 'student',
    function ($scope, $rootScope, $location, student) {
        var vm = this;
        vm.student = student;
    }]);