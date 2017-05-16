angular.module('GalleryAwesomeApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngTouch'])
.config(function ($mdThemingProvider) {

}).run(function ($rootScope, $http) {

});

angular.module('GalleryAwesomeApp').controller('GalleryAwesomeController',
function AppController($scope, $rootScope, $mdDialog, $timeout, $window) {
    var vm = this;
    vm.Images = staticImageList;
    vm.Columns = 3;
    vm.Radius = 5;
    $timeout(function () { vm.Columns = 4; }, 0);
   

});

angular.module('GalleryAwesomeApp').directive('galleryAwesome', function ($timeout, $rootScope, $parse) {
    return {
        restrict: 'EA',
        scope: {
            images: '=',
            columns:'=',
            radius:'='
        },
        controllerAs: 'vm',
        link:function ($scope,element)
        {
            $scope.$watch('columns', function () {
                updateThumbs($scope.columns);
            });

            $scope.$watch('radius', function () {
                updateThumbs($scope.columns);
            });

            function updateThumbs(size)
            {
                var newColWidth = parseInt((80 / parseInt(size))) - 2;
                var newStyle = "height:" + newColWidth + "vw;width:" + newColWidth + "vw;"; //+
                 //   "clip-path:clip-path: circle(" + $scope.radius + "vw at 50% 50%);" +
     //"-webkit-clip-path: circle(" + $scope.radius + "vw at  50% 50%);";
                angular.forEach(document.getElementsByClassName('gallery-awesome-thumb-container'), function (elem) {
                    elem.setAttribute("style", newStyle);
                });
                angular.forEach(document.getElementsByClassName('gallery-awesome-thumb'), function (elem) {
                    elem.setAttribute("style", newStyle);
                });
                //var newContainerStyle = "height:" + newColWidth + "vw;width:" + newColWidth + "vw;";
                //angular.forEach(document.getElementsByClassName('gallery-awesome-thumb-container'), function (elem) {
                //    elem.setAttribute("style", newContainerStyle);
                //});
            }
            //setTimeout(updateThumbs(3),10000);

        },
        controller: function ($scope, $element, $mdDialog) {
            var vm = this;
            vm.Images = $scope.images;           
            vm.ShowFull = function (ev,img) {
                $mdDialog.show({
                    
                    controller: GalleryAwesomeDialogController,
                    controllerAs:"vm",
                    templateUrl: 'gallery-awesome-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals : {
                        imageUrl: img.full,
                        caption:img.caption
                }
                });
                   
            };

            function GalleryAwesomeDialogController($scope, $mdDialog, imageUrl,caption) {
                var vm = this;
                vm.Close = function () {
                    $mdDialog.hide();
                };
                vm.Image = imageUrl;
                vm.Caption = caption;
            };


        },
        templateUrl: 'gallery-awesome.html'
    };
});


var staticImageList = [{ full: 'images/design-jobby.png', thumb: 'thumbs/design-jobby_t.png', caption: 'Jobby Pro - Web Design', style: 'circle' },
    { full: 'images/design-rate-scout.png', thumb: 'thumbs/design-rate-scout_t.png', caption: 'Rate Scout - Web Design', style: 'circle' },
    { full: 'images/design-solar1.png', thumb: 'thumbs/design-solar_t.png', caption: 'American Solar - Web Design - 1', style: 'circle' },
    { full: 'images/design-solar2.png', thumb: 'thumbs/design-solar_t.png', caption: 'American Solar - Web Design - 2', style: 'circle' },
    { full: 'images/hands.png', thumb: 'thumbs/hands_t.png', caption: 'Hands - Woodblock Print - 1', style: 'cross' },
    { full: 'images/hands2.png', thumb: 'thumbs/hands_t.png', caption: 'Hands - Woodblock Print - 2', style: 'cross' }
        
];