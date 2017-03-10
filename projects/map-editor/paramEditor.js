var currentParam = null, viewParams = true;

function clickAddParamToSelectedAction() {
    var action = getCurrentAction();
    if (action == null) return;
    var name = renameParamNameInput.value == "" ? "param " + action.params.length : renameParamNameInput.value;
    var value = renameParamValueInput.value == "" ? "" : renameParamValueInput.value;
    action.params.push(createParam(name, value));
    currentParam = action.params.length - 1;
    updateParamsPreview(action);
}

function clickAddParamToSelectedCondition() {
    var condition = getCurrentCondition();
    if (condition == null) return;
    var name = renameParamNameInput.value == "" ? "param " + condition.params.length : renameParamNameInput.value;
    var value = renameParamValueInput.value == "" ? "" : renameParamValueInput.value;
    condition.params.push(createParam(name, value));
    currentParam = condition.params.length - 1;
    updateParamsPreview(condition);
}

function clickUpdateParam() {
    var param = getCurrentParam();
    if (param == null) return;
    param.name = renameParamNameInput.value;
    param.value = renameParamValueInput.value;
    updateParamsPreview(event);
}

function updateParamsPreview(parent) {
    if (currentParam == null || parent == null) {
        paramsPreview.innerHTML = "";
        return;
    }
    var currentParamObj = parent.params[currentParam];
    viewActions = true;
    paramsPreview.innerHTML = generateHTMLForParamsPreview(parent.params);
    renameParamNameInput.placeholder = currentParamObj == null ? '' : currentParamObj.name;
    renameParamValueInput.placeholder = currentParamObj == null ? '' : currentParamObj.value;
}

function clickSelectParam(index) {
    var action = getCurrentAction();
    if (action == null) return;
    currentParam = index;
    updateParamsPreview(action);
}

function generateHTMLForParamsPreview(currentParams) {
    var rows = "";
    if (currentParams == null) return rows;
    currentParams.forEach(function (parameter, index) {
        var classes = "button" + (currentParam == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectParam(" + index + ")'>" + parameter.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}

function getCurrentParams() {
    var action = getCurrentAction();
    return action.params;
}

function getCurrentConditionParams() {
    var condition = getCurrentCondition();
    return condition.params;
}

function getCurrentActionParam() {
    var action = getCurrentAction();
    return action.params[currentParam];
}


function getCurrentConditionParam() {
    var condition = getCurrentCondition();
    return condition.params[currentParam];
}

function createParam(name, value) {
    return {
        id: genID(),
        type: "Param",
        value: value,
        params: [],
        name: name,
    };
}