var layersToolBarElement = document.getElementById("LayersToolBar"),
    layersToolBarButtonElement = document.getElementById("LayersToolBarButton"),
    tilesToolBarElement = document.getElementById("TilesToolBar"),
    tilesToolBarButtonElement = document.getElementById("TilesToolBarButton"),
    optionsToolBarElement = document.getElementById("OptionsToolBar"),
    optionsToolBarButtonElement = document.getElementById("OptionsToolBarButton"),
    mapToolBarElement = document.getElementById("MapToolBar"),
    mapToolBarButtonElement = document.getElementById("MapToolBarButton"),
    triggersToolBarElement = document.getElementById("TriggersToolBar"),
    triggersToolBarButtonElement = document.getElementById("TriggersToolBarButton"),
    eventsToolBarElement = document.getElementById("EventsToolBar"),
    eventsToolBarButtonElement = document.getElementById("EventsToolBarButton"),
    actionsToolBarElement = document.getElementById("ActionsToolBar"),
    actionsToolBarButtonElement = document.getElementById("ActionsToolBarButton"),
    paintBrushInputX = document.getElementById("PaintBrushInputX"),
    paintBrushInputY = document.getElementById("PaintBrushInputY"),
    renameLayerInput = document.getElementById("RenameLayerInput"),
    renameTileInput = document.getElementById("RenameTileInput"),
    renameTriggerInput = document.getElementById("RenameTriggerInput"),
    renameEventInput = document.getElementById("RenameEventInput"),
    renameActionInput = document.getElementById("RenameActionInput"),
    renameActionParamInput = document.getElementById("RenameActionParamInput"),
    reorderLayerInput = document.getElementById("ReorderLayerInput"),
    brushToolButton = document.getElementById("BrushToolButton"),
    eraserToolButton = document.getElementById("EraserToolButton"),
    nineSliceToolButton = document.getElementById("NineSliceToolButton"),
    triggerToolButton = document.getElementById("TriggerToolButton"),
    wallSliceToolButton = document.getElementById("WallSliceToolButton"),
    eyedropperToolButton = document.getElementById("EyedropperToolButton"),
    paletteButton = document.getElementById("PaletteButton"),
    importMapButton = document.getElementById("ImportMap"),
    exportMapButton = document.getElementById("ExportMap"),
    fileInput = document.getElementById("File"),
    mapNameInput = document.getElementById("MapName"),
    contextMenu = document.getElementById("ContextMenu"),
    tileInfo = document.getElementById("TileInfo"),
    paintBrushPreview = document.getElementById("PaintBrushPreview"),
    layersPreview = document.getElementById("LayersPreview"),
    eventsPreview = document.getElementById("EventsPreview"),
    actionsPreview = document.getElementById("ActionsPreview"),
    actionParamsPreview = document.getElementById("ActionParamsPreview"),
    lastTilePreview = document.getElementById("LastTilePreview"),
    triggersPreview = document.getElementById("TriggersPreview"),
    scrollingElement = document.getElementById("CanvasContainer"),
    showLayersToolBar = false,
    showTilesToolBar = false,
    showTriggersToolBar = false,
    showEventsToolBar = false,
    showActionsToolBar = false,
    showMapToolBar = false,
    selectedTool = 0,
    mouseDown = false,
    inputLocked = false;
var sx, sy = 0;
var c = document.getElementsByTagName('canvas')[0],
    ctx = c.getContext('2d'),
    cw = 2048,
    ch = 2048,
    mx = 0,
    my = 0;
ctx.canvas.height = cw;
ctx.canvas.width = ch;
ctx.font = "10px Lucida Console";

function clickToggleXRay() {
    xRayView = !xRayView;
    togglePaletteMode(false);
}

function clickTogglePerspective() {
    perspectiveView = !perspectiveView;
    togglePaletteMode(false);
}

function clickToggleFog() {
    showFog = !showFog;
    togglePaletteMode(false);
}

function clickPaintTool() {
    togglePaletteMode(false);
    updatePaintBrushPreview();
    selectTool(0, brushToolButton);
}

