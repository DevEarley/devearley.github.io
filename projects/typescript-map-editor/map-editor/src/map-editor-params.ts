
import {autoinject} from 'aurelia-framework';
import { MapEditorActions } from "./map-editor-actions";
import iMapEditorTypes = require("./map-editor-types");

@autoinject
export class MapEditorParams {

constructor( 
    private mapEditorActions:MapEditorActions){
   this.currentParam  = 0;     
   this.showParamsToolBar = false;
   this.viewParams = true;
   this.renameParamNameInputPlaceholder = "";
   this.renameParamNameInputValue = "";
   this.renameParamValueInputPlaceholder = 0;
   this.renameParamValueInputValue = 0;

    }
    public currentParam:number;
    public paramsPreview:HTMLElement;
    public showParamsToolBar:boolean;
    public viewParams:boolean;
    public renameParamNameInputPlaceholder:string;
    public renameParamNameInputValue:string;
    public renameParamValueInputPlaceholder:number;
    public renameParamValueInputValue:number;
 
}

function updateParamsPreview(parent) {
    if (this.currentParam == null || parent == null) {
        this.paramsPreview.innerHTML = "";
        return;
    }
    var currentParamObj = parent.params[this.currentParam];
    this.viewActions = true;
    this.paramsPreview.innerHTML = generateHTMLForParamsPreview(parent.params);
    this.renameParamNameInputPlaceholder = currentParamObj == null ? '' : currentParamObj.name;
    this.renameParamValueInputPlaceholder = currentParamObj == null ? '' : currentParamObj.value;
}

// function clickAddParamToSelectedAction() {
//     var action = getCurrentAction();
//     if (action == null) return;
//     var name = renameParamNameInput.value == "" ? "param " + action.params.length : renameParamNameInput.value;
//     var value = renameParamValueInput.value == "" ? "" : renameParamValueInput.value;
//     action.params.push(createParam(name, value));
//     currentParam = action.params.length - 1;
//     updateParamsPreview(action);
// }

// function clickAddParamToSelectedCondition() {
//     var condition = getCurrentCondition();
//     if (condition == null) return;
//     var name = renameParamNameInput.value == "" ? "param " + condition.params.length : renameParamNameInput.value;
//     var value = renameParamValueInput.value == "" ? "" : renameParamValueInput.value;
//     condition.params.push(createParam(name, value));
//     currentParam = condition.params.length - 1;
//     updateParamsPreview(condition);
// }

// function clickUpdateParam() {
//     var param = getCurrentParam();
//     if (param == null) return;
//     param.name = renameParamNameInput.value;
//     param.value = renameParamValueInput.value;
//     updateParamsPreview(event);
// }


// function clickSelectParam(index) {
//     var action = getCurrentAction();
//     if (action == null) return;
//     currentParam = index;
//     updateParamsPreview(action);
// }

// function generateHTMLForParamsPreview(currentParams) {
//     var rows = "";
//     if (currentParams == null) return rows;
//     currentParams.forEach(function (parameter, index) {
//         var classes = "button" + (currentParam == index ? " selected" : "");
//         rows += "<div class='" + classes + "' onclick='clickSelectParam(" + index + ")'>" + parameter.name + " </div>";
//     });
//     return "<div>" + rows + "</div>";
// }

// function getCurrentParams() {
//     var action = getCurrentAction();
//     return action.params;
// }

// function getCurrentConditionParams() {
//     var condition = getCurrentCondition();
//     return condition.params;
// }

// function getCurrentActionParam() {
//     var action = getCurrentAction();
//     return action.params[currentParam];
// }


// function getCurrentConditionParam() {
//     var condition = getCurrentCondition();
//     return condition.params[currentParam];
// }

// function createParam(name, value) {
//     return {
//         id: genID(),
//         type: "Param",
//         value: value,
//         params: [],
//         name: name,
//     };
// }