
var loop = function () {
    drawMapLoop();
    drawTriggersLoop();
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
        AutoScrollOnload();
    }

    initPalette();
    layers.push(createLayer("layer 0", 0));
    updateLayersPreview();
    sy = Math.floor(scrollingElement.scrollTop / 32);
    sx = Math.floor(scrollingElement.scrollLeft / 32);

    addEvent(scrollingElement, "scroll", function () {
        sy = Math.floor(scrollingElement.scrollTop / 32);
        sx = Math.floor(scrollingElement.scrollLeft / 32);
    });
    paintBrushInputX.value = 0;
    paintBrushInputY.value = 0;
  //  toggleToolBar(true, tilesToolBarElement, tilesToolBarButtonElement);
   // toggleToolBar(true, layersToolBarElement, layersToolBarButtonElement);
    clickPaintTool();
    setInterval(loop, 16);
}

init();
