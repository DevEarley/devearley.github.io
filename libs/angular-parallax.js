//Source: https://github.com/hidefsk/angular-perfect-parallax/blob/master/src/angular-perfect-parallax.js

angular.module('perfectParallax', []).directive('perfectParallax', [
  '$window', '$rootScope', function ($window, $rootScope) {

      return {
          restrict: 'A',
          scope: {
              parallaxCss: '@',
              parallaxInitVal: '@',
              parallaxRatio: '@'
          },
          link: function ($scope, $element, $attr) {
              var cssKey,
                cssValue,
                isSpecialVal,
                parallaxCssVal,
                parallaxOffset,
                parallaxRatio,
                parallaxInitVal,
                cssValArray;

              //$scope.IsMobile = $rootScope.IsMobile;
              $rootScope.$watch('IsMobile', function (newData, oldData) {
                  $scope.IsMobile = newData;


                  parallaxCssVal = $scope.parallaxCss ? $scope.parallaxCss : 'top';
                  cssValArray = parallaxCssVal.split(':');
                  cssKey = cssValArray[0];
                  cssValue = cssValArray[1];

                  isSpecialVal = cssValue ? true : false;
                  if (!cssValue) cssValue = cssKey;

                  parallaxRatio = $scope.parallaxRatio ? +$scope.parallaxRatio : 1.1;
                  parallaxInitVal = $scope.parallaxInitVal ? +$scope.parallaxInitVal : 0;

                  if (!$scope.IsMobile)
                      $element.css(cssKey, parallaxInitVal + 'px');

                  function _onScroll() {
                      if ($scope.IsMobile) return;
                      var resultVal;
                      var calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;

                      if (isSpecialVal) {
                          resultVal = '' + cssValue + '(' + calcVal + 'px)';
                      } else {
                          resultVal = calcVal + 'px';
                      }
                      $element.css(cssKey, resultVal);
                  };



                  $window.addEventListener('scroll', _onScroll);

              });

          }
      };
  }
]);