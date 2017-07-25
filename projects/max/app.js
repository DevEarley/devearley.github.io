angular.module('GalleryAwesomeApp', ['GalleryAwesome'])
    .config(function ($mdThemingProvider) {

    }).run(function ($rootScope, $http) {

    });
    
angular.module('GalleryAwesome').controller('GalleryAwesomeController',
    function AppController($scope, $rootScope, $mdDialog, $timeout, $window) {
        var vm = this;
        vm.Images = staticImageList;
        vm.Columns = 4;
        vm.Radius = 5;
        vm.ModileColumns = 10;
        vm.MobileRadius = 5;
        $timeout(function () { 
              vm.Columns = 4;
        vm.ModileColumns = 10;
        }, 0);
    });
    
var staticImageList = [
    {
        full: 'images/design-jobby.png',
        thumb: 'thumbs/design-jobby_t.png',
        caption: 'Jobby Pro - Web Design'
    },
    {
        full: 'images/design-rate-scout.png',
        thumb: 'thumbs/design-rate-scout_t.png',
        caption: 'Rate Scout - Web Design'
    },
    {
        gallery: [
            {
                full: 'images/design-solar1.png',
                index: 0
            },
            {
                full: 'images/design-solar2.png',
                index: 1
            }],
        thumb: 'thumbs/design-solar_t.png',
        caption: 'American Solar - Web Design'
    },
    {
        gallery: [
            {
                full: 'images/hands.png',
                index: 0
            },
            {
                full: 'images/hands2.png',
                index: 1
            }],
        thumb: 'thumbs/hands_t.png',
        caption: 'Hands - Woodblock Print'
    }

];

