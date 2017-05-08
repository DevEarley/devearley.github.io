import { autoinject } from 'aurelia-framework';
import { MapEditorTools } from "./map-editor-tools";
import { MapEditorTriggers } from "./map-editor-triggers";
import { MapEditorConditions } from "./map-editor-conditions";
import { MapEditorActions } from "./map-editor-actions";
import { MapEditorTiles } from "./map-editor-tiles";
import { MapEditorEvents } from "./map-editor-events";
import { MapEditorParams } from "./map-editor-params";

import iMapEditorTypes = require("./map-editor-types");

@autoinject
export class MapEditor {
    constructor(
        private mapEditorTools: MapEditorTools,
        private mapEditorTriggers: MapEditorTriggers,
        private mapEditorEvents: MapEditorEvents) {
        this.cw = 2048;
        this.ch = 2048;
        this.fakeTrigger = new iMapEditorTypes.Transform(this.mouseX, this.mouseY, 1, 1);
        this.c = document.getElementsByTagName('canvas')[0];
        this.ctx = this.c.getContext('2d');
        this.sprites.src = './this.spritesheet.png';
    }

    public currentLayer: number;
    public paletteMode: false;
    public tileInfo: string;
    public renameLayer: string;
    public reorderLayer: number;
    public copiedLayer: number;
    public renameTileValue: string;
    public mouseX: number;
    public mouseY: number;
    public cw: number;
    public ch: number;
    public lastTile: iMapEditorTypes.Tile;
    public palette: Array<iMapEditorTypes.Tile>;
    public layers: Array<iMapEditorTypes.Layer>;
    public sprites: HTMLImageElement;
    public fakeTrigger: iMapEditorTypes.Transform;
    public c: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    clickSelectLayer(_layerIndex) {
        this.currentLayer = _layerIndex;
        this.updatelayersPreview();
    }


    updatelayersPreview() {
        this.mapEditorTools.layersPreview.innerHTML = this.generateHTMLForLayersPreview();
        this.mapEditorTools.renameLayerInputplaceholder = this.layers[this.currentLayer].name;
        this.mapEditorTools.reorderLayerInputplaceholder = this.layers[this.currentLayer].order;
        this.mapEditorTools.reorderLayerInputvalue = 0;
        this.mapEditorTools.renameLayerInputvalue = "";
        this.mapEditorTools.showlayersToolBar = true;
        this.mapEditorTools.toggleToolBar(true, this.mapEditorTools.layersToolBarElement, this.mapEditorTools.layersToolBarButtonElement);
    }
    clickRenameTile() {
        var _x = this.mapEditorTools.paintBrushInputX;
        var _y = this.mapEditorTools.paintBrushInputY;
        for (var _ptileIndex in this.palette) {
            if (this.palette[_ptileIndex].xIndex == _x && this.palette[_ptileIndex].yIndex == _y) {
                this.palette[_ptileIndex].name = this.renameTileValue;
            }
        };
        this.refreshTileInfo(this.palette[_ptileIndex]);
    }


    refreshTileInfo(_tile) {
        this.tileInfo = this.generateHTMLForTile(_tile);
    }

    generateHTMLForTile(_tile) {
        var tileRow = "<tr><td style='width:40px'> x: " + _tile.xPosition +
            "</td><td style='width:40px'> y: " + _tile.yPosition + "</td>" +
            "<td style='width:320px; text-align:left;'> name: " + this.getTileName(_tile) + "</td></tr>";
        var trigger = this.mapEditorTriggers.getCurrentTrigger();
        var triggerRow = (trigger == undefined) ? "" : (
            "<tr><td> x: " + trigger.transform.x +
            "</td><td> y: " + trigger.transform.y + "</td>" +
            "<td>" +
            "Trigger: " + trigger.name +
            "</td></tr>");
        return "<table style='table-layout:fixed;width:400px;text-align:left;'>" +
            tileRow + triggerRow +
            "</table>";
    }

    getTileName(_tile) {
        return this.getPaletteName(_tile.xIndex, _tile.yIndex);
    }

    getPaletteName(_x, _y) {
        var _result = "";
        this.palette.forEach(function (_ptile, _tileIndex) {
            if (_ptile.xIndex == _x && _ptile.yIndex == _y)
                _result = _ptile.name;
        });
        return _result;
    }

