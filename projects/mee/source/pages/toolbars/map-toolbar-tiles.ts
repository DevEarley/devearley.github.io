import { Tile } from '../../domain/tile';
import { TileDataService } from '../../services/tile-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarLayers {
  constructor(public TileDataService: TileDataService) { }
  activate() {}
}
