var layersToolBarElement = document.getElementById("LayersToolBar"),
    layersToolBarButtonElement = document.getElementById("LayersToolBarButton"),
    tilesToolBarElement = document.getElementById("TilesToolBar"),
    tilesToolBarButtonElement = document.getElementById("TilesToolBarButton"),
    optionsToolBarElement = document.getElementById("OptionsToolBar"),
    optionsToolBarButtonElement = document.getElementById("OptionsToolBarButton"),
    mapToolBarElement = document.getElementById("MapToolBar"),
    mapToolBarButtonElement = document.getElementById("MapToolBarButton"),
    paintBrushInputX = document.getElementById("PaintBrushInputX"),
    paintBrushInputY = document.getElementById("PaintBrushInputY"),
    renameLayerInput = document.getElementById("RenameLayerInput"),
    reorderLayerInput = document.getElementById("ReorderLayerInput"),
    brushToolButton = document.getElementById("BrushToolButton"),
    eraserToolButton = document.getElementById("EraserToolButton"),
    nineSliceToolButton = document.getElementById("NineSliceToolButton"),
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
    resourceName = document.getElementById("ResourceName"),
    lastTilePreview = document.getElementById("LastTilePreview"),
    showLayersToolBar = false,
    showTilesToolBar = false,
    showMapToolBar = false,
    paletteMode = false,
    selectedTool = 0,
    lastTile = null,
    copiedLayer = null,
    isMouseDown = false,
    currentLayer = 0,
    layers = [],
       palette = [],
       showFog = false,
       perspectiveView = false,
       xRayView = false,
    sprites = new Image(),
    sprites2 = new Image(),
    mouseX = 0,
    mouseY = 0,
    sliceTool = { state: 0, mode: 0, xPos1: 0, yPos1: 0, xPos2: 0, yPos2: 0 };


var selectedBrushX = 0, selectedBrushY = 0;
var sx, sy = 0;

sprites.src = './spritesheet.png';
var c = document.getElementsByTagName('canvas')[0],
    ctx = c.getContext('2d'),
    cw = 2048,
    ch = 2048,
    mx = 0,
    my = 0;
ctx.canvas.height = cw;
ctx.canvas.width = ch;

function clickAddLayer() {
    layers.splice(currentLayer+1,0,createLayer("layer" + layers.length, layers.length));
    currentLayer = currentLayer+1;
    updateLayersPreview();
}

function clickDeleteLayer() {
    if (layers.length <= 1) return;
    layers.splice(currentLayer, 1);
    currentLayer--;
    updateLayersPreview();
}

function clickClearLayer() {
    layers[currentLayer].tiles = [];
    updateLayersPreview();
}

function clickMoveUpLayerButton() {
    if (currentLayer + 1 >= layers.length) {
        return;
    }
    currentLayer++;
    updateLayersPreview();
}

function clickMoveDownLayerButton() {
    if (currentLayer - 1 < 0) {
        return;
    }
    currentLayer--;
    updateLayersPreview();
}

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

function clickPaletteButton() {
    paletteMode = !paletteMode;
    togglePaletteMode(paletteMode);
}

function clickRenameLayer() {
    layers[currentLayer].name = renameLayerInput.value;
    updateLayersPreview();
}

