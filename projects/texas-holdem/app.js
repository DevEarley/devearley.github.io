//TEXAS HOLD'EM - ALEX EARLEY (c) 2016

//========== Game Values =================

var gameState = -1, potValue = 0, purseValue = 100000, betValue = 100, bigBlindValue = 100, smallBlindValue = 50, raiseValue = 0, buttonsEnabled = false, showingRules = false, resetEnabled = false, cards = [], suits = ["♦", "♥", "♣", "♠"];

//================ Players ==================

var players = [{ name: "P1", playerId: 1, folded: false, bigBlind: true, smallBlind: false, betThisRound: 0 },
{ name: "P2", playerId: 2, folded: false, bigBlind: false, smallBlind: true, betThisRound: 0 },
{ name: "P3", playerId: 3, folded: false, bigBlind: false, smallBlind: false, betThisRound: 0 },
{ name: "P4", playerId: 4, folded: false, bigBlind: false, smallBlind: false, betThisRound: 0 }];

//=========== Window and Canvas ===============

var c = document.getElementsByTagName('canvas')[0], ctx = c.getContext('2d'), cw = c.width = window.innerWidth - 160, ch = c.height = window.innerHeight < 300 ? 300 : window.innerHeight - 140, mx = 0, my = 0, mdown = false;

//============ HTML Elements ===============

var potElement = document.getElementById("Pot"), purseElement = document.getElementById("Purse"), betElement = document.getElementById("Bet"), blindElement = document.getElementById("Blind"), smallBlindElement = document.getElementById("SmallBlind"), stayElement = document.getElementById("Stay"), raiseElement = document.getElementById("Raise"), toRaiseElement = document.getElementById("ToRaise"), callElement = document.getElementById("Call"), toCallElement = document.getElementById("ToCall"), foldElement = document.getElementById("Fold"), resetElement = document.getElementById("Reset"), playElement = document.getElementById("Play");

// ============ Button Actions ===============

function clickPlay() {
    playElement.style.height = "0";
    startRound()
}

function clickStay() {
    if (!buttonsEnabled) return;
    toggleButtons(false);
    opponentPlayersBet();
}

function clickRaise() {
    if (!buttonsEnabled) return;
    toggleButtons(false);
    betValue += 100;
    playerBet(betValue);
    opponentPlayersBet();
    setTimeout(function () { goToNextGameState(); }, 500);
}

function clickCall() {
    if (!buttonsEnabled) return;
    toggleButtons(false);
    playerBet(betValue - players[0].betThisRound);
    opponentPlayersBet();
    setTimeout(function () { goToNextGameState(); }, 500);
}

function clickReset() {
    if (!resetEnabled) return;
    resetEnabled = false;
    toggleButton(resetElement, false);
    resetRound();
}

function clickRules() {
    showingRules = !showingRules;
    var rules = document.getElementById("Rules");
    var rulesbutton = document.getElementById("RulesButton");
    if (showingRules) {
        toggleButtons(false);
        rulesbutton.innerHTML = "Hide&nbsp;";
        rules.style.bottom = "60px";
    }
    else {
        toggleButtons(true);
        rulesbutton.innerHTML = "Rules";
        rules.style.bottom = "100vh";
    }
}

function clickFold() {
    if (!buttonsEnabled) return;
    players[0].folded = true;
    autoPlay();
}

// ====== Betting Logic ========

function payBlinds() {
    for (var p = 0; p < players.length; p++) {
        if (players[p].bigBlind == true) {
            if (p == 1) {
                playerBet(bigBlindValue);
            }
            else
                opponentBet(players[p], bigBlindValue);
        }
        if (players[p].smallBlind == true) {
            if (p == 1) {
                playerBet(smallBlindValue);
            }
            else
                opponentBet(players[p], smallBlindValue);
        }
    }
}

function cycleBlind(bigBlindIndex, smallBlindIndex) {
    if (bigBlindIndex + 1 >= players.length)
        bigBlindIndex = 0;
    else
        bigBlindIndex++;

    if (smallBlindIndex + 1 >= players.length)
        smallBlindIndex = 0;
    else
        smallBlindIndex++;

    players[bigBlindIndex].bigBlind = true;
    players[smallBlindIndex].smallBlind = true;

}

