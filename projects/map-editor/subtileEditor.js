var subtileMode = false;

function clickSubtileTool() {
    togglePaletteMode(false);
    selectTool(0, subtileBrushToolButton);
    layers[currentLayer].tiles.forEach(function (tile, index) {
        if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
            updateLastTile(currentLayer, tile);
            startSubtileMode();
        }
    });
    if (lastTile.Subtiles == null)
    {
        lastTile.Subtiles = [];
    }

    if (paletteMode || subtileMode) {
        return;
    }

    lastTile.Subtiles.forEach(function (tile, index) {
        if (tile.xPosition == mouseX && tile.yPosition == mouseY) {
            updateLastTile(currentLayer, tile);
            startSubtileMode();
        }
    });
}

function startSubtileMode()
{
    subtileMode = true;

}

function finishSubtileMode()
{

}