var gameState = [],
playerState = [];

function openPopup(elem) {
    elem.style.display = 'block';
    popupContainer.style.display = 'block';
    popupOverlay.style.display = 'block';

    if (elem == playerStatePopup) {
        refreshPlayerStatePopup();
    }

    if (elem == gameStatePopup) {
        refreshGameStatePopup()
    }
}

function refreshGameStatePopup() {
    gameStatePopup.innerHTML = generateGameStatePopupHTML();
}

function refreshPlayerStatePopup() {
    playerStatePopup.innerHTML = generatePlayerStatePopupHTML();
}

function closePopups() {
    playerStatePopup.style.display = 'none';
    playerStatePopup.innerHTML = '';
    gameStatePopup.style.display = 'none';
    gameStatePopup.innerHTML = '';
    popupContainer.style.display = 'none';
    popupOverlay.style.display = 'none';
}

function generateGameStatePopupHTML() {
    var html = "<div><h1>Game State</h1>";
    gameState.forEach(function (gs) {
        html += buildTable([[
         buildInput(gs.id, "NameInput", gs.name),
         buildInput(gs.id, "ValueInput", gs.value), updateNodeHTML(gs.id), deleteNodeHTML(gs.id)]]);
    });
    return html + "</div>" + addNodeHTML('gs');
}

function generatePlayerStatePopupHTML() {
    var html = "<div><h1>Player State</h1>";
    playerState.forEach(function (ps) {
        html += buildTable([[
        buildInput(ps.id, "NameInput", ps.name),
        buildInput(ps.id, "ValueInput", ps.value), updateNodeHTML(ps.id), deleteNodeHTML(ps.id)]]);
        html += "</div>";
    });
    return html + "</div>" + addNodeHTML('ps');
}

function addOnFocusOnBlur()
{
    return' onfocus="onFocusInput()" onblur="onBlurInput() "';
}

function addNodeHTML(type) {
    return buildTable([[
        "<input type='text' placeholder='Name' id='" + type + "NameInput' />",
        "<input type='text' placeholder='Value' id='" + type + "ValueInput' />",
        "<div class='node-button' onclick='addNode(\"" + type + "\")'>+</div>"]], "AddNodeTable");
}

function buildInput(id, type, placeholder) {
    return "<input type='text' id='" + id + type + "' placeholder='" + placeholder + "'" + addOnFocusOnBlur() + "/>";
}

function buildTable(rowsByCols, tableid) {
    var html = "<table id='" + tableid + "'>";
    rowsByCols.forEach(function (row, r_index) {
        html += "<tr>";
        row.forEach(function (col, c_index) {
            html += "<td>";
            html += col;
            html += "</td>";
        });
        html += "</tr>";
    });
    html += "</table>";
    return html;
}


function updateNodeHTML(id) {
    return "<div class='node-button' onclick='editNode(\"" + id + "\")'>UPDATE</div>";
}

function deleteNodeHTML(id) {
    return "<div class='node-button' style='color:red;float:right' onclick='deleteNode(\"" + id + "\")'>DELETE</div>";
}

function deleteNode(id) {
    var type = id.substring(0, 2);

    if (type == 'ps') {
        playerState= deleteNodeFromStateMachine(playerState, id);
        refreshPlayerStatePopup();
    }
    if (type == 'gs') {
        gameState= deleteNodeFromStateMachine(gameState, id);
        refreshGameStatePopup();
    }
}

function deleteNodeFromStateMachine(sm, id) {
    var targetindex = -1;
    sm.forEach(function (s, index) {
        if (id == s.id) {
            targetindex = index;
        }
    });
    if (targetindex != -1)
       sm.splice(targetindex, 1);
    return sm;
}

function addNode(type) {

    var nameInput = document.getElementById(type + "NameInput");
    var valueInput = document.getElementById(type + "ValueInput");

    if (type == 'ps') {
        playerState.push({ id: 'ps' + playerState.length, name: nameInput.value, value: valueInput.value });
        refreshPlayerStatePopup();
    }

    if (type == 'gs') {
        gameState.push({ id: 'gs' + gameState.length, name: nameInput.value, value: valueInput.value });
        refreshGameStatePopup();
    }
}

function editNode(id) {

    var nameInput = document.getElementById(id + "NameInput");
    var valueInput = document.getElementById(id + "ValueInput");

    var type = id.substring(0, 2);
    if (type == 'ps') {
        playerState.forEach(function (ps) {
            if (id == ps.id) {
                ps.name = nameInput.value == "" ? nameInput.placeholder : nameInput.value;
                ps.value = valueInput.value == "" ? valueInput.placeholder : valueInput.value;
                ps.focused = false;
            }
        });
        refreshPlayerStatePopup();
    }

    if (type == 'gs') {
        gameState.forEach(function (gs) {
            if (id == gs.id) {
                gs.name = nameInput.value == "" ? nameInput.placeholder : nameInput.value;
                gs.value = valueInput.value == "" ? valueInput.placeholder : valueInput.value;
                gs.focused = false;
            }
        });
        refreshGameStatePopup();
    }
}