function opponentPlayersBet() {
    for (var p = 1; p < players.length; p++) {
        if (players[p].betThisRound < betValue && !players[p].folded)
            opponentBet(players[p], betValue - players[p].betThisRound);
    }
    var i = 0;
    var intervalId = setInterval(function () {
        if (i < cardsToReset.length) {
            playSound("https://firebasestorage.googleapis.com/v0/b/texasholdem-bac69.appspot.com/o/cardSlide4.wav?alt=media&token=e784fd33-4657-4c97-b36d-38d5597146c7");
            cards[cardsToReset[i]].up = true;
            cards[cardsToReset[i]].flipped = true;
            i++;
        } else {
            resetElement.style.opacity = 1;
            clearInterval(intervalId);
        }
    }, 500)
}

function opponentBet(player, value) {
    player.betThisRound += value;
    potValue += value;
    // betValue += value;
    setNumber(betElement, betValue);
    setNumber(potElement, potValue);
}

function playerBet(value) {
    players[0].betThisRound += value;
    playSound("https://firebasestorage.googleapis.com/v0/b/texasholdem-bac69.appspot.com/o/chipsStack6.wav?alt=media&token=369cf241-ad07-4b10-8352-9a4b8921d954");
    potValue += value;
    // betValue += value;
    purseValue -= value;
    setNumber(betElement, betValue);
    setNumber(potElement, potValue);
}

function autoPlay() {
    playSound("https://firebasestorage.googleapis.com/v0/b/texasholdem-bac69.appspot.com/o/chipsStack6.wav?alt=media&token=369cf241-ad07-4b10-8352-9a4b8921d954");
    opponentPlayersBet();
    setTimeout(function () { goToNextGameState(); }, 1000);
}

function goToNextGameState() {
    bet = 0;
    gameState++;
    switch (gameState) {
        case 1:
            dealFlop();
            if (players[0].folded) setTimeout(function () { autoPlay(); }, 2000);
            break;
        case 2:
            dealTurn();
            if (players[0].folded) setTimeout(function () { autoPlay(); }, 2000);
            break;
        case 3:
            dealRiver();
            if (players[0].folded) setTimeout(function () { goToNextGameState(); }, 2000);
            break;
    }
}

//  ===== Dealer Logic ====

function dealPocketCards() {
    cardsToDeal = [];
    for (var p = 0; p < players.length; p++) {
        if (p == 0) {
            for (var i = 0; i < 2; i++) {
                cardsToDeal.push(
                [-(i * cw / 9) - cw / 10, ch / 4.5, i === 1, false, players[p].playerId]);
            }
        }

        else {
            for (var i = 0; i < 2; i++) {
                cardsToDeal.push(
                [(i * cw / 20 + cw / 6 * (p - 1)) - cw / 4.5, -290, i === 1, true, players[p].playerId]);
            }
        }
    }
    dealCards(cardsToDeal);
}

function dealFlop() {
    cardsToDeal = [];
    for (var i = 0; i < 3; i++) {
        cardsToDeal.push([-100 * i + 160, -100, true]);
    }
    dealCards(cardsToDeal);
}

function dealTurn() {
    toggleButtons(true);
    dealCard(-140, -100, true);
}

function dealRiver() {
    toggleButtons(true);
    dealCard(-240, -100, true);
    setTimeout(function () { reveal(); }, 1000);
}

function dealCards(cardsToDeal) {
    var i = 0;
    var intervalId = setInterval(function () {
        if (i < cardsToDeal.length) {
            dealCard(cardsToDeal[i][0],
            cardsToDeal[i][1],
            cardsToDeal[i][2],
            cardsToDeal[i][3],
            cardsToDeal[i][4]);
            i++;
        } else {
            toggleButtons(true);
            clearInterval(intervalId);
        }
    }, 500)
}

