import {autoinject} from 'aurelia-framework';
import { MapEditorTriggers } from "./map-editor-triggers";
import iMapEditorTypes = require("./map-editor-types");

@autoinject
export class MapEditorEvents {

constructor( 
    private mapEditorTriggers:MapEditorTriggers,
    public currentEvent:number,
    public viewEvents){}

 getCurrentEvent() {
    var trigger = this.mapEditorTriggers.getCurrentTrigger();
    return trigger == null?null:trigger.events[this.currentEvent];
}

// var currentEvent = null, viewEvents = true;

// function clickAddEventToSelectedTrigger() {
//     var trigger = getCurrentTrigger();
//     if (trigger == null) return;
//     var name = renameEventInput.value == "" ? "event " + trigger.events.length : renameEventInput.value;
//     trigger.events.push(createEvent(name));
//     currentEvent = trigger.events.length - 1;
//     updateEventsPreview(trigger);
// }

// function clickRemoveSelectedEvent() {

//     var trigger = getCurrentTrigger();
//     if (trigger.events.length == 0) return;
//     trigger.events.splice(currentEvent, 1);
//     currentEvent--;
//     updateEventsPreview();
// }

// function eventBrushClickHandler() {

// }

// function clickRenameEvent() {
//     var trigger = getCurrentTrigger();
//     var event = getCurrentEvent();
//     if (trigger == null || event == null) return;
//     event.name = renameEventInput.value;
//     updateEventsPreview(trigger);
// }

// function updateEventsPreview(trigger) {
//     if (currentEvent == null || trigger == null) {
//         eventsPreview.innerHTML = "";
//         return;
//     }
//     var currentEventObj = trigger.events[currentEvent];
//     updateActionsPreview(currentEventObj);
//     viewEvents = true;
//     eventsPreview.innerHTML = generateHTMLForEventsPreview();
//     renameEventInput.placeholder = currentEventObj == null ? '' : currentEventObj.name;
//     renameEventInput.value = "";
//     // toggleToolBar(true, eventsToolBarElement, eventsToolBarButtonElement);
// }



// function clickSelectEvent(index) {
//     var trigger = getCurrentTrigger();
//     if (trigger == null) return;
//     currentEvent = index;
//     updateEventsPreview(trigger);
// }

// function generateHTMLForEventsPreview() {
//     var rows = "";
//     var trigger = getCurrentTrigger();
//     if (trigger == null) return;
//     trigger.events.forEach(function (event, index) {
//         var classes = "button" + (currentEvent == index ? " selected" : "");
//         rows += "<div class='" + classes + "' onclick='clickSelectEvent(" + index + ")'>" + event.name + " </div>";
//     });
//     return "<div>" + rows + "</div>";
// }

// function createEvent(name) {
//     return {
//         actions: [],
//         conditions: [],
//         name: name,
//         layer: currentLayer
//     };
// }