function clickEraserTool() {
    togglePaletteMode(false);
    selectTool(1, eraserToolButton);
}

function clickEyedropperTool() {
    updatePaintBrushPreview();
    selectTool(2, eyedropperToolButton);
}

function clickNineSliceTool() {
    togglePaletteMode(false);
    selectTool(3, nineSliceToolButton);
}

function clickWallSliceTool() {
    togglePaletteMode(false);
    selectTool(4, wallSliceToolButton);
}

function clickTriggerBrushTool() {
    togglePaletteMode(false);
    selectTool(5, triggerToolButton);
}

function clickPaletteButton() {
    paletteMode = !paletteMode;
    togglePaletteMode(paletteMode);
}

function clickImportMapButton() {

    if (!validateImportButton()) return;
    startRead();
}

function clickExportMapButton() {
    if (!validateExportButton()) return;
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(createMapObject()));
    var dlAnchorElem = document.getElementById('HiddenDownloadAnchor');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", mapNameInput.value + ".json");
    dlAnchorElem.click();
}

function clickLayersToolBarButton() {
    showLayersToolBar = !showLayersToolBar;
    toggleToolBar(showLayersToolBar, layersToolBarElement, layersToolBarButtonElement);
}

function clickMapToolBarButton() {
    showMapToolBar = !showMapToolBar;
    toggleToolBar(showMapToolBar, mapToolBarElement, mapToolBarButtonElement);
}

function clickTilesToolBarButton() {
    showTilesToolBar = !showTilesToolBar;
    toggleToolBar(showTilesToolBar, tilesToolBarElement, tilesToolBarButtonElement);
}

function clickOptionsToolBarButton() {
    showTilesToolBar = !showTilesToolBar;
    toggleToolBar(showTilesToolBar, optionsToolBarElement, optionsToolBarButtonElement);
}

function clickTriggersToolBarButton() {
    showTriggersToolBar = !showTriggersToolBar;
    toggleToolBar(showTriggersToolBar, triggersToolBarElement, triggersToolBarButtonElement);
}

function clickEventsToolBarButton() {
    showEventsToolBar = !showEventsToolBar;
    toggleToolBar(showEventsToolBar, eventsToolBarElement, eventsToolBarButtonElement);
}

function clickActionsToolBarButton() {
    showActionsToolBar = !showActionsToolBar;
    toggleToolBar(showActionsToolBar, actionsToolBarElement, actionsToolBarButtonElement);
}


function onFocusInput() {
    inputLocked = true;
}

function onBlurInput() {
    inputLocked = false;
}

function validateExportButton() {
    if (mapNameInput.value == null || mapNameInput.value == "") {
        mapNameInput.style.borderColor = 'red';
        return false;
    }
    else {
        mapNameInput.style.borderColor = '#33aa33';
        return true;
    }
    }

function validateImportButton() {
    if (fileInput.value == null || fileInput.value == "") {
        fileInput.style.borderColor = 'red';
        return false;
    }
    else {
        fileInput.style.borderColor = '#33aa33';
        return true;
    }
}

function togglePaletteMode(on) {
    paletteMode = on;
    if (on) {
        movePalette();
        selectTool(2, eyedropperToolButton);
    }
}

function toggleContextMenu() {
    if (contextMenu.style.width != "200px") {
        contextMenu.style.width = "200px";
    }
    else {
        contextMenu.style.width = "0px";
    }
}

function toggleToolBar(show, toolBarElement, buttonElement) {
    buttonElement.innerHTML = show ? " - " : " + ";
    toolBarElement.style.height = show ? toolBarElement.scrollHeight + "px" : "34px";
}

function resetTools() {
    toggleClass(eraserToolButton, false, "selected");
    toggleClass(eyedropperToolButton, false, "selected");
    toggleClass(wallSliceToolButton, false, "selected");
    toggleClass(nineSliceToolButton, false, "selected");
    toggleClass(triggerToolButton, false, "selected");
    toggleClass(brushToolButton, false, "selected");
}

