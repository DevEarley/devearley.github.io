var triggers = [];
var currentTrigger = 0;
var viewTriggers = true;

function drawTriggersLoop() {
    if (!viewTriggers) return;
    triggers.forEach(function (trigger,index) {
        drawTriggerWithOffset(trigger, index == currentTrigger);
    });
}

function drawTigger(trigger, selected, offx, offy, thisLayerObj, error) {
    var thisLayer = currentLayer == trigger.layer;
    var label = trigger.name + (error?"Missing Layer" :(!thisLayer ? " " + thisLayerObj.name : ""));
    var x = (trigger.transform.x * 16) + offx,
        y = (trigger.transform.y * 16) + offy,
        width = trigger.transform.width * 16,
        height = trigger.transform.height * 16;

    var transparentColor = error ? "rgba(255,0,0,0.1)" : selected ?
        (!thisLayer ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)")
        : thisLayer ? "rgba(0,200,0,0.5)"
        : "rgba(0,200,0,0.05)";

    var solidColor = selected ? "rgb(255,255,255)" : !thisLayer ? "rgba(0,200,0,0.1)" : "rgb(0,200,0)";
    ctx.fillStyle = transparentColor;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = solidColor;
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = !thisLayer ? "rgba(0,0,0,0.1)" : '#000';
    ctx.fillText(trigger.name, x, y + height + 16);
    ctx.fillStyle = solidColor;
    ctx.fillText(label, x + 1, y + height + 15);
}

function drawTriggerWithOffset(trigger, selected) {
    var thisLayerObj = layers[trigger.layer];
    var error = thisLayerObj == null;
    if (perspectiveView) {
        var order = thisLayerObj != null ? thisLayerObj.order:0;
        var currentOrder = layers[currentLayer].order;
        var offsetIndex = order - currentOrder;
        var direction = currentOrder >= order;
        var mouseXoffset = mouseX - (sx);
        var mouseYoffset = mouseY - (sy);
        var offX = (mouseXoffset * offsetIndex / 2) * (direction ? 1 : -1);
        var offY = (mouseYoffset * offsetIndex / 2) * (direction ? 1 : -1);
        drawTigger(trigger, selected, offX, offY, thisLayerObj, error);
    }
    else {
        drawTigger(trigger, selected, 0, 0, thisLayerObj, error);
    }
}

function generateHTMLForTriggersPreview() {
    var rows = "";
    triggers.forEach(function (trigger, index) {
        var classes = "button" + (currentTrigger == index ? " selected" : "");
        rows += "<div class='" + classes + "' onclick='clickSelectTrigger(" + index + ")'>" + trigger.name + " </div>";
    });
    return "<div>" + rows + "</div>";
}

function clickSelectTrigger(index) {
    currentTrigger = index;
    updateTriggersPreview();
}

function clickRenameTrigger() {
    triggers[currentTrigger].name = renameTriggerInput.value;
    updateTriggersPreview();
}
function updateTriggersPreview() {
    if (currentTrigger == null) return;
    viewTriggers = true;
    triggersPreview.innerHTML = generateHTMLForTriggersPreview();
    renameTriggerInput.value = triggers[currentTrigger].name;

    toggleToolBar(true, triggersToolBarElement, triggersToolBarButtonElement);
}

function clickCreateTriggerArea() {
    var upperBoundX = brushTool.xPos1 > brushTool.xPos2 ? brushTool.xPos1 : brushTool.xPos2;
    var lowerBoundX = brushTool.xPos1 < brushTool.xPos2 ? brushTool.xPos1 : brushTool.xPos2;
    var upperBoundY = brushTool.yPos1 > brushTool.yPos2 ? brushTool.yPos1 : brushTool.yPos2;
    var lowerBoundY = brushTool.yPos1 < brushTool.yPos2 ? brushTool.yPos1 : brushTool.yPos2;
    triggers.push(createTrigger(
        "area trigger " + triggers.length,
        { x: lowerBoundX, y: lowerBoundY, width: (upperBoundX - lowerBoundX) + 1, height: (upperBoundY - lowerBoundY) + 1, },
        "Area"));
    currentTrigger = triggers.length - 1;
    updateTriggersPreview();
}

function clickCreateTriggerPoint() {
    triggers.push(createTrigger(
      "point trigger " + triggers.length,
      { x: mouseX, y: mouseY, width: 1, height: 1 },
      "Point"));
    currentTrigger = triggers.length - 1;
    updateTriggersPreview();
}


function triggerBrushClickHandler() {
    brushTool.mode = 3;
    brushTool.state = brushTool.state == 0 ? 1 : 0;

    if (brushTool.state == 1) {
        brushTool.xPos1 = mouseX;
        brushTool.yPos1 = mouseY;
    }

    if (brushTool.state == 0) {
        brushTool.xPos2 = mouseX;
        brushTool.yPos2 = mouseY;
        clickCreateTriggerArea();
    }
}

function clickRemoveSelectedTrigger() {
    if (triggers.length == 0) return;
    triggers.splice(currentTrigger, 1);
    currentTrigger--;
    updateTriggersPreview();
}

function clickToggleTiggerViewMode() {
    viewTriggers = !viewTriggers;
}


function createTrigger(name, transform, type) {
    return {
        events: [],
        type: type,
        name: name,
        layer:currentLayer,
        transform: transform
    };
}

