angular.module('LegendaryMapApp').controller('LegendaryMapController',
function LegendaryMapController($scope, $rootScope, $mdDialog, $timeout, $window, LegendaryMapLayerService) {
    var vm = this;
    vm.showTilesToolBar = false,
    vm.showTriggersToolBar = false,
    vm.showLayersToolBar = true,
    vm.showEventsToolBar = false,
    vm.showActionsToolBar = false,
    vm.showConditionsToolBar = false,
    vm.showParamsToolBar = false,
    vm.showMapToolBar = false,
    vm.selectedTool = 0,
    vm.mouseDown = false,
    vm.inputLocked = false;
    vm.sx
    vm.sy = 0;
    vm.currentLayer = 0;
    vm.paletteMode = false;

    vm.lastTile = {
        layerIndex: 0, tile: {
            name: '', xIndex: 0,
            yIndex: 0,
            xPosition: 0,
            yPosition: 0,
        }
    };
    vm.copiedLayer = null;
    vm.layers = [];
    vm.palette = [];
    vm.showFog = false;
    vm.perspectiveView = false;
    vm.xRayView = false;
    vm.sprites = new Image();
    vm.mouseX = 0;
    vm.mouseY = 0;
    vm.selectedBrushX = 0;
    vm.selectedBrushY = 0;
    vm.brushTool = { state: 0, mode: 0, xPos1: 0, yPos1: 0, xPos2: 0, yPos2: 0 };
    vm.sprites.src = './spritesheet.png';
    vm.initPalette();
    vm.layers.push(createLayer("layer 0", 0));
    vm.updateLayersPreview();
    vm.sy = Math.floor(scrollingElement.scrollTop / 32);
    vm.sx = Math.floor(scrollingElement.scrollLeft / 32);


    vm.paintBrushInputX.value = 0;
    vm.paintBrushInputY.value = 0;
    vm.clickPaintTool();


    vm.clickToggleXRay = function () {
        xRayView = !xRayView;
        togglePaletteMode(false);
    }

    vm.clickTogglePerspective = function () {
        perspectiveView = !perspectiveView;
        togglePaletteMode(false);
    }

    vm.clickToggleFog = function () {
        showFog = !showFog;
        togglePaletteMode(false);
    }

    vm.clickOpenGameStateEditor = function () {
        vm.openPopup(gameStatePopup);
    }
    vm.clickClosePopups = function () {
        vm.closePopups();
    }

    vm.clickOpenPlayerStateEditor = function () {
        vm.openPopup(playerStatePopup);
    }

    vm.clickPaintTool = function () {
        vm.togglePaletteMode(false);
        vm.updatePaintBrushPreview();
        vm.selectTool(0, vm.brushToolButton);
    }

    vm.clickEraserTool = function () {
        vm.togglePaletteMode(false);
        vm.selectTool(1, vm.eraserToolButton);
    }

    vm.clickEyedropperTool = function () {
        vm.updatePaintBrushPreview();
        vm.selectTool(2, vm.eyedropperToolButton);
    }

    vm.clickNineSliceTool = function() {
        vm.togglePaletteMode(false);
        vm.selectTool(3, vm.nineSliceToolButton);
    }

    vm.clickWallSliceTool = function() {
        vm.togglePaletteMode(false);
        vm.selectTool(4, vm.wallSliceToolButton);
    }

    vm.clickTriggervm.brushTool = function() {
        vm.togglePaletteMode(false);
        vm.selectTool(5, vm.triggerToolButton);
    }

    vm.clickPaletteButton = function() {
        vm.paletteMode = !vm.paletteMode;
        vm.togglePaletteMode(vm.paletteMode);
    }

    vm.clickImportMapButton = function() {

        if (!vm.validateImportButton()) return;
        vm.startRead();
    }

    vm.clickExportMapButton = function() {
        if (!vm.validateExportButton()) return;
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vm.createMapObject()));
        var dlAnchorElem = document.getElementById('HiddenDownloadAnchor');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", vm.mapNameInput.value + ".json");
        dlAnchorElem.click();
    }

    vm.clickLayersToolBarButton = function() {
        vm.showLayersToolBar = !vm.showLayersToolBar;
    }

    vm.clickMapToolBarButton = function() {
        vm.showMapToolBar = !vm.showMapToolBar;
    }

    vm.clickTilesToolBarButton = function() {
        vm.showTilesToolBar = !vm.showTilesToolBar;
    }

    vm.clickOptionsToolBarButton = function() {
        vm.showTilesToolBar = !vm.showTilesToolBar;
    }

    vm.clickTriggersToolBarButton = function() {
        vm.showTriggersToolBar = !vm.showTriggersToolBar;
    }

    vm.clickEventsToolBarButton = function() {
        vm.showEventsToolBar = !vm.showEventsToolBar;
    }

    vm.clickActionsToolBarButton = function() {
        vm.showActionsToolBar = !vm.showActionsToolBar;
    }

    vm.clickConditionsToolBarButton = function() {
        vm.showConditionsToolBar = !vm.showConditionsToolBar;
    }

    vm.clickParamsToolBarButton = function() {
        vm.showParamsToolBar = !vm.showParamsToolBar;
    }

    vm.onFocusInput = function() {
        vm.inputLocked = true;
    }

    vm.onBlurInput = function() {
        vm.inputLocked = false;
    }

    vm.validateExportButton = function() {
        if (vm.mapNameInput.value == null || vm.mapNameInput.value == "") {
            //vm.mapNameInput.style.borderColor = 'red';
            return false;
        }
        else {
           // vm.mapNameInput.style.borderColor = '#33aa33';
            return true;
        }
    }

    vm.validateImportButton = function() {
        if (vm.fileInput.value == null || vm.fileInput.value == "") {
           // vm.fileInput.style.borderColor = 'red';
            return false;
        }
        else {
          //  vm.fileInput.style.borderColor = '#33aa33';
            return true;
        }
    }

    vm.togglePaletteMode = function(on) {
        vm.paletteMode = on;
        if (on) {
            vm.movePalette();
            vm.selectTool(2, eyedropperToolButton);
        }
    }

    vm.resetTools = function() {
        //toggleClass(eraserToolButton, false, "selected");
        //toggleClass(eyedropperToolButton, false, "selected");
        //toggleClass(wallSliceToolButton, false, "selected");
        //toggleClass(nineSliceToolButton, false, "selected");
        //toggleClass(triggerToolButton, false, "selected");
        //toggleClass(vm.brushToolButton, false, "selected");
    }

    vm.selectTool = function(toolIndex, selectedToolElement) {
        vm.selectedTool = toolIndex;
        var cursor = "default";
        switch (vm.selectedTool) {
            case 0:
                cursor = "default";
                break;
            case 1: case 5:
                cursor = "crosshair";
                break;
            case 2:
                cursor = "help";
                break;
            case 3:
                cursor = "nwse-resize";
                break;
            case 4:
                cursor = "nwse-resize";
                break;
        }
        //ctx.canvas.style.cursor = cursor;
        vm.resetTools();
        //toggleClass(vm.selectedToolElement, true, "selected");
    }


    vm.mouseUpHandler = function() {
        if (vm.mouseX < 0 || vm.mouseY < 0) return;
        vm.mouseDown = false;
    }

    vm.mouseDownHandler = function() {
        if (vm.mouseX < 0 || vm.mouseY < 0) return;
        vm.mouseDown = true;

    }

    vm.mouseClickHandler = function(e) {
        if (vm.mouseX < 0 || vm.mouseY < 0) return;
        if (vm.selectedTool == 0)
            vm.brushClickHandler();
        else if (vm.selectedTool == 1)
            vm.eraserClickHandler();
        else if (vm.selectedTool == 2)
            vm.eyedropperClick();
        else if (vm.selectedTool == 3)
            vm.nineSliceClickHandler();
        else if (vm.selectedTool == 4)
            vm.wallSliceClickHandler();
        else if (vm.selectedTool == 5)
            vm.triggerBrushClickHandler();
        else if (vm.selectedTool == 6)
            vm.eventBrushClickHandler();
        else if (vm.selectedTool == 7)
            vm.actionBrushClickHandler();
    }

    vm.resetbrushTool = function() {
        vm.brushTool.mode = 0;
        vm.brushTool.state = 0;
    }

    vm.eyedropperClick = function() {
        resetbrushTool();
        if (paletteMode) {
            palette.forEach(function (tile, index) {
                if (tile.xPosition == vm.mouseX && tile.yPosition == vm.mouseY) {
                    vm.updatePaintBrushPreviewFromEyedropper(tile);
                }
            });
        }
        else {
            layers[currentLayer].tiles.forEach(function (tile, index) {
                if (tile.xPosition == vm.mouseX && tile.yPosition == vm.mouseY) {
                    vm.updateLastTile(currentLayer, tile);
                    vm.updatePaintBrushPreviewFromEyedropper(tile);
                }
            });
        }
    }

    vm.mouseMoveHandler = function(e) {
        if (e.button != 0) return;
        if (vm.mouseDown && vm.brushTool.mode == 0) vm.mouseClickHandler();
        if (e.layerX) {
            vm.mouseX = Math.floor((e.layerX) / 32);
            vm.mouseY = Math.floor((e.layerY) / 32);
        }
    }

    vm.keyPressHandler = function(event) {
        if (vm.inputLocked) return;
        var key = String.fromCharCode(event.keyCode || event.charCode).toUpperCase();
        var shift = event.shiftKey;
        var ctrl = event.ctrlKey;
        switch (key) {
            case 'Q':
                vm.toggleContextMenu();
                break;
            case 'B':
                vm.clickPaintTool();
                break;
            case 'P':
                vm.clickPaletteButton();
                break;
            case 'X':
                vm.clickToggleXRay();
                break;
            case 'F':
                vm.clickToggleFog();
                break;
            case 'Z':
                vm.clickTogglePerspective();
                break;
            case 'E':
                vm.clickEraserTool();
                break;
            case 'I':
                vm.clickEyedropperTool();
                break;
            case 'W':
                vm.clickWallSliceTool();
                break;
            case 'N':
                vm.clickNineSliceTool();
                break;
            case 'T':
                vm.clickTriggervm.brushTool();
                break;
            case 'S':
                vm.clickSubtileTool();
                break;
        }
    }

    vm.createMapObject = function() {
        return {
            name: vm.mapNameInput,
            layers: layers,
            palette: palette,
            triggers: triggers,
            gameState: gameState,
            playerState: playerState
        }
    }

    vm.startRead = function() {
        var file = vm.fileInput.files[0];
        if (file) {
            getAsText(file);
        }
    }

    vm.getAsText = function(readFile) {
        var reader = new FileReader();
        reader.readAsText(readFile, "UTF-8");
        reader.onprogress = vm.updateProgress;
        reader.onload = vm.loaded;
        reader.onerror = vm.errorHandler;
    }

    vm.updateProgress = function(evt) {
        if (evt.lengthComputable) {
            var loaded = (evt.loaded / evt.total);
            if (loaded < 1) {
            }
        }
    }

    vm.loaded = function(evt) {
        var fileString = evt.target.result;
        var map = JSON.parse(fileString);
        vm.layers = map.layers;
        vm.palette = map.palette;
        vm.triggers = map.triggers;
        vm.playerState = map.playerState;
        vm.gameState = map.gameState;
        vm.mapNameInput.placeholder = map.name;
        vm.mapNameInput.value = "";
        vm.updateLayersPreview();
    }

    vm.errorHandler = function(evt) {
        alert("Error reading file. " + evt.target.error.name);

    }

    vm.genID = function() {
        Math.random().toString(36).substr(2, 9);
    }

    vm.toggleClass = function(element, on, className) {
        if (on) element.classList.add(className);
        else element.classList.remove(className);
    }

    var addEvent = function (object, type, callback) {
        if (object == null || typeof (object) == 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on" + type] = callback;
        }
    };
});
