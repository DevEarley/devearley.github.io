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
                var newStyle = "height:" + newColWidth + "vw;width:" + newColWidth + "vw;"; 
                angular.forEach(document.getElementsByClassName('gallery-awesome-thumb-container'), function (elem) {
                    elem.setAttribute("style", newStyle);
                });
                angular.forEach(document.getElementsByClassName('gallery-awesome-thumb'), function (elem) {
                    elem.setAttribute("style", newStyle);
                });                
            }
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
                        gallery:img.gallery,
                        caption:img.caption
                }
                });
                   
            };

            function GalleryAwesomeDialogController($scope, $mdDialog, imageUrl, gallery,caption) {
                var vm = this;
                vm.Close = function () {
                    $mdDialog.hide();
                };
                vm.Prev = function () {
                    vm.Reset();
                    vm.CurrentIndex--;
                    if (vm.CurrentIndex <= 0)
                    {
                        vm.ShowPrev = false;
                        vm.CurrentIndex = 0;
                    }
                      
                };

                vm.Next = function () {
                    vm.Reset();
                    vm.CurrentIndex++;
                    if (vm.CurrentIndex >= vm.Gallery.length-1)
                    {
                        vm.ShowNext = false;
                        vm.CurrentIndex = vm.Gallery.length - 1;
                    }
                };

                vm.Reset=function()
                {
                    vm.ShowNext = true;
                    vm.ShowPrev = true;
                }

                vm.Image = imageUrl;
                vm.Gallery = gallery;
                vm.IsGallery = vm.Gallery != undefined && vm.Gallery.length > 0;
                vm.ShowPrev = false;
                vm.ShowNext = vm.IsGallery;
                vm.Caption = caption;
                vm.CurrentIndex = 0;
            };


        },
        templateUrl: 'gallery-awesome.html'
    };
});

var staticImageList = [{ full: 'images/design-jobby.png', thumb: 'thumbs/design-jobby_t.png', caption: 'Jobby Pro - Web Design', style: 'circle' },
    { full: 'images/design-rate-scout.png', thumb: 'thumbs/design-rate-scout_t.png', caption: 'Rate Scout - Web Design', style: 'circle' },
    { gallery: [{ full: 'images/design-solar1.png', index: 0 }, { full: 'images/design-solar2.png', index:1}], thumb: 'thumbs/design-solar_t.png', caption: 'American Solar - Web Design', style: 'circle' },
    { gallery: [{ full: 'images/hands.png', index: 0 }, { full: 'images/hands2.png', index: 1}], thumb: 'thumbs/hands_t.png', caption: 'Hands - Woodblock Print', style: 'cross' }
        
];

