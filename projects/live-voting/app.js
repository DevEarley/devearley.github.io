function refresh() {
    var colors = ["#fe9a58", "#326779", "#857679", "#5d3556"];
    $.getJSON("https://spreadsheets.google.com/feeds/list/1H4Kvb_CK-2mAAz5aJ_UoP_fXdS59YOMDhtBaKiGT4nA/1/public/values?alt=json", function (data) {
        for (var i = 0; i < 4; i++) {
            document.getElementsByClassName('bar')[i].style.height = (data.feed.entry[i].gsx$number.$t / data.feed.entry[0].gsx$total.$t * 500) + 'px';
            document.getElementsByClassName('bar')[i].innerHTML = data.feed.entry[i].gsx$option.$t + '<br/> <small>' + Math.floor(100 * data.feed.entry[i].gsx$number.$t / data.feed.entry[0].gsx$total.$t) + '%</small>';
            document.getElementsByClassName('bar')[i].style.background = colors[i];

        }
        var winner = data.feed.entry[0].gsx$winner.$t;
        document.getElementsByClassName('winner')[0].style.backgroundColor =
          winner == "Koi Theme" ? "#fe9a58" : winner == "Ocean Theme" ? "#326779" : winner == "Stairs Theme" ? "#857679" : "#5d3556";
        document.getElementsByClassName('winner')[0].innerHTML = 'The Current Winner is <div class="winner-value">' + winner + '</div>' +
          '<div class="total">' + data.feed.entry[0].gsx$total.$t + ' votes </div>';
    });
}
refresh();
var vote_open = true;
var vote = function () {
    refresh();
    vote_open = !vote_open;
    if (vote_open) {
        document.getElementsByClassName('vote')[0].innerHTML = "Show Voting Form";
        document.getElementsByClassName('google-form')[0].style = 'height:0px';
    }
    else {
        document.getElementsByClassName('vote')[0].innerHTML = "Hide Voting Form";
        document.getElementsByClassName('google-form')[0].style = 'height:700px';
    }

};