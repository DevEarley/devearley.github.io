import { autoinject } from 'aurelia-framework';
import { MapEditorEvents } from "./map-editor-events";

import iMapEditorTypes = require("./map-editor-types");

@autoinject
export class MapEditorTools {
    constructor(public mapEditorEvents: MapEditorEvents) { }

    public brushTool = new iMapEditorTypes.Tool();
    public paintBrushInputX = 0;
    public paintBrushInputY = 0;
    public showLayersToolBar = true;
    public showTriggersToolBar = false;
    public showEventsToolBar = false;
    public showActionsToolBar = false;
    public showConditionsToolBar = false;
    public showParamsToolBar = false;
    public showMapToolBar = false;
    public selectedTool = 0;
    public mouseDown = false;
    public inputLocked = false;
    public sx = 0;
    public sy = 0;
    public currentAction = null;
    public mx = 0;
    public my = 0;
    public xRayView = false;
    public showFog = false;
    public perspectiveView = false;
    public viewTriggers = false;
    public selectedBrushX = 0;
    public selectedBrushY = 0;
    public layersToolBarElement = new HTMLElement();
    public layersToolBarButtonElement = new HTMLElement();
    public layersPreview = new HTMLElement();
    public toolBarElement = new HTMLElement();
    public paintBrushPreview = new HTMLElement();
    public renameLayerInputplaceholder = "";
    public renameLayerInputvalue = "";
    public reorderLayerInputplaceholder = 0;
    public reorderLayerInputvalue = 0;
    public showlayersToolBar = true;

    toggleToolBar(_show, _toolBarElement, _buttonElement) {
        _buttonElement.innerHTML = _show ? " - " : " + ";
        this.toolBarElement.style.height = _show ? _toolBarElement.scrollHeight + "px" : "34px";
    }

    resetBrushTool() {
        this.brushTool.mode = 0;
        this.brushTool.state = 0;
    }

    // var currentAction = null, viewActions = true;


    // function clickRemoveSelectedAction() {

    // }

    // function clickRenameAction() {
    //     var action = getCurrentAction();
    //     action.name = renameActionInput.value;
    //     updateActionsPreview(event);
    // }

    // function updateActionsPreview(event) {
    //     if (currentAction == null || event == null) {
    //         actionsPreview.innerHTML = "";
    //         return;
    //     }
    //     var currentActionObj = getCurrentAction();
    //     updateParamsPreview(currentActionObj);
    //     viewActions = true;
    //     actionsPreview.innerHTML = generateHTMLForActionsPreview(event.actions);
    //     renameActionInput.placeholder = currentActionObj == null ? '' : currentActionObj.name;
    //     renameActionInput.value = "";
    // }


    // function getCurrentEvent() {
    //     var trigger = getCurrentTrigger();
    //     if (trigger == null) return null;
    //     return trigger.events[currentEvent];
    // }

    // function getCurrentAction() {
    //     var event = getCurrentEvent();
    //     if (event == null) return null;
    //     return event.actions[currentAction];
    // }

    // function clickSelectAction(index) {
    //     var event = getCurrentEvent();
    //     if (event == null) return;
    //     currentAction = index;
    //     updateActionsPreview(event);
    // }

    // function generateHTMLForActionsPreview(currentActions) {
    //     var rows = "";
    //     if (currentActions == null) return rows;
    //     currentActions.forEach(function (action, index) {
    //         var classes = "button" + (currentAction == index ? " selected" : "");
    //         rows += "<div class='" + classes + "' onclick='clickSelectAction(" + index + ")'>" + action.name + " </div>";
    //     });
    //     return "<div>" + rows + "</div>";
    // }

    // function getCurrentActions() {
    //     var event = getCurrentEvent();
    //     return event.actions;
    // }

    // function clickToggleXRay() {
    //     xRayView = !xRayView;
    //     togglePaletteMode(false);
    // }

    // function clickTogglePerspective() {
    //     perspectiveView = !perspectiveView;
    //     togglePaletteMode(false);
    // }

    // function clickToggleFog() {
    //     showFog = !showFog;
    //     togglePaletteMode(false);
    // }

    // function clickOpenGameStateEditor() {
    //     openPopup(gameStatePopup);
    // }
    // function clickClosePopups() {
    //     closePopups();
    // }

    // function clickOpenPlayerStateEditor() {
    //     openPopup(playerStatePopup);
    // }

    // function clickPaintTool() {
    //     togglePaletteMode(false);
    //     updatePaintBrushPreview();
    //     selectTool(0, brushToolButton);
    // }

    // function clickEraserTool() {
    //     togglePaletteMode(false);
    //     selectTool(1, eraserToolButton);
    // }

    // function clickEyedropperTool() {
    //     updatePaintBrushPreview();
    //     selectTool(2, eyedropperToolButton);
    // }

    // function clickNineSliceTool() {
    //     togglePaletteMode(false);
    //     selectTool(3, nineSliceToolButton);
    // }

    // function clickWallSliceTool() {
    //     togglePaletteMode(false);
    //     selectTool(4, wallSliceToolButton);
    // }

