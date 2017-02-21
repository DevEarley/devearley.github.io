var currentAction = null, currentActionParam = null, viewActions = true;

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

function clickAddParamToSelectedAction() {
    var action = getCurrentAction();
    if (action == null) return;

    var name = renameActionParamInput.value == "" ? "param " + action.params.length : renameActionParamInput.value;
    action.params.push(createActionParam(name));
    currentActionParam = action.params.length - 1;
    updateActionParamsPreview(action);
}

function clickRenameAction() {
    var action = getCurrentAction();
    action.name = renameActionInput.value;
    updateActionsPreview(event);
}

function clickRenameActionParam() {
    var param = getCurrentActionParam();
    if (param == null) return;
    param.name = renameActionParamInput.value;
    updateActionParamsPreview(event);
}

function updateActionsPreview(event) {
    if (currentAction == null || event == null) {
        actionsPreview.innerHTML = "";
        return;
    }
    var currentActionObj = getCurrentAction();
    updateActionParamsPreview(currentActionObj);
    viewActions = true;
    actionsPreview.innerHTML = generateHTMLForActionsPreview(event.actions);
    renameActionInput.placeholder = currentActionObj == null ? '' : currentActionObj.name;
    renameActionInput.value = "";
}

function updateActionParamsPreview(action) {
    if (currentActionParam == null || action == null) {
        actionParamsPreview.innerHTML = "";
        return;
    }
    var currentActionParamObj = action.params[currentActionParam];
    viewActions = true;
    actionParamsPreview.innerHTML = generateHTMLForActionParamsPreview(action.params);
    renameActionParamInput.placeholder = currentActionParamObj == null ? '' : currentActionParamObj.name;
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

function clickSelectActionParam(index) {
    var action = getCurrentAction();
    if (action == null) return;
    currentActionParam = index;
    updateActionParamsPreview(action);
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

function generateHTMLForActionParamsPreview(currentParams) {
    var rows = "";
    if (currentParams == null) return rows;
    currentParams.forEach(function (parameter, index) {
        var classes = "button" + (currentActionParam == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectActionParam(" + index + ")'>" + parameter.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}

function getCurrentActions() {
    var event = getCurrentEvent();
    return event.actions;
}

function getCurrentActionParams() {
    var action = getCurrentAction();
    return action.params;
}

function getCurrentActionParam() {
    var action = getCurrentAction();
    return action.params[currentActionParam];
}

function createAction(name) {
    return {
        id: genID(),
        type: "Action",
        params: [],
        name: name,
    };
}

function createActionParam(name) {
    return {
        id: genID(),
        type: "Param",
        params: [],
        name: name,
    };
}