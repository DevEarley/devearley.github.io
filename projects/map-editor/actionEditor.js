var currentAction = 0, currentParameter = 0;
function clickAddActionToSelectedEvent() {

}

function clickRemoveSelectedAction() {

}

function actionBrushClickHandler() {

}

function clickSelectedAction()
{

}

function generateHTMLForActionsPreview() {
    var rows = "";
    var currentActions = getCurrentActions();
    if (currentActions == null) return rows;
    currentActions.forEach(function (action, index) {
        var classes = "button" + (currentAction == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectedAction(" + index + ")'>" + action.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}

function generateHTMLForActionParamsPreview() {
    var rows = "";
    var currentParams = getCurrentActionParams();
    if (currentParams == null) return rows;
    currentParams.forEach(function (parameter, index) {
        var classes = "button" + (currentParameter == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectedParameter(" + index + ")'>" + parameter.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}

function getCurrentActions() {

}

function getCurrentActionParams() {

}


function createAction(name, transform, type) {
    return {
        params: [],
        type: type,
        name: name,
        layer: currentLayer,
        transform: transform
    };
}