function selectTool(toolIndex, selectedToolElement) {
    selectedTool = toolIndex;
    var cursor = "default";
    switch (selectedTool) {
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
    ctx.canvas.style.cursor = cursor;
    resetTools();
    toggleClass(selectedToolElement, true, "selected");
}

function clear() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, cw, ch);
}

function mouseUpHandler() {
    if (mouseX < 0 || mouseY < 0) return;
    mouseDown = false;
}

function mouseDownHandler() {
    if (mouseX < 0 || mouseY < 0) return;
    mouseDown = true;

}

function mouseClickHandler(e) {
    if (mouseX < 0 || mouseY < 0) return;
    if (selectedTool == 0)
        brushClickHandler();
    else if (selectedTool == 1)
        eraserClickHandler();
    else if (selectedTool == 2)
        eyedropperClick();
    else if (selectedTool == 3)
        nineSliceClickHandler();
    else if (selectedTool == 4)
        wallSliceClickHandler();
    else if (selectedTool == 5)
        triggerBrushClickHandler();
    else if (selectedTool == 6)
        eventBrushClickHandler();
    else if (selectedTool == 7)
        actionBrushClickHandler();
}
function resetBrushTool() {
    brushTool.mode = 0;
    brushTool.state = 0;
}


function eyedropperClick() {
    resetBrushTool();
    if (paletteMode) {
        palette.forEach(function (tile, index) {
            if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
                updatePaintBrushPreviewFromEyedropper(tile);
            }
        });
    }
    else {
        layers[currentLayer].tiles.forEach(function (tile, index) {
            if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
                updateLastTile(currentLayer, tile);
                updatePaintBrushPreviewFromEyedropper(tile);
            }
        });
    }
}

function mouseMoveHandler(e) {
    if (e.button != 0 ) return;
    if (mouseDown && brushTool.mode == 0) mouseClickHandler();
    if (e.layerX) {
        mouseX = Math.floor((e.layerX) / 32);
        mouseY = Math.floor((e.layerY) / 32);
    }
}

function keyPressHandler(event) {
    if (inputLocked) return;
    var key = String.fromCharCode(event.keyCode || event.charCode);
    var shift = event.shiftKey;
    var ctrl = event.ctrlKey;
    switch (key) {
        case 'Q': case 'q':
            toggleContextMenu();
            break;
        case 'B': case 'b':
            clickPaintTool();
            break;
        case 'P': case 'p':
            clickPaletteButton();
            break;
        case 'X': case 'x':
            clickToggleXRay();
            break;
        case 'F': case 'f':
            clickToggleFog();
            break;
        case 'Z': case 'z':
            clickTogglePerspective();
            break;
        case 'E': case 'e':
            clickEraserTool();
            break;
        case 'I': case 'i':
            clickEyedropperTool();
            break;
        case 'W': case 'w':
            clickWallSliceTool();
            break;
        case 'N': case 'n':
            clickNineSliceTool();
            break;
        case 'T': case 't':
            clickTriggerBrushTool();
            break;
        case 'V': case 'v':
            clickEventBrushTool();
            break;
        case 'A': case 'a':
            clickActionBrushTool();
            break;
    }
}

function createMapObject() {
    return {
        name: mapNameInput.value,
        layers: layers,
        palette: palette
    }
}

function startRead() {
    var file = fileInput.files[0];
    if (file) {
        getAsText(file);
    }
}

function getAsText(readFile) {
    var reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
}

function updateProgress(evt) {
    if (evt.lengthComputable) {
        var loaded = (evt.loaded / evt.total);
        if (loaded < 1) {
        }
    }
}

function loaded(evt) {
    var fileString = evt.target.result;
    var map = JSON.parse(fileString);
    layers = map.layers;
    if (map.palette != undefined)
        palette = map.palette;
    mapNameInput.value = map.name;
    updateLayersPreview();
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        // The file could not be read
    }
}

function toggleClass(element, on, className) {
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