    clickCopyLayer() {
        this.copiedLayer = this.currentLayer;
    }

    clickPasteLayer() {
        this.layers[this.currentLayer].tiles = JSON.parse(JSON.stringify(this.layers[this.copiedLayer].tiles));
        this.layers[this.currentLayer].name = this.layers[this.copiedLayer].name;
        this.updatelayersPreview();
    }

    clickAddLayer() {
        this.layers.splice(this.currentLayer + 1, 0, this.createLayer("layer" + this.layers.length));
        this.currentLayer = this.currentLayer + 1;
        this.updatelayersPreview();
    }

    createLayer(_name) {
        return new iMapEditorTypes.Layer(0, 0, _name, this.layers.length);
    }

    clickDeleteLayer() {
        if (this.layers.length <= 1) return;
        this.layers.splice(this.currentLayer, 1);
        this.currentLayer--;
        this.updatelayersPreview();
    }

    clickClearLayer() {
        this.layers[this.currentLayer].tiles = [];
        this.updatelayersPreview();
    }

    clickRenameLayer() {
        this.layers[this.currentLayer].name = this.renameLayer;
        this.updatelayersPreview();
    }

    clickReorderLayer() {
        this.layers[this.currentLayer].order = this.reorderLayer;
        this.updatelayersPreview();
    }

    drawMapLoop() {
        this.clear();
        if (this.paletteMode) {
            this.drawPalette();
        }
        else {
            this.drawlayers();
        }
        if (this.mapEditorTools.selectedTool == 0) {
            this.drawSprite(
                this.sprites, this.mouseX,
                this.mouseY,
                this.mapEditorTools.selectedBrushX,
                this.mapEditorTools.selectedBrushY);
            this.ctx.fillStyle = "#33aa33";
            this.ctx.fillText("( " + this.mouseX + ", " + this.mouseY + " )", this.mouseX * 16 + 20, this.mouseY * 16 + 20);
        }
        if (this.mapEditorTools.selectedTool == 3) {
            if (this.mapEditorTools.brushTool.state == 0) {
                this.drawSprite(
                    this.sprites,
                    this.mouseX,
                    this.mouseY,
                    this.mapEditorTools.selectedBrushX,
                    this.mapEditorTools.selectedBrushY);
            }
            else {
                this.drawSprite(
                    this.sprites,
                    this.mapEditorTools.brushTool.xPos1,
                    this.mapEditorTools.brushTool.yPos1,
                    this.mapEditorTools.selectedBrushX,
                    this.mapEditorTools.selectedBrushY);
                this.drawSprite(
                    this.sprites,
                    this.mouseX,
                    this.mouseY,
                    this.mapEditorTools.selectedBrushX + 2,
                    this.mapEditorTools.selectedBrushY + 2);
            }
            this.ctx.fillStyle = "#33aa33";
            this.ctx.fillText("( " + this.mouseX + ", " + this.mouseY + " )", this.mouseX * 16 + 20, this.mouseY * 16 + 20);
        }
        if (this.mapEditorTools.selectedTool == 4) {
            if (this.mapEditorTools.brushTool.state == 0) {

                this.drawSprite(this.sprites,
                    this.mouseX + 1,
                    this.mouseY + 1,
                    this.mapEditorTools.selectedBrushX,
                    this.mapEditorTools.selectedBrushY);
            }
            else {
                this.drawSprite(
                    this.sprites,
                    this.mapEditorTools.brushTool.xPos1 + 1,
                    this.mapEditorTools.brushTool.yPos1 + 1,
                    this.mapEditorTools.selectedBrushX,
                    this.mapEditorTools.selectedBrushY);
                this.drawSprite(
                    this.sprites,
                    this.mouseX - 1,
                    this.mouseY - 1,
                    this.mapEditorTools.selectedBrushX + 2,
                    this.mapEditorTools.selectedBrushY + 2);
            }
            this.ctx.fillStyle = "#33aa33";
            this.ctx.fillText("( " + this.mouseX + ", " + this.mouseY + " )", this.mouseX * 16 + 20, this.mouseY * 16 + 20);
        }
    }

    clear() {
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(0, 0, this.cw, this.ch);
    }

