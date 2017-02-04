function clickAddEventToSelectedTrigger() {
    var trigger = getTrigger();
    if (trigger == null) return;
    trigger.events.push(createEvent());
}

function clickRemoveSelectedEvent() {

}

function eventBrushClickHandler() {

}

function getTrigger()
{
    return triggers[currentTrigger];
}

function generateHTMLForEventsPreview() {
    var rows = "";
    triggers.forEach(function (trigger, index) {
        var classes = "button" + (currentTrigger == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectTrigger(" + index + ")'>" + trigger.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}
function createEvent(name, transform, type) {
    return {
        actions: [],
        type: type,
        name: name,
        layer: currentLayer,
        transform: transform
    };
}
