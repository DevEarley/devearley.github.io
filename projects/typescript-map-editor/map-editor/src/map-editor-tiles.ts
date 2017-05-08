
import {autoinject} from 'aurelia-framework';
import { MapEditorTriggers } from "./map-editor-triggers";
import iMapEditorTypes = require("./map-editor-types");

@autoinject
export class MapEditorTiles {

constructor( 
    private mapEditorTriggers:MapEditorTriggers,
     public lastTilePreview  = new HTMLElement(),     
   public showTilesToolBar = false,
   public renameTileInputplaceholder = "",
   public renameTileInputvalue = "",
   public reorderTileInputplaceholder = 0,
   public reorderTileInputvalue = 0){}

 
}