    drawPalette() {
        for (var _tileIndex in this.palette) {
            let _tile = this.palette[_tileIndex];
            this.drawSprite(
                this.sprites,
                _tile.xPosition,
                _tile.yPosition,
                _tile.xIndex,
                _tile.yIndex);
        };
    }

    drawlayers() {
        if (this.layers == null || this.layers[this.currentLayer] == null) return;
        this.ctx.globalAlpha = 1;
        for (var _layerIndex in this.layers) {

            if (this.layers[this.currentLayer].order >= this.layers[_layerIndex].order) {
                if (this.layers[this.currentLayer].order == this.layers[_layerIndex].order && this.mapEditorTools.xRayView)
                    this.ctx.globalAlpha = 0.9;
                if (this.layers[this.currentLayer].order == this.layers[_layerIndex].order
                    && this.currentLayer != parseInt(_layerIndex)
                    && this.mapEditorTools.xRayView)
                    this.ctx.globalAlpha = 0.4;

                this.drawLayer(this.layers[this.currentLayer]);
                if (this.layers[this.currentLayer].order != this.layers[_layerIndex].order && this.mapEditorTools.showFog)
                    this.drawLayerFog();
            }
            else if (this.mapEditorTools.xRayView) {
                this.ctx.globalAlpha = this.ctx.globalAlpha * 0.3;
                this.drawLayer(this.layers[this.currentLayer]);
            }
        };
        this.ctx.globalAlpha = 1;
    }

    drawLayer(_layer) {
        if (this.mapEditorTools.perspectiveView) {
            var _currentOrder = this.layers[this.currentLayer].order;
            var _offsetIndex = _layer.order - _currentOrder;
            var _direction = _currentOrder >= _layer.order;
            var mouseXoffset = this.mouseX - (this.mapEditorTools.sx);
            var _mouseYoffset = this.mouseY - (this.mapEditorTools.sy);
            var _offX = (mouseXoffset * _offsetIndex / 2) * (_direction ? 1 : -1);
            var _offY = (_mouseYoffset * _offsetIndex / 2) * (_direction ? 1 : -1);
            this.drawTilesOff(_layer, _offX, _offY);
        }
        else {
            this.drawTiles(_layer);
        }
    }

    drawLayerFog() {
        this.ctx.fillStyle = "rgba(0,0,0,0.2)";
        this.ctx.fillRect(0, 0, this.cw, this.ch);
    }

    drawTiles(_layer) {
        for (var _tileIndex in _layer.tiles) {
            let _tile = _layer.tiles[_tileIndex];
            this.drawSprite(
                this.sprites,
                _tile.xPosition,
                _tile.yPosition,
                _tile.xIndex,
                _tile.yIndex);
        };
    }

    drawTilesOff(_layer, _xoff, _yoff) {
        for (var _tileIndex in _layer.tiles) {
            let _tile = _layer.tiles[_tileIndex];
            this.drawSpriteOff(
                this.sprites,
                _tile.xPosition,
                _tile.yPosition,
                _tile.xIndex,
                _tile.yIndex,
                _xoff,
                _yoff);
        };
    }

    drawSprite(spritesheet, x, y, xindex, yindex) {
        this.ctx.drawImage(
            spritesheet,
            xindex * 16,
            yindex * 16,
            16,
            16,
            x * 16,
            y * 16,
            16,
            16);
    }

    drawSpriteOff(spritesheet, xpos, ypos, xindex, yindex, xoff, yoff) {
        var x = Math.floor(xpos * 16 + xoff);
        var y = Math.floor(ypos * 16 + yoff);
        this.ctx.drawImage(
            spritesheet,
            xindex * 16,
            yindex * 16,
            16,
            16,
            x,
            y,
            16,
            16);
    }

