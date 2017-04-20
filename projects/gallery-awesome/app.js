angular.module('GalleryAwesomeApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngTouch'])
.config(function (  $mdThemingProvider) {
   
}).run(function ($rootScope, $http) {

});

angular.module('GalleryAwesomeApp').controller('GalleryAwesomeController',
function AppController($scope, $rootScope, $mdDialog,  $timeout, $window) {
    var vm = this;
    vm.Images = [{ full: 'images/1.png', thumb: 'thumbs/1_t.png' },
                 { full: 'images/2.png', thumb: 'thumbs/2_t.png' },
                 { full: 'images/3.png', thumb: 'thumbs/3_t.png' },
                 { full: 'images/4.png', thumb: 'thumbs/4_t.png' },
                 { full: 'images/5.png', thumb: 'thumbs/5_t.png' },
                 { full: 'images/6.png', thumb: 'thumbs/6_t.png' },
                 { full: 'images/1.png', thumb: 'thumbs/1_t.png' },
                 { full: 'images/2.png', thumb: 'thumbs/2_t.png' },
                 { full: 'images/3.png', thumb: 'thumbs/3_t.png' },
                 { full: 'images/4.png', thumb: 'thumbs/4_t.png' },
                 { full: 'images/5.png', thumb: 'thumbs/5_t.png' },
                 { full: 'images/6.png', thumb: 'thumbs/6_t.png' },
                 { full: 'images/1.png', thumb: 'thumbs/1_t.png' },
                 { full: 'images/2.png', thumb: 'thumbs/2_t.png' },
                 { full: 'images/3.png', thumb: 'thumbs/3_t.png' },
                 { full: 'images/4.png', thumb: 'thumbs/4_t.png' },
                 { full: 'images/5.png', thumb: 'thumbs/5_t.png' },
                 { full: 'images/6.png', thumb: 'thumbs/6_t.png' },
                 { full: 'images/1.png', thumb: 'thumbs/1_t.png' },
                 { full: 'images/2.png', thumb: 'thumbs/2_t.png' },
                 { full: 'images/3.png', thumb: 'thumbs/3_t.png' },
                 { full: 'images/4.png', thumb: 'thumbs/4_t.png' },
                 { full: 'images/5.png', thumb: 'thumbs/5_t.png' },
                 { full: 'images/6.png', thumb: 'thumbs/6_t.png' },
                 { full: 'images/1.png', thumb: 'thumbs/1_t.png' },
                 { full: 'images/2.png', thumb: 'thumbs/2_t.png' },
                 { full: 'images/3.png', thumb: 'thumbs/3_t.png' },
                 { full: 'images/4.png', thumb: 'thumbs/4_t.png' },
                 { full: 'images/5.png', thumb: 'thumbs/5_t.png' },
                 { full: 'images/6.png', thumb: 'thumbs/6_t.png' }
    ];


});

angular.module('GalleryAwesomeApp').directive('galleryAwesome', function ($timeout, $rootScope, $parse) {
    return {
        restrict: 'EA',
        scope: {
            images:'='
        },
        controllerAs: 'vm',
        controller: function ($scope,$element, $mdDialog)
        {
            var vm = this;
            vm.Images = $scope.images;
            vm.ShowFull = function (ev) {
              $mdDialog.show(
                  $mdDialog.alert()
                  //.fullscreen(true)
                 //.parent(angular.element(document.body))
                  .closeTo(ev.srcElement)
                  .openFrom(ev.srcElement)
                    .clickOutsideToClose(true)
                    .title('This is an alert title')
                    .textContent('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            };
        },
        templateUrl:'gallery-awesome.html'        
    };
});