import iMapEditorTypes = require("./map-editor-types");


export class MapEditorTriggers
{
    constructor(
        public triggers = new Array<iMapEditorTypes.Trigger>(),
    public currentTrigger = 0)
    {

    }

 getCurrentTrigger() {
    return this.triggers[this.currentTrigger];
}
    
}



// var triggers = [];
// var currentTrigger = 0;
// var viewTriggers = true;

// function generateHTMLForTriggersPreview() {
//     var rows = "";
//     triggers.forEach(function (trigger, index) {
//         var classes = "button" + (currentTrigger == index ? " selected" : "");
//         rows += "<div class='" + classes + "' onclick='clickSelectTrigger(" + index + ")'>" + trigger.name + " </div>";
//     });
//     return "<div>" + rows + "</div>";
// }

// function clickSelectTrigger(index) {
//     currentTrigger = index;
//     updateTriggersPreview();
  
// }

// function clickRenameTrigger() {
//     triggers[currentTrigger].name = renameTriggerInput.value;
//     updateTriggersPreview();
// }

// function updateTriggersPreview() {
//     if (currentTrigger == null) return;
//     var trigger = getCurrentTrigger();
//     updateEventsPreview(trigger);
//     viewTriggers = true;
//     refreshTileInfo(lastTile.tile);
//     triggersPreview.innerHTML = generateHTMLForTriggersPreview();
//     renameTriggerInput.placeholder = triggers[currentTrigger].name;
//     renameTriggerInput.value = "";
//     showTriggersToolBar = true;
//     toggleToolBar(true, triggersToolBarElement, triggersToolBarButtonElement);
// }

// function clickCreateTriggerArea() {
//     var upperBoundX = brushTool.xPos1 > brushTool.xPos2 ? brushTool.xPos1 : brushTool.xPos2;
//     var lowerBoundX = brushTool.xPos1 < brushTool.xPos2 ? brushTool.xPos1 : brushTool.xPos2;
//     var upperBoundY = brushTool.yPos1 > brushTool.yPos2 ? brushTool.yPos1 : brushTool.yPos2;
//     var lowerBoundY = brushTool.yPos1 < brushTool.yPos2 ? brushTool.yPos1 : brushTool.yPos2;
//     triggers.push(createTrigger(
//         "area trigger " + triggers.length,
//         { x: lowerBoundX, y: lowerBoundY, width: (upperBoundX - lowerBoundX) + 1, height: (upperBoundY - lowerBoundY) + 1, }));
//     currentTrigger = triggers.length - 1;
//     updateTriggersPreview();
// }


// function triggerBrushClickHandler() {
//     brushTool.mode = 3;
//     brushTool.state = brushTool.state == 0 ? 1 : 0;

//     if (brushTool.state == 1) {
//         brushTool.xPos1 = mouseX;
//         brushTool.yPos1 = mouseY;
//     }

//     if (brushTool.state == 0) {
//         brushTool.xPos2 = mouseX;
//         brushTool.yPos2 = mouseY;
//         clickCreateTriggerArea();
//     }
// }

// function clickRemoveSelectedTrigger() {
//     if (triggers.length == 0) return;
//     triggers.splice(currentTrigger, 1);
//     currentTrigger--;
//     updateTriggersPreview();
// }

// function clickToggleTiggerViewMode() {
//     viewTriggers = !viewTriggers;
// }

// function createTrigger(name, transform) {
//     return {
//         id: "trigger",
//         events: [],
//         name: name,
//         layer:currentLayer,
//         transform: transform
//     };
// }