    drawTriggersLoop() {
        if (!this.mapEditorTools.viewTriggers) return;
        if (this.mapEditorTools.selectedTool == 5) {
            if (this.mapEditorTools.brushTool.state == 1) {
                var _upperBoundX = this.mapEditorTools.brushTool.xPos1 > this.mouseX ? this.mapEditorTools.brushTool.xPos1 : this.mouseX;
                var _lowerBoundX = this.mapEditorTools.brushTool.xPos1 < this.mouseX ? this.mapEditorTools.brushTool.xPos1 : this.mouseX;
                var _upperBoundY = this.mapEditorTools.brushTool.yPos1 > this.mouseY ? this.mapEditorTools.brushTool.yPos1 : this.mouseY;
                var _lowerBoundY = this.mapEditorTools.brushTool.yPos1 < this.mouseY ? this.mapEditorTools.brushTool.yPos1 : this.mouseY;
                this.fakeTrigger = new iMapEditorTypes.Transform(this.mouseX, this.mouseY, 1, 1);
                this.fakeTrigger.x = _lowerBoundX;
                this.fakeTrigger.y = _lowerBoundY;
                this.fakeTrigger.width = 1 + _upperBoundX - _lowerBoundX;
                this.fakeTrigger.height = 1 + _upperBoundY - _lowerBoundY;
                this.drawFakeTrigger(this.fakeTrigger, false, 0, 0, this.layers[this.currentLayer], false);
            }
            else {
                this.fakeTrigger.x = this.mouseX;
                this.fakeTrigger.y = this.mouseY;
                this.drawTrigger(this.fakeTrigger, false, 0, 0, this.layers[this.currentLayer], false);
            }
        }
        for (var _triggerIndex in this.mapEditorTriggers.triggers) {
            this.drawTriggerWithOffset(
                this.mapEditorTriggers.triggers[_triggerIndex],
                parseInt(_triggerIndex) == this.mapEditorTriggers.currentTrigger);
        }
    }

    drawTrigger(_trigger, _selected, _offx, _offy, _thisLayerObj, _error) {
        var _thisLayer = this.currentLayer == _trigger.layer;
        var _label = _trigger.name + (_error ? "Missing Layer" : (!_thisLayer ? " " + _thisLayerObj.name : ""));
        var x = (_trigger.transform.x * 16) + _offx,
            y = (_trigger.transform.y * 16) + _offy,
            width = _trigger.transform.width * 16,
            height = _trigger.transform.height * 16;

        var transparentColor =
            _error ? "rgba(255,0,0,0.1)" :
                _selected ?
                    (!_thisLayer ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)") :
                    _thisLayer ? "rgba(0,200,0,0.5)" :
                        "rgba(0,200,0,0.05)";

        var solidColor =
            _selected ? "rgb(255,255,255)" :
                !_thisLayer ? "rgba(0,200,0,0.1)" :
                    "rgb(0,200,0)";

        this.ctx.fillStyle = transparentColor;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = solidColor;
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.fillStyle = !_thisLayer ? "rgba(0,0,0,0.1)" : '#000';
        this.ctx.fillText(_trigger.name, x, y + height + 16);
        this.ctx.fillStyle = solidColor;
        this.ctx.fillText(_label, x + 1, y + height + 15);
    }

    drawFakeTrigger(_transform, _selected, _offx, _offy, _thisLayerObj, _error) {
        var _thisLayer = true;
        var _x = (_transform.x * 16) + _offx,
            _y = (_transform.y * 16) + _offy,
            _width = _transform.width * 16,
            _height = _transform.height * 16;

        var _transparentColor =
            _error ? "rgba(255,0,0,0.1)" :
                _selected ?
                    (!_thisLayer ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)") :
                    _thisLayer ? "rgba(0,200,0,0.5)" :
                        "rgba(0,200,0,0.05)";

        var _solidColor =
            _selected ? "rgb(255,255,255)" :
                !_thisLayer ? "rgba(0,200,0,0.1)" :
                    "rgb(0,200,0)";
        this.ctx.fillStyle = _transparentColor;
        this.ctx.fillRect(_x, _y, _width, _height);
        this.ctx.strokeStyle = _solidColor;
        this.ctx.strokeRect(_x, _y, _width, _height);
        this.ctx.fillStyle = !_thisLayer ? "rgba(0,0,0,0.1)" : '#000';
        this.ctx.fillStyle = _solidColor;
    }

    drawTriggerWithOffset(_trigger, _selected) {
        var _thisLayerObj = this.layers[_trigger.layer];
        var _error = _thisLayerObj == null;
        if (this.mapEditorTools.perspectiveView) {
            var _order = _thisLayerObj != null ? _thisLayerObj.order : 0;
            var _currentOrder = this.layers[this.currentLayer].order;
            var _offsetIndex = _order - _currentOrder;
            var _direction = _currentOrder >= _order;
            var _mouseXoffset = this.mouseX - (this.mapEditorTools.sx);
            var _mouseYoffset = this.mouseY - (this.mapEditorTools.sy);
            var _offX = (_mouseXoffset * _offsetIndex / 2) * (_direction ? 1 : -1);
            var _offY = (_mouseYoffset * _offsetIndex / 2) * (_direction ? 1 : -1);
            this.drawTrigger(_trigger, _selected, _offX, _offY, _thisLayerObj, _error);
        }
        else {
            this.drawTrigger(_trigger, _selected, 0, 0, _thisLayerObj, _error);
        }
    }

