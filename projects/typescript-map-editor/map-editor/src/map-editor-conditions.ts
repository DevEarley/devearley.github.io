
import {autoinject} from 'aurelia-framework';
import { MapEditorTriggers } from "./map-editor-triggers";
import iMapEditorTypes = require("./map-editor-types");

@autoinject
export class MapEditorConditions{

constructor( 
    private mapEditorTriggers:MapEditorTriggers,
    public currentCondition = null,
    public currentConditionParam = null, viewConditions = true){}



// var currentCondition = null, currentConditionParam = null, viewConditions = true;

// function clickAddConditionToSelectedEvent() {
//     var event = getCurrentEvent();
//     if (event == null) return;
//     var name = conditionNameInput.value == "" ? "condition " + event.conditions.length : conditionNameInput.value;
//     event.conditions.push(createCondition(name));
//     currentCondition = event.conditions.length - 1;
//     updateConditionsPreview(event);
// }

// function clickRemoveSelectedCondition() {

// }

// function clickUpdateCondition() {
//     var condition = getCurrentCondition();
//     condition.name = conditionNameInput.value;
//     condition.lhs = conditionLHSInput.value;
//     condition.operation = conditionOperationInput.value;
//     condition.rhs = conditionRHSInput.value;
//     condition.trueAction = conditionTrueActionInput.value;
//     condition.falseAction = conditionFalseActionInput.value;
//     updateConditionsPreview(event);
// }

// function updateConditionsPreview(event) {
//     if (currentCondition == null || event == null) {
//         conditionsPreview.innerHTML = "";
//         return;
//     }
//     var currentConditionObj = getCurrentCondition();
//     viewConditions = true;
//     conditionsPreview.innerHTML = generateHTMLForConditionsPreview(event.conditions);
//     if( currentConditionObj == null)return;
//     conditionNameInput.placeholder =  currentConditionObj.name;
//     conditionNameInput.value = "";
//     conditionRHSInput.placeholder =  currentConditionObj.rhs;
//     conditionRHSInput.value = "";
//     conditionLHSInput.placeholder = currentConditionObj.lhs;
//     conditionLHSInput.value = "";
//     conditionOperationInput.placeholder = currentConditionObj.operation;
//     conditionOperationInput.value = "";
//     conditionTrueActionInput.placeholder = currentConditionObj.trueAction;
//     conditionTrueActionInput.value = "";
//     conditionFalseActionInput.placeholder = currentConditionObj.falseAction;
//     conditionFalseActionInput.value = "";
// }

// function getCurrentCondition() {
//     var event = getCurrentEvent();
//     if (event == null) return null;
//     return event.conditions[currentCondition];
// }

// function clickSelectCondition(index) {
//     var event = getCurrentEvent();
//     if (event == null) return;
//     currentCondition = index;
//     updateConditionsPreview(event);
// }

// function generateHTMLForConditionsPreview(currentConditions) {
//     var rows = "";
//     if (currentConditions == null) return rows;
//     currentConditions.forEach(function (condition, index) {
//         var classes = "button" + (currentCondition == index ? " selected" : "");
//         rows += "<div class='" + classes + "' onclick='clickSelectCondition(" + index + ")'>" + condition.name + " </div>";
//     });
//     return "<div>" + rows + "</div>";
// }

// function getCurrentConditions() {
//     var event = getCurrentEvent();
//     return event.conditions;
// }

// function createCondition(name) {
//     return {
//         id: genID(),
//         type:"Condition",
//         name: name,
//         rhs: 'RHS',
//         lhs: 'LHS',
//         operation: 'Operation',
//         trueAction: 'True Action',
//         falseAction:'False Action'
//     };
// }