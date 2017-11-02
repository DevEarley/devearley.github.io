var database = null, output = document.getElementById("Output"), statusElem = document.getElementById("Status"), bountiesElem = document.getElementById("Bounties"), supplies = document.getElementById("Supplies"), hunger = document.getElementById("Hunger"), cash = document.getElementById("Cash"), hp = document.getElementById("HP"), sanity = document.getElementById("Sanity"), lastRest = document.getElementById("LastRest"), time = document.getElementById("Time"), days = document.getElementById("Days"), player = { time: 0, lastRest: 0, days: 0, cash: 600, hp: 100, hunger: 0, sanity: 100, supplies: 100 }, isLoading = false;



function init() {
    var config = {
        apiKey: "AIzaSyBN_Kvs_IuB6XnD6M5Pk15vWZQwxePmhTs",
        authDomain: "shoshingamestudio-90843.firebaseapp.com",
        databaseURL: "https://shoshingamestudio-90843.firebaseio.com",
        storageBucket: "shoshingamestudio-90843.appspot.com",
        messagingSenderId: "124515847756"
    };
    firebase.initializeApp(config);
    database = firebase.database();
    updateStats();
    bountiesElem.innerHTML = generateBountyButton();
}

function updateStats() {
    sanity.innerHTML = player.sanity;
    supplies.innerHTML = player.supplies;
    hunger.innerHTML = player.hunger;
    hp.innerHTML = player.hp;
    cash.innerHTML = player.cash;
    lastRest.innerHTML = player.lastRest;
    time.innerHTML = player.time + ":00";
    days.innerHTML = player.days;
    bountiesElem.innerHTML = generateBountyButton();
}

var currentBounty = { name: '', active: false, found: false, price: 0, reward: 0 };
var bounties = [];

function generateBountyButton() {
    var result = "";
    if (currentBounty.active == false)
       
    if ((currentBounty.name != ''))
        result += ("<div class='bounty' style='width:auto;' onclick='buyBounty(" + currentBounty.price + ")' >Buy " + currentBounty.name + " for $" + currentBounty.price + "<br/>($" + currentBounty.reward + " Reward)</div>");
    bounties.forEach(function (bounty, index) {
        result += "<div class='bounty'>" + bounty.name
            + (bounty.found == true ? " | Found" : "")
            + " |  $" + bounty.reward + " Reward</div>"
    });

    return result;
}

function buyBounty(price) {
    if (isLoading) return;
    if (player.cash >= price) {
        player.cash -= price;
        bounties.push({
            name: currentBounty.name,
            price: currentBounty.price,
            reward: currentBounty.reward
        });
        currentBounty = { name: '', active: false, found: false, price: 0, reward: 0 };
        advanceTime();
    }
    updateStats();
}
function searchBounty() {
    advanceTime();
    getWordForBounty();
    updateStats();
}

function seek() {
    if (player.sanity == 0) return;
    clickDownload();
}

function rest() {
    if (isLoading) return;
    player.lastRest = 0;
    advanceTime();
    player.sanity = Math.floor((100 - player.sanity) / 2 + player.sanity);
    updateStats();
    setTimeout(function () {
        advanceTime();
        player.lastRest = 0;
        player.sanity = 100;
        updateStats();
    }, 1000);
}

function eat() {
    if (isLoading) return;
    if (player.supplies <= 0)
        return;
    player.supplies--;
    advanceTime();
    player.hunger = 0;
    updateStats();
}

function shop() {
    if (player.sanity == 0) return;
    if (isLoading) return;
    if (player.cash >= 20) {
        player.cash -= 20;
        player.supplies = 100;
        advanceTime();
        updateStats();
    }
}

function advanceTime() {
    player.time++;
    if (player.time >= 24) {
        player.days++;
        player.lastRest++;
        player.hunger++;
        player.time = 0;
        player.supplies--;
        if (player.supplies <= 0) {
            player.supplies = 0;
            player.hp--;
        }
    }

    if (player.lastRest > 18) {
        player.sanity--;
    }
    if (player.lastRest > 24) {
        player.sanity--;
    }
    if (player.lastRest > 48) {
        player.sanity--;
    }
    if (player.hunger > 50) {
        player.hp--;
    }
    if (player.hunger > 75) {
        player.hp--;
    }
    if (player.hunger > 100) {
        player.hp--;
        player.hunger = 100;
    }


}

function clickDownload() {
    var key = getRandomLetter()
        + getRandomLetter()
        + getRandomLetter()
        + getRandomLetter()
        + getRandomLetter()
        + getRandomLetter()
        + getRandomLetter()
        + getRandomLetter();
    downloadWords(key);
}

function getWordForBounty() {
    var bounty = getRandomBounty();
    currentBounty.name = bounty;
    currentBounty.price = Math.floor(50 / currentBounty.name.length) * 10;
    currentBounty.reward = currentBounty.name.length * 100;
    bountiesElem.innerHTML = generateBountyButton();

}

function toggleLoading(loading) {
    isLoading = loading;
    statusElem.innerHTML = loading ? "Loading..." : "";
}
function clickWord(key) {
    if (isLoading) return;
    downloadWords(key);
}
function downloadWords(key) {
    toggleLoading(true);
    advanceTime();
    updateStats();
    var rootRef = database.ref();
    var dictionaryRef = rootRef.child("Dictionary");
    var dictionaryQuery = dictionaryRef.orderByKey().endAt(key).limitToLast(4);
    return dictionaryQuery.once("value").then(function (snapshot) { onSuccess(snapshot, key); });
}

function onSuccess(snapshot, key) {
    toggleLoading(false);
    var val = snapshot.val();
    var definition = Object.entries(val);
    if (val != null) {
        output.innerHTML = "<br/>(<i>key: " + key + "</i>)<hr/>" + output.innerHTML;
        definition.forEach(function (defdef) {
            var def = defdef[1]
                .replace(/(\w+)/g, function (a, b) {
                    return "<a href='#"
                        + a.toUpperCase() + "'onclick='clickWord(\""
                        + a.toUpperCase() + "\")'>" + a + "</a>";
                });
            output.innerHTML = defdef[0] + ", " + def + " <br/>" + output.innerHTML;
        });
    }
    searchForBounty();
}

function searchForBounty() {
    var text = output.innerHTML.toUpperCase();
    bounties.forEach(function (bounty, index) {
        if (text.search(bounty.name.toUpperCase()) != -1) findBounty(bounty);
    });
}

function findBounty(bounty) {
    bounty.found = true;
    player.cash += bounty.reward;
}

function getRandomLetter() {
    var letters = "AEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUAEIOUETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMETAOINSHRDLCUMABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function getRandomBounty() {
    return bountyWords[(Math.floor(Math.random() * bountyWords.length - 1))].toUpperCase();
}

init();