    updatePaintBrushPreviewFromEyedropper(_tile) {
        this.mapEditorTools.paintBrushInputX = _tile.xIndex;
        this.mapEditorTools.paintBrushInputY = _tile.yIndex;
        var _name = this.getPaletteName(this.mapEditorTools.selectedBrushX, this.mapEditorTools.selectedBrushY);
        this.updatePaintBrushPreview(_name);
    }

    updatePaintBrushPreview(_tileName) {
        this.mapEditorTools.selectedBrushX = this.mapEditorTools.paintBrushInputX;
        this.mapEditorTools.selectedBrushY = this.mapEditorTools.paintBrushInputY;
        this.mapEditorTools.renameTileInputplaceholder = _tileName;
        this.mapEditorTools.renameTileInputvalue = "";
        this.mapEditorTools.paintBrushPreview.style.background = "url(" + this.sprites.src + ") -" + this.mapEditorTools.selectedBrushX * 16 + "px -" + this.mapEditorTools.selectedBrushY * 16 + "px";
    }

    updateLastTile(_layerIndex, _tile) {
        var _lastTile = new iMapEditorTypes.Tile();
        _lastTile.layerIndex = _layerIndex;
        _lastTile = _tile;
        var _name = this.getTileName(_lastTile);
        if (_name != null && _name != undefined) {
            this.mapEditorTools.renameTileInputplaceholder = _name;
            this.mapEditorTools.renameTileInputvalue = "";
        }
        else {
            this.mapEditorTools.renameTileInputplaceholder = "Name";
            this.mapEditorTools.renameTileInputvalue = "";
        }
        this.updateLastTilePreview();
        this.refreshTileInfo(_tile);
    }

    updateLastTilePreview() {
        this.mapEditorTools.lastTilePreview.style.background = "url(" + this.sprites.src + ") -" + this.lastTile.xIndex * 16 + "px -" + this.lastTile.yIndex * 16 + "px";
    }

    brushClickHandler() {
        this.mapEditorTools.resetBrushTool();
        this.addTileToCurrentLayer(this.mapEditorTools.paintBrushInputX, this.mapEditorTools.paintBrushInputY, this.mouseX, this.mouseY);
    }

    nineSliceClickHandler() {
        this.mapEditorTools.brushTool.mode = 1;
        this.mapEditorTools.brushTool.state = this.mapEditorTools.brushTool.state == 0 ? 1 : 0;

        if (this.mapEditorTools.brushTool.state == 1) {
            this.mapEditorTools.brushTool.xPos1 = this.mouseX;
            this.mapEditorTools.brushTool.yPos1 = this.mouseY;
        }

        if (this.mapEditorTools.brushTool.state == 0) {
            this.mapEditorTools.brushTool.xPos2 = this.mouseX;
            this.mapEditorTools.brushTool.yPos2 = this.mouseY;
            this.addSlicedTiles();
        }
    }

    wallSliceClickHandler() {

        this.mapEditorTools.brushTool.mode = 2;
        this.mapEditorTools.brushTool.state = this.mapEditorTools.brushTool.state == 0 ? 1 : 0;

        if (this.mapEditorTools.brushTool.state == 1) {
            this.mapEditorTools.brushTool.xPos1 = this.mouseX;
            this.mapEditorTools.brushTool.yPos1 = this.mouseY;
        }

        if (this.mapEditorTools.brushTool.state == 0) {
            this.mapEditorTools.brushTool.xPos2 = this.mouseX;
            this.mapEditorTools.brushTool.yPos2 = this.mouseY;
            this.addSlicedTiles();
        }
    }

