
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
        link: function ($scope, element) {
            $scope.ctx = element[0].getContext('2d');
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

            $scope.drawLayer = function (layer) {
                if ($scope.perspectiveView) {
                    var currentOrder = $scope.layers[$scope.currentLayer].order;
                    var offsetIndex = layer.order - currentOrder;
                    var direction = currentOrder >= layer.order;
                    var mouseXoffset = $scope.mouseX - ($scope.sx);
                    var mouseYoffset = $scope.mouseY - ($scope.sy);
                    var offX = (mouseXoffset * offsetIndex / 2) * (direction ? 1 : -1);
                    var offY = (mouseYoffset * offsetIndex / 2) * (direction ? 1 : -1);
                    $scope.drawTilesOff(layer, offX, offY);
                }
                else {
                    $scope.drawTiles(layer);
                }
            }

            $scope.drawLayerFog = function () {
                $scope.ctx.fillStyle = "rgba(0,0,0,0.2)";
                $scope.ctx.fillRect(0, 0, $scope.cw, $scope.ch);
            }

            $scope.drawTiles = function (layer) {
                layer.tiles.forEach(function (tile) {
                    $scope.drawSprite($scope.sprites, tile.xPosition, tile.yPosition, tile.xIndex, tile.yIndex);
                });
            }

            $scope.drawTilesOff = function (layer, xoff, yoff) {
                layer.tiles.forEach(function (tile) {
                    $scope.drawSpriteOff($scope.sprites, tile.xPosition, tile.yPosition, tile.xIndex, tile.yIndex, xoff, yoff);
                });
            }

            $scope.drawPalette = function () {
                $scope.palette.forEach(function (tile) {
                    $scope.drawSprite($scope.sprites, tile.xPosition, tile.yPosition, tile.xIndex, tile.yIndex);
                });
            }

            $scope.drawSprite = function (spriteSheet, x, y, xindex, yindex) {
                $scope.ctx.drawImage(spriteSheet, xindex * 16, yindex * 16, 16, 16, x * 16, y * 16, 16, 16);
            }

            $scope.drawSpriteOff = function (spriteSheet, xpos, ypos, xindex, yindex, xoff, yoff) {
                var x = Math.floor(xpos * 16 + xoff);
                var y = Math.floor(ypos * 16 + yoff);
                $scope.ctx.drawImage(spriteSheet, xindex * 16, yindex * 16, 16, 16, x, y, 16, 16);
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

