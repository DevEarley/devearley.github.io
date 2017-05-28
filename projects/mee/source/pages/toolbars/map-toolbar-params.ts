import { Param } from '../../domain/param';
import { ParamDataService } from '../../services/param-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarLayers {
  constructor(public ParamDataService: ParamDataService) { }
  activate() {}
  clickUpdateParam = function(){}
  clickAddParamToSelectedAction = function(){}
  clickAddParamToSelectedCondition = function(){}
}