    addSlicedTiles() {
        var upperBoundX = this.mapEditorTools.brushTool.xPos1 > this.mapEditorTools.brushTool.xPos2 ? this.mapEditorTools.brushTool.xPos1 : this.mapEditorTools.brushTool.xPos2;
        var lowerBoundX = this.mapEditorTools.brushTool.xPos1 < this.mapEditorTools.brushTool.xPos2 ? this.mapEditorTools.brushTool.xPos1 : this.mapEditorTools.brushTool.xPos2;
        var upperBoundY = this.mapEditorTools.brushTool.yPos1 > this.mapEditorTools.brushTool.yPos2 ? this.mapEditorTools.brushTool.yPos1 : this.mapEditorTools.brushTool.yPos2;
        var lowerBoundY = this.mapEditorTools.brushTool.yPos1 < this.mapEditorTools.brushTool.yPos2 ? this.mapEditorTools.brushTool.yPos1 : this.mapEditorTools.brushTool.yPos2;

        for (var x = lowerBoundX; x <= upperBoundX; x++) {
            for (var y = lowerBoundY; y <= upperBoundY; y++) {
                this.addSlicedTileToCurrentLayer(this.mapEditorTools.paintBrushInputX, this.mapEditorTools.paintBrushInputY, x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY)
            }
        }
    }

    addSlicedTileToCurrentLayer(xIndex, yIndex, x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY) {

        var offset;

        if (this.mapEditorTools.brushTool.mode == 1)
            offset = this.getIndexOffsetForNineSlicedTile(x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY);
        else if (this.mapEditorTools.brushTool.mode == 2)
            offset = this.getIndexOffsetForWallSlicedTile(x, y, upperBoundX, lowerBoundX, upperBoundY, lowerBoundY);
        if (offset == null) return;
        this.addTileToCurrentLayer(xIndex + offset[0], yIndex + offset[1], x, y);
    }

    eraserClickHandler() {
        this.mapEditorTools.resetBrushTool();
        var _tiles = this.layers[this.currentLayer].tiles;
        for (var _tileIndex in _tiles) {
            if (_tiles[_tileIndex].xPosition == this.mouseX && _tiles[_tileIndex].yPosition == this.mouseY) {
                this.layers[this.currentLayer].tiles.splice(parseInt(_tileIndex), 1);
            }
        };
    }

    addTileToCurrentLayer(_xIndex, _yIndex, _xPosition, _yPosition) {
        var _matched = false;
        var _tiles = this.layers[this.currentLayer].tiles;
        for (var _tile in _tiles) {
            if (_tiles[_tile].xPosition == _xPosition && _tiles[_tile].yPosition == _yPosition) {
                _tiles[_tile].xIndex = _xIndex;
                _tiles[_tile].yIndex = _yIndex;
                this.updateLastTile(this.currentLayer, _tiles[_tile]);
                _matched = true;
            }
        }
        if (_matched) return;
        var _newTile = new iMapEditorTypes.Tile();
        _newTile.xIndex = _xIndex;
        _newTile.yIndex = _yIndex;
        _newTile.xPosition = _xPosition;
        _newTile.yPosition = _yPosition;

        this.layers[this.currentLayer].tiles.push(_newTile);
        this.updateLastTile(this.currentLayer, _newTile);
    }
    getIndexOffsetForNineSlicedTile(_x, _y, _upperBoundX, _lowerBoundX, _upperBoundY, _lowerBoundY) {
        var _xIndexOffset, _yIndexOffset;
        //corners
        if (_x == _lowerBoundX && _y == _lowerBoundY) { // upper left
            _xIndexOffset = 0;
            _yIndexOffset = 0;
        }
        if (_x == _upperBoundX && _y == _lowerBoundY) { //upper right
            _xIndexOffset = 2;
            _yIndexOffset = 0;
        }
        if (_x == _lowerBoundX && _y == _upperBoundY) { //bottom left
            _xIndexOffset = 0;
            _yIndexOffset = 2;
        }
        if (_x == _upperBoundX && _y == _upperBoundY) { //bottom right
            _xIndexOffset = 2;
            _yIndexOffset = 2;
        }

        //edges
        if (_x == _lowerBoundX && _y != _lowerBoundY && _y != _upperBoundY) { //west
            _xIndexOffset = 0;
            _yIndexOffset = 1;
        }
        if (_x == _upperBoundX && _y != _lowerBoundY && _y != _upperBoundY) {//east
            _xIndexOffset = 2;
            _yIndexOffset = 1;
        }
        if (_y == _lowerBoundY && _x != _lowerBoundX && _x != _upperBoundX) {//north
            _xIndexOffset = 1;
            _yIndexOffset = 0;
        }
        if (_y == _upperBoundY && _x != _lowerBoundX && _x != _upperBoundX) {//south
            _xIndexOffset = 1;
            _yIndexOffset = 2;
        }

        //middle
        if (_x != _lowerBoundX && _x != _upperBoundX && _y != _lowerBoundY && _y != _upperBoundY) {
            _xIndexOffset = 1;
            _yIndexOffset = 1;
        }
        return [_xIndexOffset, _yIndexOffset];
    }

