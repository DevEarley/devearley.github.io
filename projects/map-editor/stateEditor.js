var gameState = [
    { id: 'gs1', name: 'door1', value: 'open' },
    { id: 'gs2', name: 'door2', value: 'locked' },
    { id: 'gs3', name: 'door3', value: 'open' }],
playerState = [
    { id: 'ps1', name: 'Tri', value: 'open' },
    { id: 'ps2', name: 'Lub', value: 'open' }];

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
    html += "<input type='text' id='GSNameInput' />";
    gameState.forEach(function (gs) {
        html += "<div class='gs-name'>";
        html += gs.name;
        html += " : ";
        html += "<input type='text' id='PSNameInput' onblur='onBlurInput()'  onfocus='focusNode(\"" + gs.id + "\")' placeholder='" + gs.value + "'/>";
        if (gs.focused == true) {
            html += updateNodeHTML(gs.id);
        }
        html += "</div>";
    });
    return html + "</div>" + addNodeHTML();
}

function generatePlayerStatePopupHTML() {
    var html = "<div><h1>Player State</h1>";
    html += "<input type='text' id='PSNameInput' />";
    playerState.forEach(function (ps) {
        html += "<div class='ps-name'>";
        html += ps.name;
        html += " : ";
        html += "<input type='text' id='PSNameInput' onblur='onBlurInput()'  onfocus='focusNode(\""+ps.id+"\")' placeholder='"+ps.value+"'/>";
        if (ps.focused == true)
        {
            html += updateNodeHTML(ps.id);
        }
        
        html += "</div>";
    });
    return html + "</div>" + addNodeHTML();
}

function addNodeHTML(type) {
    return "<div class='add-node-button' onclick='addNode(\""+type+"\")'>+</div>";
}

function focusNode(id)
{
    onFocusInput();
    var type = id.substring(0, 2);
    if (type == 'ps') {
        playerState.forEach(function (ps) {
            if (id == ps.id) 
                ps.focused = true;
            else
                ps.focused = false;
        });
        refreshPlayerStatePopup();
    }

    if (type == 'gs') {
        gameState.forEach(function (gs) {
            if (id == gs.id)
                gs.focused = true;
            else
                gs.focused = false;
        });
        refreshGameStatePopup()
    }
}
function updateNodeHTML(id) {
    return "<div class='edit-node-button' onclick='editNode(\"" + id + "\")'>update</div>";
}

function addNode(type)
{
    if (type == 'ps') {
        playerState.push({ id: 'ps' + playerState.length, name: 'new ps', value: '' });
        refreshGameStatePopup();
    }

    if (type == 'gs') {
        gameState.push({ id: 'gs' + gameState.length, name: 'new gs', value: '' });
        refreshPlayerStatePopup();
    }
}

function editNode(id) {
    var type = id.substring(0, 2);
    if (type == 'ps') {
        playerState.forEach(function (ps) {
            if(id == ps.id)
            {

            }
        });
    }

    if (type == 'gs') {
        gameState.forEach(function (gs) {
            if (id == gs.id) {

            }
        });
    }
}