function dealCard(x, y, up, opponent, playerId) {
    playSound("https://firebasestorage.googleapis.com/v0/b/texasholdem-bac69.appspot.com/o/cardPlace2.wav?alt=media&token=953ac3a9-6320-4787-a1ad-1eb905314e8b");
    var card = getRandomCard();
    if (card == null) return;
    card.x = x;
    card.y = y;
    card.up = up;
    card.flipped = up;
    card.opponent = opponent;
    card.playerId = playerId;
    card.active = true;
}

//========= Game Code ============

function startRound() {
    gameState = 0;
    potValue = 0;
    bigBlindValue = bigBlindValue + 100;
    smallBlindValue = bigBlindValue / 2;
    betValue = bigBlindValue;
    updateUIValues();
    payBlinds();
    toggleButtons(false);
    playSound("https://firebasestorage.googleapis.com/v0/b/texasholdem-bac69.appspot.com/o/cardFan2.wav?alt=media&token=4b1de4c5-aab7-4296-82ca-156a84512ccb");
    setTimeout(function () { dealPocketCards(); }, 1500);
}

function resetRound() {
    resetPlayers();
    resetCards()
    startRound();
}

function resetCards() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].active = false;
        cards[i].playerId = null;
    }
}

function resetPlayers() {
    var bigBlindIndex = 0;
    var smallBlindIndex = 0;
    for (var p = 0; p < players.length; p++) {
        if (players[p].bigBlind == true)
        { bigBlindIndex = p; }
        else if (players[p].smallBlind == true)
        { smallBlindIndex = p; }
        players[p].smallBlind = false;
        players[p].bigBlind = false;
        players[p].Result = null;
        players[p].Outcome = null;
        players[p].folded = false;
    }
    cycleBlind(bigBlindIndex, smallBlindIndex);
}

function reveal() {
    toggleButtons(false);
    calculateWinner();
    var cardsToReset = [];
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].active && cards[i].flipped == false) {
            cardsToReset.push(i);
        }
    }
    var i = 0;
    var intervalId = setInterval(function () {
        if (i < cardsToReset.length) {
            playSound("https://firebasestorage.googleapis.com/v0/b/texasholdem-bac69.appspot.com/o/cardSlide4.wav?alt=media&token=e784fd33-4657-4c97-b36d-38d5597146c7");
            cards[cardsToReset[i]].up = true;
            cards[cardsToReset[i]].flipped = true;
            i++;
        } else {
            resetElement.style.opacity = 1;
            clearInterval(intervalId);
        }
    }, 500)
}

function calculateWinner() {
    for (var i = 0; i < players.length; i++) {
        players[i].Outcome = calculateHand(players[i].playerId);
        players[i].Result =
        players[i].Outcome.HasRoyalFlush ? "Royal Flush" :
        players[i].Outcome.HasStraightFlush ? "Straight Flush" :
        players[i].Outcome.HasStraight ? "Straight" :
        players[i].Outcome.HasFlush ? "Flush" :
        players[i].Outcome.Has4ofKind ? "Four of a Kind" :
        players[i].Outcome.HasFullHouse ? "Full House" :
        players[i].Outcome.Has3ofKind ? "Three of a Kind" :
        players[i].Outcome.Has2ofKind ? "Two of a Kind" :
        "High Card";
    }
}

function calculateHand(player) {
    var _values = [], _suits = [], hasStraight = false, hasFlush = false, has4ofKind = false, has3ofKind = false, has2ofKind = false, highestValue = -1;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].active &&
        (cards[i].playerId == player || cards[i].playerId == null)) {
            if (_values[cards[i].value] == null) {
                _values[cards[i].value] = [];
            }
            _values[cards[i].value].push(cards[i].suitIndex);

            if (_suits[cards[i].suitIndex] == null) {
                _suits[cards[i].suitIndex] = 0;
            }
            _suits[cards[i].suitIndex] += 1;
        }
    }
    _values.forEach(function (_suit, _index) {
        if (_suit == 4) {
            hasFlush = true;
        }
    });
    _values.forEach(function (_value, _index) {
        if (highestValue < _index) highestValue = _index;
        if (_value.length == 4) {
            has4ofKind = true;
        }
        if (_value.length == 3) {
            has3ofKind = true;
        }
        if (_value.length == 2) {
            has2ofKind = true;
        }
    });
    return {
        HasRoyalFlush: (highestValue == 13 && hasStraight && hasFlush),
        HasStraightFlush: (hasStraight && hasFlush),
        HasStraight: hasStraight,
        HasFlush: hasFlush,
        Has4ofKind: has4ofKind,
        HasFullHouse: (has3ofKind && has2ofKind),
        Has3ofKind: has3ofKind,
        Has2ofKind: has2ofKind,
        HighestValue: highestValue
    };
}

