import { Layer } from '../../domain/layer';
import { LayerDataService } from '../../services/layer-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarLayers {
  constructor(public LayerDataService: LayerDataService) { }
  activate() {}
  clickRenameLayer = function(){}
  clickReorderLayer = function(){}
  clickAddLayer = function(){}
  clickClearLayer = function(){}
  clickDeleteLayer = function(){}
  clickCopyLayer = function(){}
  clickPasteLayer = function(){}
}
