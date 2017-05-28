import { Trigger } from '../../domain/trigger';
import { TriggerDataService } from '../../services/trigger-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarLayers {
  constructor(public TriggerDataService: TriggerDataService) { }
  activate() {}
}
