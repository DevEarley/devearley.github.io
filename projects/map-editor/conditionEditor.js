var currentCondition = null, currentConditionParam = null, viewConditions = true;

function clickAddConditionToSelectedEvent() {
    var event = getCurrentEvent();
    if (event == null) return;
    var name = renameConditionInput.value == "" ? "condition " + event.conditions.length : renameConditionInput.value;
    event.conditions.push(createCondition(name));
    currentCondition = event.conditions.length - 1;
    updateConditionsPreview(event);
}

function clickRemoveSelectedCondition() {

}

function clickRenameCondition() {
    var condition = getCurrentCondition();
    condition.name = renameConditionInput.value;
    updateConditionsPreview(event);
}

function updateConditionsPreview(event) {
    if (currentCondition == null || event == null) {
        conditionsPreview.innerHTML = "";
        return;
    }
    var currentConditionObj = getCurrentCondition();
    viewConditions = true;
    conditionsPreview.innerHTML = generateHTMLForConditionsPreview(event.conditions);
    renameConditionInput.placeholder = currentConditionObj == null ? '' : currentConditionObj.name;
    renameConditionInput.value = "";
}

function getCurrentCondition() {
    var event = getCurrentEvent();
    if (event == null) return null;
    return event.conditions[currentCondition];
}

function clickSelectCondition(index) {
    var event = getCurrentEvent();
    if (event == null) return;
    currentCondition = index;
    updateConditionsPreview(event);
}

function generateHTMLForConditionsPreview(currentConditions) {
    var rows = "";
    if (currentConditions == null) return rows;
    currentConditions.forEach(function (condition, index) {
        var classes = "button" + (currentCondition == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectCondition(" + index + ")'>" + condition.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}

function getCurrentConditions() {
    var event = getCurrentEvent();
    return event.conditions;
}

function createCondition(name) {
    return {
        id: genID(),
        type:"Condition",
        name: name,
    };
}