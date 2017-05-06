
angular.module('LegendaryMap',[]).directive('legendaryMapCanvas', function ($timeout, $rootScope, $parse) {
    return {
        restrict: 'A',
        scope: {
            keyPressHandler: '&',
            mouseMoveHandler: '&',
            mouseClickHandler: '&',
            mouseUpHandler: '&',
            mouseDownHandler: '&',
            canvasContainer: '@',
            currentLayer: '=',
            sprites: '=',
            layers: '=',
            palette: '=',
            sy: '=',
            sx: '=',
            mousey: '=',
            mousex: '=',
            perspectiveView: '=',
            xRayView: '=',
            showFog: '=',
        },
        controllerAs: 'vm',
        link: function ($scope, $element) {
            $scope.ctx = $element[0].getContext('2d');
            $scope.cw = 2048;
            $scope.ch = 2048;
            $scope.mx = 0;
            $scope.my = 0;
            $scope.ctx.canvas.height = cw;
            $scope.ctx.canvas.width = ch;
            $scope.ctx.font = "10px Lucida Console";

            $scope.ctx.canvas.addEventListener('mousemove', $scope.mouseMoveHandler);
            $scope.ctx.canvas.addEventListener('click', $scope.mouseClickHandler);
            $scope.ctx.canvas.addEventListener('mouseup', $scope.mouseUpHandler);
            $scope.ctx.canvas.addEventListener('mousedown', $scope.mouseDownHandler);
            document.addEventListener('keypress', function (event) {
                $scope.keyPressHandler(event);
                $scope.$apply();
            }, false);

            $scope.scrollingElement = document.getElementById($scope.canvasContainer);
            var left = $scope.ctx.canvas.scrollWidth / 2;
            var top = $scope.ctx.canvas.scrollHeight / 2;
            $scope.scrollingElement.scrollTop = top;
            $scope.scrollingElement.scrollLeft = left;
            addEvent($scope.scrollingElement, "scroll", function () {
                $scope.sy = Math.floor($scope.scrollingElement.scrollTop / 32);
                $scope.sx = Math.floor($scope.scrollingElement.scrollLeft / 32);
                $scope.$apply();
            });

            $scope.clear = function () {
                $scope.ctx.fillStyle = "#222";
                $scope.ctx.fillRect(0, 0, $scope.cw, $scope.ch);
            }

            $scope.drawLayers = function () {
                if ($scope.layers == null || $scope.layers[$scope.currentLayer] == null) return;
                $scope.ctx.globalAlpha = 1;
                $scope.layers.forEach(function (layer, index) {
                    if ($scope.layers[$scope.currentLayer].order >= layer.order) {
                        if ($scope.layers[$scope.currentLayer].order == layer.order && $scope.xRayView)
                            $scope.ctx.globalAlpha = 0.9;
                        if ($scope.layers[$scope.currentLayer].order == layer.order && $scope.currentLayer != index && $scope.xRayView)
                            $scope.ctx.globalAlpha = 0.4;

                        $scope.drawLayer(layer);
                        if ($scope.layers[$scope.currentLayer].order != layer.order && $scope.showFog)
                            $scope.drawLayerFog();
                    }
                    else if ($scope.xRayView) {
                        $scope.ctx.globalAlpha = $scope.ctx.globalAlpha * 0.3;
                        $scope.drawLayer(layer);
                    }
                });
                $scope.ctx.globalAlpha = 1;
            }

            $scope.drawLayer = function (_layer) {
                if ($scope.perspectiveView) {
                    var _currentOrder = $scope.layers[$scope.currentLayer].order;
                    var _offsetIndex = _layer.order - _currentOrder;
                    var _direction = _currentOrder >= _layer.order;
                    var _mouseXoffset = $scope.mouseX - ($scope.sx);
                    var _mouseYoffset = $scope.mouseY - ($scope.sy);
                    var _offX = (_mouseXoffset * _offsetIndex / 2) * (_direction ? 1 : -1);
                    var _offY = (_mouseYoffset * _offsetIndex / 2) * (_direction ? 1 : -1);
                    $scope.drawTilesOff(_layer, _offX, _offY);
                }
                else {
                    $scope.drawTiles(_layer);
                }
            }

            $scope.drawLayerFog = function () {
                $scope.ctx.fillStyle = "rgba(0,0,0,0.2)";
                $scope.ctx.fillRect(0, 0, $scope.cw, $scope.ch);
            }

            $scope.drawTiles = function (_layer) {
                _layer.tiles.forEach(function (_tile) {
                    $scope.drawSprite($scope.sprites, _tile.xPosition, _tile.yPosition, _tile.xIndex, _tile.yIndex);
                });
            }

            $scope.drawTilesOff = function (_layer, _xoff, _yoff) {
                _layer.tiles.forEach(function (_tile) {
                    $scope.drawSpriteOff($scope.sprites, _tile.xPosition, _tile.yPosition, _tile.xIndex, _tile.yIndex, _xoff, _yoff);
                });
            }

            $scope.drawPalette = function () {
                $scope.palette.forEach(function (_tile) {
                    $scope.drawSprite($scope.sprites, _tile.xPosition, _tile.yPosition, _tile.xIndex, _tile.yIndex);
                });
            }

            $scope.drawSprite = function (_spriteSheet, _x, _y, _xindex, _yindex) {
                $scope.ctx.drawImage(_spriteSheet, _xindex * 16, _yindex * 16, 16, 16, _x * 16, _y * 16, 16, 16);
            }

            $scope.drawSpriteOff = function (_spriteSheet, _xpos, _ypos, _xindex, _yindex, _xoff, _yoff) {
                var _x = Math.floor(_xpos * 16 + _xoff);
                var _y = Math.floor(_ypos * 16 + _yoff);
                $scope.ctx.drawImage(_spriteSheet, _xindex * 16, _yindex * 16, 16, 16, _x, _y, 16, 16);
            }

            setInterval(function () {
                $scope.drawLayers();
            }, 16);

        },
        controller: function ($scope, $element, $mdDialog) {
            var vm = this;
        },
        templateUrl: 'gallery-awesome.html'
    };
});

