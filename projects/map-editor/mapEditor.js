var currentLayer = 0,
paletteMode = false,
lastTile = null,
copiedLayer = null,
layers = [],
palette = [],
showFog = false,
perspectiveView = false,
xRayView = false,
sprites = new Image(),
sprites2 = new Image(),
mouseX = 0,
mouseY = 0, selectedBrushX = 0, selectedBrushY = 0
brushTool = { state: 0, mode: 0, xPos1: 0, yPos1: 0, xPos2: 0, yPos2: 0 };
sprites.src = './spritesheet.png';

function clickSelectLayer(layerIndex) {
    currentLayer = layerIndex;
    updateLayersPreview();
}

function clickRenameTile() {
    var x = parseInt(paintBrushInputX.value);
    var y = parseInt(paintBrushInputY.value);
    palette.forEach(function (ptile, tileIndex) {
        if (ptile.xIndex == x && ptile.yIndex == y)
            palette[tileIndex].name = renameTileInput.value;
    });

    tileInfo.innerHTML = generateHTMLForTile(tile);
}

function clickCopyLayer() {
    copiedLayer = currentLayer;
}

function clickPasteLayer() {
    layers[currentLayer].tiles = JSON.parse(JSON.stringify(layers[copiedLayer].tiles));
    layers[currentLayer].name = layers[copiedLayer].name;
    updateLayersPreview();
}

function clickAddLayer() {
    layers.splice(currentLayer + 1, 0, createLayer("layer" + layers.length, layers.length));
    currentLayer = currentLayer + 1;
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

function clickRenameLayer() {
    layers[currentLayer].name = renameLayerInput.value;
    updateLayersPreview();
}

function clickReorderLayer() {
    layers[currentLayer].order = reorderLayerInput.value;
    updateLayersPreview();
}

function drawMapLoop() {
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
        if (brushTool.state == 0) {

            drawSprite(sprites, mouseX, mouseY, selectedBrushX, selectedBrushY);
        }
        else {
            drawSprite(sprites, brushTool.xPos1, brushTool.yPos1, selectedBrushX, selectedBrushY);
            drawSprite(sprites, mouseX, mouseY, selectedBrushX + 2, selectedBrushY + 2);
        }
        ctx.fillStyle = "#33aa33";
        ctx.fillText("( " + mouseX + ", " + mouseY + " )", mouseX * 16 + 20, mouseY * 16 + 20);
    }
    if (selectedTool == 4) {
        if (brushTool.state == 0) {

            drawSprite(sprites, mouseX + 1, mouseY + 1, selectedBrushX, selectedBrushY);
        }
        else {
            drawSprite(sprites, brushTool.xPos1 + 1, brushTool.yPos1 + 1, selectedBrushX, selectedBrushY);
            drawSprite(sprites, mouseX - 1, mouseY - 1, selectedBrushX + 2, selectedBrushY + 2);
        }
        ctx.fillStyle = "#33aa33";
        ctx.fillText("( " + mouseX + ", " + mouseY + " )", mouseX * 16 + 20, mouseY * 16 + 20);
    }
}

function drawLayers() {


    if (layers == null || layers[currentLayer] == null) return;
    ctx.globalAlpha = 1;
    layers.forEach(function (layer, index) {
        if (layers[currentLayer].order >= layer.order) {
            if (layers[currentLayer].order == layer.order && xRayView)
                ctx.globalAlpha = 0.9;
            if (layers[currentLayer].order == layer.order && currentLayer != index && xRayView)
                ctx.globalAlpha = 0.4;

            drawLayer(layer);
            if (layers[currentLayer].order != layer.order && showFog)
                drawLayerFog();

        }
        else if (xRayView) {
            ctx.globalAlpha = ctx.globalAlpha * 0.3;
            drawLayer(layer);
        }
    });
    ctx.globalAlpha = 1;
}