    // function clickTriggerBrushTool() {
    //     togglePaletteMode(false);
    //     selectTool(5, triggerToolButton);
    // }

    // function clickPaletteButton() {
    //     paletteMode = !paletteMode;
    //     togglePaletteMode(paletteMode);
    // }

    // function clickImportMapButton() {

    //     if (!validateImportButton()) return;
    //     startRead();
    // }

    // function clickExportMapButton() {
    //     if (!validateExportButton()) return;
    //     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(createMapObject()));
    //     var dlAnchorElem = document.getElementById('HiddenDownloadAnchor');
    //     dlAnchorElem.setAttribute("href", dataStr);
    //     dlAnchorElem.setAttribute("download", mapNameInput.value + ".json");
    //     dlAnchorElem.click();
    // }

    // function clickLayersToolBarButton() {
    //     showLayersToolBar = !showLayersToolBar;
    //     toggleToolBar(showLayersToolBar, layersToolBarElement, layersToolBarButtonElement);
    // }

    // function clickMapToolBarButton() {
    //     showMapToolBar = !showMapToolBar;
    //     toggleToolBar(showMapToolBar, mapToolBarElement, mapToolBarButtonElement);
    // }

    // function clickTilesToolBarButton() {
    //     showTilesToolBar = !showTilesToolBar;
    //     toggleToolBar(showTilesToolBar, tilesToolBarElement, tilesToolBarButtonElement);
    // }

    // function clickOptionsToolBarButton() {
    //     showTilesToolBar = !showTilesToolBar;
    //     toggleToolBar(showTilesToolBar, optionsToolBarElement, optionsToolBarButtonElement);
    // }

    // function clickTriggersToolBarButton() {
    //     showTriggersToolBar = !showTriggersToolBar;
    //     toggleToolBar(showTriggersToolBar, triggersToolBarElement, triggersToolBarButtonElement);
    // }

    // function clickEventsToolBarButton() {
    //     showEventsToolBar = !showEventsToolBar;
    //     toggleToolBar(showEventsToolBar, eventsToolBarElement, eventsToolBarButtonElement);
    // }

    // function clickActionsToolBarButton() {
    //     showActionsToolBar = !showActionsToolBar;
    //     toggleToolBar(showActionsToolBar, actionsToolBarElement, actionsToolBarButtonElement);
    // }

    // function clickConditionsToolBarButton() {
    //     showConditionsToolBar = !showConditionsToolBar;
    //     toggleToolBar(showConditionsToolBar, conditionsToolBarElement, conditionsToolBarButtonElement);
    // }

    // function clickParamsToolBarButton() {
    //     showParamsToolBar = !showParamsToolBar;
    //     toggleToolBar(showParamsToolBar, paramsToolBarElement, paramsToolBarButtonElement);
    // }

    // function onFocusInput() {
    //     inputLocked = true;
    // }

    // function onBlurInput() {
    //     inputLocked = false;
    // }

    // function validateExportButton() {
    //     if (mapNameInput.value == null || mapNameInput.value == "") {
    //         mapNameInput.style.borderColor = 'red';
    //         return false;
    //     }
    //     else {
    //         mapNameInput.style.borderColor = '#33aa33';
    //         return true;
    //     }
    // }

    // function validateImportButton() {
    //     if (fileInput.value == null || fileInput.value == "") {
    //         fileInput.style.borderColor = 'red';
    //         return false;
    //     }
    //     else {
    //         fileInput.style.borderColor = '#33aa33';
    //         return true;
    //     }
    // }

    // function togglePaletteMode(on) {
    //     paletteMode = on;
    //     if (on) {
    //         movePalette();
    //         selectTool(2, eyedropperToolButton);
    //     }
    // }

    // function toggleContextMenu() {
    //     if (contextMenu.style.width != "200px") {
    //         contextMenu.style.width = "200px";
    //     }
    //     else {
    //         contextMenu.style.width = "0px";
    //     }
    // }


    // function resetTools() {
    //     toggleClass(eraserToolButton, false, "selected");
    //     toggleClass(eyedropperToolButton, false, "selected");
    //     toggleClass(wallSliceToolButton, false, "selected");
    //     toggleClass(nineSliceToolButton, false, "selected");
    //     toggleClass(triggerToolButton, false, "selected");
    //     toggleClass(brushToolButton, false, "selected");
    // }

    // function selectTool(toolIndex, selectedToolElement) {
    //     selectedTool = toolIndex;
    //     var cursor = "default";
    //     switch (selectedTool) {
    //         case 0:
    //             cursor = "default";
    //             break;
    //         case 1: case 5:
    //             cursor = "crosshair";
    //             break;
    //         case 2:
    //             cursor = "help";
    //             break;
    //         case 3:
    //             cursor = "nwse-resize";
    //             break;
    //         case 4:
    //             cursor = "nwse-resize";
    //             break;
    //     }
    //     ctx.canvas.style.cursor = cursor;
    //     resetTools();
    //     toggleClass(selectedToolElement, true, "selected");
    // }