//====== UI Logic  =======

function updateUIValues() {
    setNumber(blindElement, bigBlindValue);
    setNumber(smallBlindElement, smallBlindValue);
    setNumber(betElement, betValue);
    setNumber(purseElement, purseValue);
}

function setNumber(ele, val) {
    ele.innerHTML = val > 1000 ? "" + (val / 1000) + " K" : val;
}

function generateCards() {
    for (var i = 0; i < 52; i++) {
        cards.push({
            x: i * 5 + (cw / 2 - 50),
            y: i + ch / 2 - 50,
            suit: suits[i % 4],
            suitIndex: i % 4,
            number: i % 13 == 0 ? 'A' : i % 13 == 11 ? 'J' : i % 13 == 12 ? 'Q' : i % 13 == 13 ? 'K' : i % 13,
            value: i % 13,
            w: cw / 8,
            h: cw / 6,
            active: false,
            up: false,
            red: i % 4 < 2,
            flipped: false,
            hover: false,
            opponent: false,
            playerId: null,
            xOff: 0,
            yOff: 0
        });
    }
}

function toggleButtons(on) {
    resetEnabled = on;
    buttonsEnabled = on;
    var opacity = on ? "1" : "0.2";
    stayElement.style.opacity = opacity;
    raiseElement.style.opacity = opacity;
    callElement.style.opacity = opacity;
    foldElement.style.opacity = opacity;
}

function toggleButton(button, on) {
    var opacity = on ? "1" : "0.2";
    button.style.opacity = opacity;
}

function cardsLoop() {
    var activeCardIndex = 0;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].active) {
            if (cards[i].hover) activeCardIndex++;
            updateCard(cards[i], activeCardIndex);
            renderCard(cards[i]);
        }
    }
}

var updateCard = function (shape, index) {
    if (shape.opponent) return;
    if (mx > cw / 2 + shape.x && mx < (cw / 2 + shape.x + shape.w) && my > ch / 2 + shape.y && my < (ch / 2 + shape.y + shape.h)) {
        shape.hover = true;
    } else if (!mdown) {
        shape.hover = false;
    }
    if (shape.hover || shape.up) {
        shape.flipped = true
    }
    else {
        shape.flipped = false
    }
}

var renderCard = function (shape) {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    var _w = shape.opponent ? shape.w / 2 : shape.w;
    var _h = shape.opponent ? shape.h / 2 : shape.h;
    var _suitSize = _w / 1.5;
    var _valueSize = _w / 2;
    var _offsetSuitX = _w / 5;
    var _offsetSuitY = _h / 10;
    var _offsetValueX = _w / 5;
    var _offsetValueY = _h / 3;
    drawCard(shape.x, shape.y, _w, _h, 10);
    if (shape.flipped) {
        ctx.fillStyle = "#FFF";
        drawCard(shape.x + 5, shape.y + 5, _w - 10, _h - 10, 8);
        if (shape.red) {
            ctx.fillStyle = "#FF5b5b";
        }
        else {
            ctx.fillStyle = "#5b5b5b";
        }
        ctx.font = _suitSize + "px Medula One";
        ctx.fillText(shape.suit,
        cw / 2 + shape.x + _w / 2 - _offsetSuitX,
        ch / 2 + _h / 2 + shape.y - _offsetSuitY);
        ctx.font = _valueSize + "px Medula One";
        ctx.fillText(shape.number,
        cw / 2 + shape.x + _w / 2 + _offsetValueX,
        ch / 2 + _h / 2 + shape.y + _offsetValueY);
    }
    else {
        ctx.fillStyle = "#FF5b5b";
        drawCard(shape.x + 5, shape.y + 5, _w - 10, _h - 10, 8);
    }
}

