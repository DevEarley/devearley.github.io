import { Condition } from '../../domain/condition';
import { ConditionDataService } from '../../services/condition-data-service';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject()
export class MapToolBarConditions {
  constructor(public ConditionDataService: ConditionDataService) { }
  activate() {}
  clickUpdateCondition = function(){}
  clickAddConditionToSelectedEvent = function(){}
  clickRemoveSelectedCondition = function(){}
}
