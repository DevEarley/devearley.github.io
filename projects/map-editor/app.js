var layersToolBarElement = document.getElementById("LayersToolBar"),
    layersToolBarButtonElement = document.getElementById("LayersToolBarButton"),
    toolsToolBarElement = document.getElementById("ToolsToolBar"),
    toolsToolBarButtonElement = document.getElementById("ToolsToolBarButton"),
    mapToolBarElement = document.getElementById("MapToolBar"),
    mapToolBarButtonElement = document.getElementById("MapToolBarButton"),
    paintBrushInputX = document.getElementById("PaintBrushInputX"),
    paintBrushInputY = document.getElementById("PaintBrushInputY"),
    brushToolButton = document.getElementById("BrushToolButton"),
    eraserToolButton = document.getElementById("EraserToolButton"),
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
    showToolsToolBar = false,
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
    sprites = new Image(),
    sprites2 = new Image(),
    mouseX = 0,
    mouseY = 0;

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
    layers.push(createLayer("layer" + layers.length, layers.length));
    currentLayer = layers.length - 1;
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

function clickTogglePerspective() {
    perspectiveView = !perspectiveView;
    showFog = perspectiveView;
} function clickToggleFog() {
    showFog = !showFog;
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
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(layers));
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

function clickToolsToolBarButton() {
    showToolsToolBar = !showToolsToolBar;
    toggleToolBar(showToolsToolBar, toolsToolBarElement, toolsToolBarButtonElement);
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
    lastTilePreview.style.background = "url(" + sprites.src + ") -" + lastTile.tile.xIndex * 16 + "px -" + lastTile.tile.xIndex * 16 + "px";
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
    }
    ctx.canvas.style.cursor = cursor;
    resetTools();
    toggleClass(selectedToolElement, true, "selected");
}

function resetTools() {
    toggleClass(eraserToolButton, false, "selected");
    toggleClass(eyedropperToolButton, false, "selected");
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
}

function drawLayers() {

    var mouseXoffset = mouseX - (sx + (cw / 128));
    var mouseYoffset = mouseY - (sy + (ch / 128));
    if (layers == null || layers[currentLayer] == null) return;
    layers.forEach(function (layer, index) {
        if (layers[currentLayer].order >= layer.order) {
            if (perspectiveView) {
                var offsetIndex = layers[currentLayer].order - (layer.order);
                drawTilesOff(layer, -mouseXoffset * offsetIndex / 5, -mouseYoffset * offsetIndex / 5);
            }
            else {
                drawTiles(layer);
            }
            if (layers[currentLayer].order != layer.order && showFog)
                drawLayerFog();
        }

    });
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
    mapNameInput.value = fileInput.value.replace(/^.*[\\\/]/, '');
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
    layers = JSON.parse(fileString);
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
    isMouseDown = false;
}

function mouseDownHandler() {
    isMouseDown = true;

}

function mouseClickHandler(e) {
    if (selectedTool == 0)
        brushClickHandler();
    else if (selectedTool == 1)
        eraserClickHandler();
    else if (selectedTool == 2)
        eyedropperClick();
}

function brushClickHandler() {
    var matched = false;
    layers[currentLayer].tiles.forEach(function (tile) {
        if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
            tile.xIndex = paintBrushInputX.value;
            tile.yIndex = paintBrushInputY.value;
            updateLastTile(currentLayer, tile);
            matched = true;
        }
    });
    if (matched) return;

    var newTile = {
        xIndex: paintBrushInputX.value,
        yIndex: paintBrushInputY.value,
        xPosition: mouseX,
        yPosition: mouseY
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
    if (e.offsetX) {
        mouseX = Math.floor(e.offsetX / 32);
        mouseY = Math.floor(e.offsetY / 32);
    }
    else if (e.layerX) {
        mouseX = Math.floor(e.layerX / 32);
        mouseY = Math.floor(e.layerY / 32);
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
        case 'E': case 'e':
            clickEraserTool();
            break;
        case 'I': case 'i':
            clickEyedropperTool();
            break;
    }
}

function init() {
    window.onload = function () {
        ctx.canvas.addEventListener('mousemove', mouseMoveHandler);
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