    getIndexOffsetForWallSlicedTile(_x, _y, _upperBoundX, _lowerBoundX, _upperBoundY, _lowerBoundY) {

        //empt_y corners - return null
        if ((_x == _lowerBoundX && _y == _lowerBoundY) || (_x == _lowerBoundX + 1 && _y == _lowerBoundY) || (_x == _lowerBoundX && _y == _lowerBoundY + 1) ||
            (_x == _upperBoundX && _y == _lowerBoundY) || (_x == _upperBoundX - 1 && _y == _lowerBoundY) || (_x == _upperBoundX && _y == _lowerBoundY + 1) ||
            (_x == _lowerBoundX && _y == _upperBoundY) || (_x == _lowerBoundX && _y == _upperBoundY - 1) || (_x == _lowerBoundX + 1 && _y == _upperBoundY) ||
            (_x == _upperBoundX && _y == _upperBoundY) || (_x == _upperBoundX - 1 && _y == _upperBoundY) || (_x == _upperBoundX && _y == _upperBoundY - 1)
        ) { // _upper left
            return null;
        }

        //corners
        if (_x == _lowerBoundX + 1 && _y == _lowerBoundY + 1) { // _upper left
            return [0, 0];
        }
        if (_x == _upperBoundX - 1 && _y == _lowerBoundY + 1) { //_upper right
            return [2, 0];
        }
        if (_x == _lowerBoundX + 1 && _y == _upperBoundY - 1) { //bottom left
            return [0, 2];
        }
        if (_x == _upperBoundX - 1 && _y == _upperBoundY - 1) { //bottom right
            return [2, 2];
        }

        //edges
        if (_x == _lowerBoundX && _y != _lowerBoundY && _y != _upperBoundY) { //west
            return [0, 1];
        }
        if (_x == _upperBoundX && _y != _lowerBoundY && _y != _upperBoundY) {//east
            return [2, 1];
        }
        if (_y == _lowerBoundY && _x != _lowerBoundX && _x != _upperBoundX) {//north
            return [1, 0];
        }
        if (_y == _upperBoundY && _x != _lowerBoundX && _x != _upperBoundX) {//south
            return [1, 2];
        }
        //middle
        if (_x != _lowerBoundX && _x != _upperBoundX && _y != _lowerBoundY && _y != _upperBoundY) {
            return null;
        }
        return [0, 0];
    }

    generateHTMLForLayersPreview() {
        var _rows = "";
        for (var _layerIndex in this.layers) {
            var classes = "button" + (this.currentLayer == parseInt(_layerIndex) ? " selected" : "");
            _rows += "<div class='" + classes + "' onclick='clickSelectLayer(" + _layerIndex + ")'>" + this.layers[_layerIndex].name + " (" + this.layers[_layerIndex].order + ") </div>";
        };
        return "<div>" + _rows + "</div>";
    }

    initPalette() {
        this.palette = [];
        var w = 37;
        var h = 28;
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var paletteTile = new iMapEditorTypes.Tile();
                paletteTile.xIndex = x;
                paletteTile.yIndex = y;
                paletteTile.xPosition = x;
                paletteTile.yPosition = y;
                this.palette.push(paletteTile);
            }
        }
    }

    movePalette() {
        for (var paletteTileIndex in this.palette) {
            this.palette[paletteTileIndex].xPosition = this.palette[paletteTileIndex].xIndex + (this.mapEditorTools.sx <= 12 ? 0 : this.mapEditorTools.sx - 12);
            this.palette[paletteTileIndex].yPosition = this.palette[paletteTileIndex].yIndex + (this.mapEditorTools.sy <= 12 ? 0 : this.mapEditorTools.sy - 12);
        }
    }
}