angular.module('LegendaryMapApp').service('LegendaryMapLayerService', function ($http) {
    var copiedLayer = null;
    var layers = [];
    return {
        layers:layers,
        clickCopyLayer: function (currentLayer) {
            copiedLayer = currentLayer;
        },

        clickPasteLayer: function (currentLayer) {
            layers[currentLayer].tiles = JSON.parse(JSON.stringify(layers[copiedLayer].tiles));
            layers[currentLayer].name = layers[copiedLayer].name;
            updateLayersPreview();
        },

        clickAddLayer: function () {
            layers.splice(currentLayer + 1, 0, createLayer("layer" + layers.length, layers.length));
            currentLayer = currentLayer + 1;
            updateLayersPreview();
        },

        clickDeleteLayer: function () {
            if (layers.length <= 1) return;
            layers.splice(currentLayer, 1);
            currentLayer--;
            updateLayersPreview();
        },

        clickClearLayer: function () {
            layers[currentLayer].tiles = [];
            updateLayersPreview();
        },

        clickRenameLayer: function () {
            layers[currentLayer].name = renameLayerInput.value;
            updateLayersPreview();
        },

        clickReorderLayer: function () {
            layers[currentLayer].order = reorderLayerInput.value;
            updateLayersPreview();
        }

    };
});