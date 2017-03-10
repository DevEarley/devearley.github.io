var currentAction = null, viewActions = true;

function clickAddActionToSelectedEvent() {
    var event = getCurrentEvent();
    if (event == null) return;
    var name = renameActionInput.value == "" ? "action " + event.actions.length : renameActionInput.value;
    event.actions.push(createAction(name));
    currentAction = event.actions.length - 1;
    updateActionsPreview(event);
}

function clickRemoveSelectedAction() {

}

function clickRenameAction() {
    var action = getCurrentAction();
    action.name = renameActionInput.value;
    updateActionsPreview(event);
}

function updateActionsPreview(event) {
    if (currentAction == null || event == null) {
        actionsPreview.innerHTML = "";
        return;
    }
    var currentActionObj = getCurrentAction();
    updateParamsPreview(currentActionObj);
    viewActions = true;
    actionsPreview.innerHTML = generateHTMLForActionsPreview(event.actions);
    renameActionInput.placeholder = currentActionObj == null ? '' : currentActionObj.name;
    renameActionInput.value = "";
}


function getCurrentEvent() {
    var trigger = getCurrentTrigger();
    if (trigger == null) return null;
    return trigger.events[currentEvent];
}

function getCurrentAction() {
    var event = getCurrentEvent();
    if (event == null) return null;
    return event.actions[currentAction];
}

function clickSelectAction(index) {
    var event = getCurrentEvent();
    if (event == null) return;
    currentAction = index;
    updateActionsPreview(event);
}

function generateHTMLForActionsPreview(currentActions) {
    var rows = "";
    if (currentActions == null) return rows;
    currentActions.forEach(function (action, index) {
        var classes = "button" + (currentAction == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectAction(" + index + ")'>" + action.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}

function getCurrentActions() {
    var event = getCurrentEvent();
    return event.actions;
}

function createAction(name) {
    return {
        id: genID(),
        type: "Action",
        params: [],
        name: name,
    };
}
