import { autoinject } from 'aurelia-framework';
import { MapEditorEvents } from "./map-editor-events";
import iMapEditorTypes = require("./map-editor-types");

@autoinject
export class MapEditorActions {
    constructor(private mapEditorEvents: MapEditorEvents) {
    this.showActionsToolBar = false;
    this.renameActionInputPlaceholder = "";
    this.renameActionInputValue = "";
    this.reorderActionInputPlaceholder = 0;
    this.reorderActionInputValue = 0;
    this.currentAction = 0;
    this.viewActions = true;
     }
    
    public actionsPreview:HTMLElement;
    public showActionsToolBar:boolean;
    public renameActionInputPlaceholder:string;
    public renameActionInputValue:string;
    public reorderActionInputPlaceholder:number;
    public reorderActionInputValue:number;
    public currentAction:number;
    public viewActions:boolean;

    clickAddActionToSelectedEvent() {
        var _event = this.mapEditorEvents.getCurrentEvent();
        if (_event == null) return;
        var _name = this.renameActionInputValue == "" ? "action " + _event.actions.length : this.renameActionInputValue;
        _event.actions.push(this.createAction(_name));
        this.currentAction = _event.actions.length - 1;
        this.updateActionsPreview(_event);
    }

    createAction(_name) {
        return new iMapEditorTypes.Action(_name );
    }

    updateActionsPreview(_event) {
        if (this.currentAction == null || _event == null) {
            this.actionsPreview.innerHTML = "";
            return;
        }
        var currentActionObj = this.getCurrentAction();
        this.updateParamsPreview(currentActionObj);
        this.viewActions = true;
        this.actionsPreview.innerHTML = generateHTMLForActionsPreview(event.actions);
        this.renameActionInputPlaceholder = currentActionObj == null ? '' : currentActionObj.name;
        this.renameActionInputValue = "";
    }

    
 getCurrentActions() {
    var _event = this.mapEditorEvents.getCurrentEvent();
    return _event.actions;
}

 getCurrentAction() {
    var _event = this.mapEditorEvents.getCurrentEvent();
    if (_event == null) return null;
    return _event.actions[this.currentAction];
}



 clickRenameAction() {
    var _action = this.getCurrentAction();
    _action.name = this.renameActionInputValue;
    updateActionsPreview(event);
}


// function clickSelectAction(index) {
//     var event = getCurrentEvent();
//     if (event == null) return;
//     currentAction = index;
//     updateActionsPreview(event);
// }

// function generateHTMLForActionsPreview(currentActions) {
//     var rows = "";
//     if (currentActions == null) return rows;
//     currentActions.forEach(function (action, index) {
//         var classes = "button" + (currentAction == index ? " selected" : "");
//         rows += "<div class='" + classes + "' onclick='clickSelectAction(" + index + ")'>" + action.name + " </div>";
//     });
//     return "<div>" + rows + "</div>";
// }