function drawLayer(layer) {
    if (perspectiveView) {
        var currentOrder = layers[currentLayer].order;
        var offsetIndex = layer.order - currentOrder;
        var direction = currentOrder >= layer.order;
        var mouseXoffset = mouseX - (sx);
        var mouseYoffset = mouseY - (sy);
        var offX = (mouseXoffset * offsetIndex / 2) * (direction ? 1 : -1);
        var offY = (mouseYoffset * offsetIndex / 2) * (direction ? 1 : -1);
        drawTilesOff(layer, offX, offY);
    }
    else {
        drawTiles(layer);
    }
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

function drawSprite(spriteSheet, x, y, xindex, yindex) {
    ctx.drawImage(spriteSheet, xindex * 16, yindex * 16, 16, 16, x * 16, y * 16, 16, 16);
}

function drawSpriteOff(spriteSheet, xpos, ypos, xindex, yindex, xoff, yoff) {
    var x = Math.floor(xpos * 16 + xoff);
    var y = Math.floor(ypos * 16 + yoff);
    ctx.drawImage(spriteSheet, xindex * 16, yindex * 16, 16, 16, x, y, 16, 16);
}

function updatePaintBrushPreview() {
    selectedBrushX = paintBrushInputX.value == "" ? 0 : parseInt(paintBrushInputX.value);
    selectedBrushY = paintBrushInputY.value == "" ? 0 : parseInt(paintBrushInputY.value);
    renameTileInput.value = getPaletteName(selectedBrushX, selectedBrushY);
    paintBrushPreview.style.background = "url(" + sprites.src + ") -" + selectedBrushX * 16 + "px -" + selectedBrushY * 16 + "px";
}

function updatePaintBrushPreviewFromEyedropper(tile) {
    paintBrushInputX.value = tile.xIndex;
    paintBrushInputY.value = tile.yIndex;
    updatePaintBrushPreview();
}

function updateLastTile(layerIndex, tile) {
    lastTile = { layerIndex: layerIndex, tile: tile };
    var name = getTileName(lastTile.tile);
    if (name != null && name != undefined)
        renameTileInput.value = name;
    else
        renameTileInput.value = "";
    updateLastTilePreview();
    tileInfo.innerHTML = generateHTMLForTile(tile);
}

function updateLayersPreview() {
    layersPreview.innerHTML = generateHTMLForLayersPreview();
    renameLayerInput.value = layers[currentLayer].name;
    reorderLayerInput.value = layers[currentLayer].order;

    toggleToolBar(false, layersToolBarElement, layersToolBarButtonElement);
    toggleToolBar(true, layersToolBarElement, layersToolBarButtonElement);
}

function brushClickHandler() {
    resetBrushTool();
    addTileToCurrentLayer(paintBrushInputX.value, paintBrushInputY.value, mouseX, mouseY);
}

function nineSliceClickHandler() {
    brushTool.mode = 1;
    brushTool.state = brushTool.state == 0 ? 1 : 0;

    if (brushTool.state == 1) {
        brushTool.xPos1 = mouseX;
        brushTool.yPos1 = mouseY;
    }

    if (brushTool.state == 0) {
        brushTool.xPos2 = mouseX;
        brushTool.yPos2 = mouseY;
        addSlicedTiles();
    }
}

function wallSliceClickHandler() {

    brushTool.mode = 2;
    brushTool.state = brushTool.state == 0 ? 1 : 0;

    if (brushTool.state == 1) {
        brushTool.xPos1 = mouseX;
        brushTool.yPos1 = mouseY;
    }

    if (brushTool.state == 0) {
        brushTool.xPos2 = mouseX;
        brushTool.yPos2 = mouseY;
        addSlicedTiles();
    }
}

function eraserClickHandler() {
    resetBrushTool();
    layers[currentLayer].tiles.forEach(function (tile, index) {
        if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
            layers[currentLayer].tiles.splice(index, 1);
        }
    });
}

function updateLastTilePreview() {

    lastTilePreview.style.background = "url(" + sprites.src + ") -" + lastTile.tile.xIndex * 16 + "px -" + lastTile.tile.yIndex * 16 + "px";
}

function createLayer(name, order) {
    return { name: name, order: layers.length, tiles: [] };
}

function addSlicedTiles() {
    var upperBoundX = brushTool.xPos1 > brushTool.xPos2 ? brushTool.xPos1 : brushTool.xPos2;
    var lowerBoundX = brushTool.xPos1 < brushTool.xPos2 ? brushTool.xPos1 : brushTool.xPos2;
    var upperBoundY = brushTool.yPos1 > brushTool.yPos2 ? brushTool.yPos1 : brushTool.yPos2;
    var lowerBoundY = brushTool.yPos1 < brushTool.yPos2 ? brushTool.yPos1 : brushTool.yPos2;

    for (var x = lowerBoundX; x <= upperBoundX; x++) {
        for (var y = lowerBoundY; y <= upperBoundY; y++) {
            addSlicedTileToCurrentLayer(parseInt(paintBrushInputX.value), parseInt(paintBrushInputY.value), x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY)
        }
    }
}

function addSlicedTileToCurrentLayer(xIndex, yIndex, x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY) {

    var offset;

    if (brushTool.mode == 1)
        offset = getIndexOffsetForNineSlicedTile(x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY);
    else if (brushTool.mode == 2)
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

function generateHTMLForLayersPreview() {
    var rows = "";
    layers.forEach(function (layer, index) {
        var classes = "button" + (currentLayer == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectLayer(" + index + ")'>" + layer.name + " (" + layer.order + ") </div>";
    });
    return "<div>" + rows + "</div>";
}

function generateHTMLForTile(tile) {
    return "<table>" +
    "<tr><td> x: " + tile.xPosition +
    "</td><td> y: " + tile.yPosition + "</td></tr>" +
    "</td><td> name: " + getTileName(tile) + "</td></tr>" +
    "<tr></td>" +
    "</td><td>" +
    "</td></tr>" +
    "</table>";
}

function getPaletteName(x, y) {
    var result = "";
    palette.forEach(function (ptile, tileIndex) {
        if (ptile.xIndex == x && ptile.yIndex == y)
            result = ptile.name;
    });
    return result;
}

function getTileName(tile) {

    return getPaletteName(tile.xIndex, tile.yIndex);
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
                xPosition: x,
                yPosition: y,
                name: ""
            });
        }
    }
}

function movePalette() {
    palette.forEach(function (ptile) {
        ptile.xPosition = ptile.xIndex + (sx <= 12 ? 0 : sx - 12);
        ptile.yPosition = ptile.yIndex + (sy <= 12 ? 0 : sy - 12);
    });

}