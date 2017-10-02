angular.module('GradSite', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/landing.html',
            controller: 'LandingController',
            controllerAs: 'vm',
           
        })
        .when('/students/:studentId', {
            templateUrl: 'app/views/student.html',
            controller: 'StudentController',
            controllerAs: 'vm',
            //resolve: {
            //    student: function (StudentDataService, $routeParams) {
            //        return StudentDataService.getStudentName($routeParams.studentId);
            //    }
            //}
        })
        .when('/students/:studentId/gallery', {
            templateUrl: 'app/views/studentGallery.html',
            controller: 'StudentGalleryController',
            controllerAs: 'vm'
        });

    $locationProvider.html5mode = true;

});
  