function clickReorderLayer() {
    layers[currentLayer].order = reorderLayerInput.value;
    updateLayersPreview();
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
function createMapObject()
{
    return {
        name:mapNameInput.value,
        layers:layers
    }
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

function clickSelectLayer(layerIndex) {


    currentLayer = layerIndex;
    updateLayersPreview();
}

function clickRenameSelectedTile() {
    if (lastTile == null) return;
    lastTile.resourceName = resourceName.value;
}

function clickRenameAllMatchingTiles() {
    if (lastTile == null) return;
    tiles.forEach(function (tile, tileIndex) {
        if (tile.xIndex == lastTile.xIndex && tile.yIndex == lastTile.yIndex)
            tile.resourceName = resourceName.value;
    });
}

function clickCopyLayer() {
    copiedLayer = currentLayer;
}

function clickPasteLayer() {
    layers[currentLayer].tiles = layers[copiedLayer].tiles.slice();
    layers[currentLayer].name = layers[copiedLayer].name;
    updateLayersPreview();
}

function renameTile(tile, name) {

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
        initPalette();
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

function updateLayersPreview() {
    layersPreview.innerHTML = generateLayersPreviewHtml();
    renameLayerInput.value = layers[currentLayer].name;
    reorderLayerInput.value = layers[currentLayer].order;
    toggleToolBar(true, layersToolBarElement, layersToolBarButtonElement);
}

function generateLayersPreviewHtml() {
    var rows = "";
    layers.forEach(function (layer, index) {
        var classes = "button" + (currentLayer == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectLayer(" + index + ")'>" + layer.name + " (" + layer.order + ") </div>";
    });
    return "<div>" + rows + "</div>";
}

function updateLastTilePreview() {
    lastTilePreview.style.background = "url(" + sprites.src + ") -" + lastTile.tile.xIndex * 16 + "px -" + lastTile.tile.yIndex * 16 + "px";
}

function updatePaintBrushPreview() {
    selectedBrushX = paintBrushInputX.value == "" ? 0 : parseInt(paintBrushInputX.value);
    selectedBrushY = paintBrushInputY.value == "" ? 0 : parseInt(paintBrushInputY.value);
    paintBrushPreview.style.background = "url(" + sprites.src + ") -" + selectedBrushX * 16 + "px -" + selectedBrushY * 16 + "px";
}

function updatePaintBrushPreviewFromEyedropper(tile) {
    paintBrushInputX.value = tile.xIndex;
    paintBrushInputY.value = tile.yIndex;
    updatePaintBrushPreview();
}

function toggleToolBar(show, toolBarElement, buttonElement) {
    buttonElement.innerHTML = show ? " - " : " + ";
    toolBarElement.style.height = show ? toolBarElement.scrollHeight + "px" : "34px";
}

function selectTool(toolIndex, selectedToolElement) {
    selectedTool = toolIndex;
    var cursor = "default";
    switch (selectedTool) {
        case 0:
            cursor = "default";
            break;
        case 1:
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

function resetTools() {
    toggleClass(eraserToolButton, false, "selected");
    toggleClass(eyedropperToolButton, false, "selected");
    toggleClass(wallSliceToolButton, false, "selected");
    toggleClass(nineSliceToolButton, false, "selected");
    toggleClass(brushToolButton, false, "selected");
}

function clear() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, cw, ch);
}

function drawLoop() {
    clear();

    if (paletteMode) {
        drawPalette();
    }
    else {
        drawLayers();
    }
    if (selectedTool == 0) {
        drawSprite(sprites, mouseX, mouseY, selectedBrushX, selectedBrushY);
        ctx.fillStyle = "#33aa33";
        ctx.fillText("( " + mouseX + ", " + mouseY + " )", mouseX * 16 + 20, mouseY * 16 + 20);
    }
    if (selectedTool == 3) {
        if (sliceTool.state == 0) {

            drawSprite(sprites, mouseX, mouseY, selectedBrushX, selectedBrushY);
        }
        else {
            drawSprite(sprites, sliceTool.xPos1, sliceTool.yPos1, selectedBrushX, selectedBrushY);
            drawSprite(sprites, mouseX, mouseY, selectedBrushX + 2, selectedBrushY + 2);
        }
        ctx.fillStyle = "#33aa33";
        ctx.fillText("( " + mouseX + ", " + mouseY + " )", mouseX * 16 + 20, mouseY * 16 + 20);
    }
    if (selectedTool == 4) {
        if (sliceTool.state == 0) {

            drawSprite(sprites, mouseX + 1, mouseY + 1, selectedBrushX, selectedBrushY);
        }
        else {
            drawSprite(sprites, sliceTool.xPos1 + 1, sliceTool.yPos1 + 1, selectedBrushX, selectedBrushY);
            drawSprite(sprites, mouseX - 1, mouseY - 1, selectedBrushX + 2, selectedBrushY + 2);
        }
        ctx.fillStyle = "#33aa33";
        ctx.fillText("( " + mouseX + ", " + mouseY + " )", mouseX * 16 + 20, mouseY * 16 + 20);
    }
}

function drawLayers() {

    var mouseXoffset = mouseX - (sx);
    var mouseYoffset = mouseY - (sy);
    if (layers == null || layers[currentLayer] == null) return;
    ctx.globalAlpha = 1;
    layers.forEach(function (layer, index) {
        if (layers[currentLayer].order >= layer.order) {
            if (layers[currentLayer].order == layer.order && xRayView)
                ctx.globalAlpha = 0.9;
            if (layers[currentLayer].order == layer.order && currentLayer != index && xRayView)
                ctx.globalAlpha = 0.4;

            if (perspectiveView) {
                var offsetIndex = layers[currentLayer].order - (layer.order);
                drawTilesOff(layer, -(mouseXoffset * offsetIndex / 2), -mouseYoffset * offsetIndex /2);
            }
            else {
                drawTiles(layer);
            }
            if (layers[currentLayer].order != layer.order && showFog)
                drawLayerFog();
          
        }
        else if (xRayView) {
            ctx.globalAlpha = ctx.globalAlpha * 0.3;
            if (perspectiveView) {
                var offsetIndex = (layer.order) - layers[currentLayer].order;
                drawTilesOff(layer, (mouseXoffset * offsetIndex / 2), mouseYoffset * offsetIndex / 2);
            }
            else {
                drawTiles(layer);
            }
        }
    });
    ctx.globalAlpha = 1;
}

function drawLayerFog() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";

    ctx.fillRect(0, 0, cw, ch);
}

function drawTiles(layer) {

    layer.tiles.forEach(function (tile) {
        drawSprite(sprites, tile.xPosition, tile.yPosition, tile.xIndex, tile.yIndex);
    });
}

function drawTilesOff(layer, xoff, yoff) {

    layer.tiles.forEach(function (tile) {

        drawSpriteOff(sprites, tile.xPosition, tile.yPosition, tile.xIndex, tile.yIndex, xoff, yoff);
    });
}

function drawPalette() {
    palette.forEach(function (tile) {
        drawSprite(sprites, tile.xPosition, tile.yPosition, tile.xIndex, tile.yIndex);
    });
}

function drawTile(index, x, y) {
    switch (index) {
        case 0://water
            drawSprite(sprites, x, y, 30, 5);
            break;
        case 1:
            drawSprite(sprites, x, y, 29, 4);
            break;
        case 2:
            drawSprite(sprites, x, y, 31, 6);
            break;
        case 3:
            drawSprite(sprites, x, y, 30, 4);
            break;
        case 4:
            drawSprite(sprites, x, y, 30, 6);
            break;
        case 5:
            drawSprite(sprites, x, y, 29, 5);
            break;
    }
}

function drawSprite(spriteSheet, x, y, xindex, yindex) {
    ctx.drawImage(spriteSheet, xindex * 16, yindex * 16, 16, 16, x * 16, y * 16, 16, 16);
}

function drawSpriteOff(spriteSheet, xpos, ypos, xindex, yindex, xoff, yoff) {
    var x = Math.floor(xpos * 16 + xoff);
    var y = Math.floor(ypos * 16 + yoff);
    ctx.drawImage(spriteSheet, xindex * 16, yindex * 16, 16, 16, x, y, 16, 16);
}

function startRead() {
    var file = fileInput.files[0];
    if (file) {
        getAsText(file);
    }
    //mapNameInput.value = fileInput.value.replace(/^.*[\\\/]/, '');
}

function getAsText(readFile) {

    var reader = new FileReader();

    reader.readAsText(readFile, "UTF-8");

    // Handle progress, success, and errors
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
}

function updateProgress(evt) {
    if (evt.lengthComputable) {
        // evt.loaded and evt.total are ProgressEvent properties
        var loaded = (evt.loaded / evt.total);
        if (loaded < 1) {
        }
    }
}

function loaded(evt) {
    // Obtain the read file data
    var fileString = evt.target.result;
   // layers = JSON.parse(fileString);
    var map = JSON.parse(fileString);
    layers = map.layers;
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

function createLayer(name, order) {
    return { name: name, order: layers.length, tiles: [] };
}

function mouseUpHandler() {
    if (mouseX < 0 || mouseY < 0) return;
    isMouseDown = false;
}

function mouseDownHandler() {
    if (mouseX < 0 || mouseY < 0) return;
    isMouseDown = true;

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
}

function nineSliceClickHandler() {
    sliceTool.mode = 0;
    sliceTool.state = sliceTool.state == 0 ? 1 : 0;

    if (sliceTool.state == 1) {
        sliceTool.xPos1 = mouseX;
        sliceTool.yPos1 = mouseY;
    }

    if (sliceTool.state == 0) {
        sliceTool.xPos2 = mouseX;
        sliceTool.yPos2 = mouseY;
        addSlicedTiles();
    }

}

function wallSliceClickHandler() {

    sliceTool.mode = 1;
    sliceTool.state = sliceTool.state == 0 ? 1 : 0;

    if (sliceTool.state == 1) {
        sliceTool.xPos1 = mouseX;
        sliceTool.yPos1 = mouseY;
    }

    if (sliceTool.state == 0) {
        sliceTool.xPos2 = mouseX;
        sliceTool.yPos2 = mouseY;
        addSlicedTiles();
    }

}

function addSlicedTiles() {
    var upperBoundX = sliceTool.xPos1 > sliceTool.xPos2 ? sliceTool.xPos1 : sliceTool.xPos2;
    var lowerBoundX = sliceTool.xPos1 < sliceTool.xPos2 ? sliceTool.xPos1 : sliceTool.xPos2;
    var upperBoundY = sliceTool.yPos1 > sliceTool.yPos2 ? sliceTool.yPos1 : sliceTool.yPos2;
    var lowerBoundY = sliceTool.yPos1 < sliceTool.yPos2 ? sliceTool.yPos1 : sliceTool.yPos2;

    for (var x = lowerBoundX; x <= upperBoundX; x++) {
        for (var y = lowerBoundY; y <= upperBoundY; y++) {
            addSlicedTileToCurrentLayer(parseInt(paintBrushInputX.value), parseInt(paintBrushInputY.value), x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY)
        }
    }
}

function addSlicedTileToCurrentLayer(xIndex, yIndex, x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY) {

    var offset;

    if (sliceTool.mode == 0)
        offset = getIndexOffsetForNineSlicedTile(x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY);
    else if (sliceTool.mode == 1)
        offset = getIndexOffsetForWallSlicedTile(x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY);
    if (offset == null) return;
    addTileToCurrentLayer(xIndex + offset[0], yIndex + offset[1], x, y);
}
function getIndexOffsetForWallSlicedTile(x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY) {


    //empty corners - return null
    if ((x == lowerBoundX && y == lowerBoundY) || (x == lowerBoundX + 1 && y == lowerBoundY) || (x == lowerBoundX && y == lowerBoundY + 1) ||
        (x == upperBoundX && y == lowerBoundY) || (x == upperBoundX - 1 && y == lowerBoundY) || (x == upperBoundX && y == lowerBoundY + 1) ||
        (x == lowerBoundX && y == upperBoundY) || (x == lowerBoundX && y == upperBoundY - 1) || (x == lowerBoundX + 1 && y == upperBoundY) ||
        (x == upperBoundX && y == upperBoundY) || (x == upperBoundX - 1 && y == upperBoundY) || (x == upperBoundX && y == upperBoundY - 1)
        ) { // upper left
        return null;
    }

    //corners
    if (x == lowerBoundX + 1 && y == lowerBoundY + 1) { // upper left
        return [0, 0];
    }
    if (x == upperBoundX - 1 && y == lowerBoundY + 1) { //upper right
        return [2, 0];
    }
    if (x == lowerBoundX + 1 && y == upperBoundY - 1) { //bottom left
        return [0, 2];
    }
    if (x == upperBoundX - 1 && y == upperBoundY - 1) { //bottom right
        return [2, 2];
    }

    //edges
    if (x == lowerBoundX && y != lowerBoundY && y != upperBoundY) { //west
        return [0, 1];
    }
    if (x == upperBoundX && y != lowerBoundY && y != upperBoundY) {//east
        return [2, 1];
    }
    if (y == lowerBoundY && x != lowerBoundX && x != upperBoundX) {//north
        return [1, 0];
    }
    if (y == upperBoundY && x != lowerBoundX && x != upperBoundX) {//south
        return [1, 2];
    }
    //middle
    if (x != lowerBoundX && x != upperBoundX && y != lowerBoundY && y != upperBoundY) {
        return null;
    }

    return [xIndexOffset, yIndexOffset];
}
function getIndexOffsetForNineSlicedTile(x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY) {
    var xIndexOffset, yIndexOffset;
    //corners
    if (x == lowerBoundX && y == lowerBoundY) { // upper left
        xIndexOffset = 0;
        yIndexOffset = 0;
    }
    if (x == upperBoundX && y == lowerBoundY) { //upper right
        xIndexOffset = 2;
        yIndexOffset = 0;
    }
    if (x == lowerBoundX && y == upperBoundY) { //bottom left
        xIndexOffset = 0;
        yIndexOffset = 2;
    }
    if (x == upperBoundX && y == upperBoundY) { //bottom right
        xIndexOffset = 2;
        yIndexOffset = 2;
    }

    //edges
    if (x == lowerBoundX && y != lowerBoundY && y != upperBoundY) { //west
        xIndexOffset = 0;
        yIndexOffset = 1;
    }
    if (x == upperBoundX && y != lowerBoundY && y != upperBoundY) {//east
        xIndexOffset = 2;
        yIndexOffset = 1;
    }
    if (y == lowerBoundY && x != lowerBoundX && x != upperBoundX) {//north
        xIndexOffset = 1;
        yIndexOffset = 0;
    }
    if (y == upperBoundY && x != lowerBoundX && x != upperBoundX) {//south
        xIndexOffset = 1;
        yIndexOffset = 2;
    }

    //middle
    if (x != lowerBoundX && x != upperBoundX && y != lowerBoundY && y != upperBoundY) {
        xIndexOffset = 1;
        yIndexOffset = 1;
    }
    return [xIndexOffset, yIndexOffset];
}

function brushClickHandler() {

    addTileToCurrentLayer(paintBrushInputX.value, paintBrushInputY.value, mouseX, mouseY);

}

function addTileToCurrentLayer(xIndex, yIndex, xPosition, yPosition) {
    var matched = false;
    layers[currentLayer].tiles.forEach(function (tile) {
        if (tile.xPosition == xPosition && tile.yPosition == yPosition) {
            tile.xIndex = xIndex;
            tile.yIndex = yIndex;
            updateLastTile(currentLayer, tile);
            matched = true;
        }
    });
    if (matched) return;
    var newTile = {
        xIndex: xIndex,
        yIndex: yIndex,
        xPosition: xPosition,
        yPosition: yPosition
    };

    layers[currentLayer].tiles.push(newTile);
    updateLastTile(currentLayer, newTile);
}

function eraserClickHandler() {
    layers[currentLayer].tiles.forEach(function (tile, index) {
        if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
            layers[currentLayer].tiles.splice(index, 1);
        }
    });
}

function eyedropperClick() {
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

function updateLastTile(layerIndex, tile) {
    lastTile = { layerIndex: layerIndex, tile: tile };
    updateLastTilePreview();
    tileInfo.innerHTML = generateHTMLForTile(tile);
}

function generateHTMLForTile(tile) {
    return "<table>" +
        "<tr><td> x: " + tile.xPosition +
        "</td><td> y: " + tile.yPosition + "</td></tr>" +
        "<tr></td>" +
        "</td><td>" +
    "</td></tr>" +
    "</table>";
}

function mouseMoveHandler(e) {
    if (e.button != 0) return;
    if (isMouseDown) mouseClickHandler();
    if (e.screenX) {
        mouseX = Math.floor((e.pageX-window.innerWidth/2) / 32);
        mouseY = Math.floor((e.pageY-window.innerHeight/2) / 32);
    }
    else if (e.layerX) {
        mouseX = Math.floor((e.layerX) / 32);
        mouseY = Math.floor((e.layerY) / 32);
    }
}

function keyPressHandler(event) {
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
    }
}

function init() {
    window.onload = function () {
        document.addEventListener('mousemove', mouseMoveHandler);
        ctx.canvas.addEventListener('click', mouseClickHandler);
        var lastDownTarget = null;

        document.addEventListener('keypress', function (event) {
            keyPressHandler(event);
        }, false);

        ctx.canvas.addEventListener('mouseup', mouseUpHandler);
        ctx.canvas.addEventListener('mousedown', mouseDownHandler);
    }

    initPalette();
    layers.push(createLayer("layer 0", 0));
    updateLayersPreview();
    sy = Math.floor(document.body.scrollTop / 32);
    sx = Math.floor(document.body.scrollLeft / 32);

    addEvent(window, "scroll", function () {
        sy = Math.floor(document.body.scrollTop / 32);
        sx = Math.floor(document.body.scrollLeft / 32);
    });

    toggleToolBar(true, tilesToolBarElement, tilesToolBarButtonElement);
    toggleToolBar(true, layersToolBarElement, layersToolBarButtonElement);
    clickPaintTool();
    setInterval(loop, 16);
}

function initPalette() {
    palette = [];
    var w = 37;
    var h = 28;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            palette.push({
                xIndex: x,
                yIndex: y,
                xPosition: x + sx,
                yPosition: y + sy
            });
        }
    }
}

var loop = function () {
    drawLoop();
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

init();
