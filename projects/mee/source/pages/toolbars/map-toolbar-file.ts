import { Action } from '../../domain/action';
import { ActionDataService } from '../../services/action-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarActions {
  constructor(public ActionDataService: ActionDataService) { }
  activate() {}
}