    // function mouseUpHandler() {
    //     if (mouseX < 0 || mouseY < 0) return;
    //     mouseDown = false;
    // }

    // function mouseDownHandler() {
    //     if (mouseX < 0 || mouseY < 0) return;
    //     mouseDown = true;

    // }

    // function mouseClickHandler(e) {
    //     if (mouseX < 0 || mouseY < 0) return;
    //     if (selectedTool == 0)
    //         brushClickHandler();
    //     else if (selectedTool == 1)
    //         eraserClickHandler();
    //     else if (selectedTool == 2)
    //         eyedropperClick();
    //     else if (selectedTool == 3)
    //         nineSliceClickHandler();
    //     else if (selectedTool == 4)
    //         wallSliceClickHandler();
    //     else if (selectedTool == 5)
    //         triggerBrushClickHandler();
    //     else if (selectedTool == 6)
    //         eventBrushClickHandler();
    //     else if (selectedTool == 7)
    //         actionBrushClickHandler();
    // }


    // function eyedropperClick() {
    //     resetBrushTool();
    //     if (paletteMode) {
    //         palette.forEach(function (tile, index) {
    //             if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
    //                 updatePaintBrushPreviewFromEyedropper(tile);
    //             }
    //         });
    //     }
    //     else {
    //         layers[currentLayer].tiles.forEach(function (tile, index) {
    //             if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
    //                 updateLastTile(currentLayer, tile);
    //                 updatePaintBrushPreviewFromEyedropper(tile);
    //             }
    //         });
    //     }
    // }

    // function mouseMoveHandler(e) {
    //     if (e.button != 0) return;
    //     if (mouseDown && brushTool.mode == 0) mouseClickHandler();
    //     if (e.layerX) {
    //         mouseX = Math.floor((e.layerX) / 32);
    //         mouseY = Math.floor((e.layerY) / 32);
    //     }
    // }

    // function keyPressHandler(event) {
    //     if (inputLocked) return;
    //     var key = String.fromCharCode(event.keyCode || event.charCode).toUpperCase();
    //     var shift = event.shiftKey;
    //     var ctrl = event.ctrlKey;
    //     switch (key) {
    //         case 'Q':
    //             toggleContextMenu();
    //             break;
    //         case 'B':
    //             clickPaintTool();
    //             break;
    //         case 'P': 
    //             clickPaletteButton();
    //             break;
    //         case 'X': 
    //             clickToggleXRay();
    //             break;
    //         case 'F': 
    //             clickToggleFog();
    //             break;
    //         case 'Z':
    //             clickTogglePerspective();
    //             break;
    //         case 'E': 
    //             clickEraserTool();
    //             break;
    //         case 'I': 
    //             clickEyedropperTool();
    //             break;
    //         case 'W': 
    //             clickWallSliceTool();
    //             break;
    //         case 'N': 
    //             clickNineSliceTool();
    //             break;
    //         case 'T':
    //             clickTriggerBrushTool();
    //             break;
    //         case 'S':
    //             clickSubtileTool();
    //             break;

    //     }
    // }

    // function createMapObject() {
    //     return {
    //         name: mapNameInput.value,
    //         layers: layers,
    //         palette: palette,
    //         triggers: triggers,
    //         gameState: gameState,
    //         playerState:playerState
    //     }
    // }

    // function startRead() {
    //     var file = fileInput.files[0];
    //     if (file) {
    //         getAsText(file);
    //     }
    // }

    // function getAsText(readFile) {
    //     var reader = new FileReader();
    //     reader.readAsText(readFile, "UTF-8");
    //     reader.onprogress = updateProgress;
    //     reader.onload = loaded;
    //     reader.onerror = errorHandler;
    // }

    // function updateProgress(evt) {
    //     if (evt.lengthComputable) {
    //         var loaded = (evt.loaded / evt.total);
    //         if (loaded < 1) {
    //         }
    //     }
    // }

    // function loaded(evt) {
    //     var fileString = evt.target.result;
    //     var map = JSON.parse(fileString);
    //     layers = map.layers;
    //     palette = map.palette;
    //     triggers = map.triggers;
    //     playerState = map.playerState;
    //     gameState = map.gameState;
    //     mapNameInput.placeholder = map.name;
    //     mapNameInput.value = "";
    //     updateLayersPreview();
    // }

    // function errorHandler(evt) {
    //     alert("Error reading file. " + evt.target.error.name);

    // }

    // function genID() {
    //     Math.random().toString(36).substr(2, 9);
    // }

    // function toggleClass(element, on, className) {
    //     if (on) element.classList.add(className);
    //     else element.classList.remove(className);
    // }

    // var addEvent = function (object, type, callback) {
    //     if (object == null || typeof (object) == 'undefined') return;
    //     if (object.addEventListener) {
    //         object.addEventListener(type, callback, false);
    //     } else if (object.attachEvent) {
    //         object.attachEvent("on" + type, callback);
    //     } else {
    //         object["on" + type] = callback;
    //     }
    // };

}