function drawCard(x, y, w, h, r) {
    ctx.roundRect(cw / 2 + x, ch / 2 + y, w, h, r).fill();
}

function drawUI() {
    if (gameState == -1) return;
    ctx.fillStyle = "#115000";
    var _width = 550;
    ctx.roundRect(cw / 2 - _width / 2,
    ch / 2 - ch / 8, _width,
    ch / 4, cw / 60).fill();
}

function drawPlayers() {
    if (gameState == -1) return;
    drawPlayerOne();
    drawOpponents();
}

function drawPlayerOne() {
    ctx.textAlign = "center";
    ctx.fillStyle = "#115000";
    ctx.roundRect(cw / 4,
    ch / 2 + ch / 6,
    cw / 2,
    ch / 3.6,
    cw / 60).fill();
    ctx.font = cw / 25 + "px Miriam Libre";
    ctx.fillStyle = "#FFF";
    ctx.fillText(players[0].name,
    cw / 2 + cw / 8,
    ch / 2 + ch / 3 - cw / 25);
    ctx.font = cw / 40 + "px Miriam Libre";
    ctx.fillText("Bet $" + players[0].betThisRound,
    cw / 2 + cw / 8,
    ch / 2 + ch / 3 + cw / 25);
    if (players[0].Result != undefined)
        ctx.fillText(players[0].Result,
        cw / 2 + cw / 8,
        ch / 2 + ch / 3);
    else if (players[0].bigBlind)
        ctx.fillText("Big Blind",
        cw / 2 + cw / 8,
        ch / 2 + ch / 3);
    else if (players[0].smallBlind)
        ctx.fillText("Small Blind",
        cw / 2 + cw / 8,
        ch / 2 + ch / 3);
}

function drawOpponents() {
    for (var p = 1; p < players.length; p++) {
        ctx.fillStyle = "#115000";
        ctx.roundRect(cw / 2 - (p - 1) * -150 - 200,
        ch / 2 - 300,
        100,
        110, 10).fill();
        ctx.fillStyle = "#FFF";
        ctx.font = "20px Miriam Libre";
        ctx.fillText(players[p].name,
        cw / 2 - (p - 1) * -150 - 150,
        ch / 2 - 220);
        ctx.font = "12px Miriam Libre";
        ctx.fillText("Bet $" + players[p].betThisRound,
        cw / 2 - (p - 1) * -150 - 150,
        ch / 2 - 175);
        if (players[p].Result != undefined)
            ctx.fillText(players[p].Result,
            cw / 2 - (p - 1) * -150 - 150,
            ch / 2 - 200);
        else if (players[p].bigBlind)
            ctx.fillText("Big Blind",
            cw / 2 - (p - 1) * -150 - 150,
            ch / 2 - 200);
        else if (players[p].smallBlind)
            ctx.fillText("Small Blind",
            cw / 2 - (p - 1) * -150 - 150,
            ch / 2 - 200);
    }
}

// === Helper Functions ===== 

function getRandomCard() {
    var deactiveCards = [];
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].active == false) deactiveCards.push(i);
    }
    var randomCard = Math.floor((Math.random() * deactiveCards.length));
    return cards[deactiveCards[randomCard]];
}

function playSound(url) {
    var a = new Audio(url);
    a.play();
}

var clear = function () {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cw, ch);
}

var mousemove = function (e) {
    mx = e.pageX - c.offsetLeft;
    my = e.pageY - c.offsetTop;
}

var addEvent = function (object, type, callback) {
    if (object == null || typeof (object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on" + type] = callback;
    }
};

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}

// ====  Flow ====

var loop = function () {
    clear();
    drawUI();
    drawPlayers();
    cardsLoop();
}

function init() {
    window.onload = function () {
        this.addEventListener('mousemove', mousemove);
    }
    addEvent(window, "resize", function (event) {
        cw = c.width = window.innerWidth - 160;
        ch = c.height = window.innerHeight - 80;
    });
    generateCards();
    updateUIValues();
    setInterval(loop, 16);
    toggleButtons(false);
}

init();// JavaScript source code
