const firstName = document.querySelector("#firstName"),
    lastName = document.querySelector("#lastName"),
    search = document.querySelector('#search'),
    playerCard = document.querySelector('#player-card');



async function fetchapi() {
    const playerResponse = await fetch(`http://api.suredbits.com/nfl/v0/players/${lastName.value}/${firstName.value}`);

    const statsResponse = await fetch(`http://api.suredbits.com/nfl/v0/stats/${lastName.value}/${firstName.value}`);

    const player = await playerResponse.json();
    const stats = await statsResponse.json();

    return {
        player,
        stats
    };
}

function searchPlayer(e) {
    e.preventDefault();

    fetchapi()
    .then(function(data) {
    findPosition(data.player[0], data.stats[0]);
    firstName.value = '';
    lastName.value = '';
    })
    .catch(err => notFound());

    
}

function findPosition(player, stat){
    if(player === undefined){
        notFound();
    } else if(player.position === 'WR') {
        insertWR(player, stat.receiving);
    } else if (player.position === 'RB') {
        insertRB(player, stat.rushing);
    } else if (player.position === 'K') {
        insertK(player, stat.kicking);
    } else if (player.position === 'QB'){
        insertQB(player, stat.passing);
    }
}

function insertQB(player, stat) {
    playerCard.innerHTML = `
    <div class="card-panel teal">
    <ul class="collection with-header">
    <li class="collection-header"><h4>${player.fullName}</h4></li>
    <li class="collection-item">Season: 2016</li>
    <li class="collection-item">Passing Yards: ${stat.passingYds}</li>
    <li class="collection-item">Passing Touchdowns: ${stat.passingTds}</li>
    <li class="collection-item">Passing Interceptions: ${stat.passingInt}</li>
    <li class="collection-item">Attempts / Completions: ${stat.att} / ${stat.cmp}</li>
    </div>`
}

function insertWR(player, stat) {
    playerCard.innerHTML = `
    <div class="card-panel teal">
    <ul class="collection with-header">
    <li class="collection-header"><h4>${player.fullName}</h4></li>
    <li class="collection-item">Season: 2016</li>
    <li class="collection-item">Receiving Yards: ${stat.receivingYds}</li>
    <li class="collection-item">Receiving Touchdowns: ${stat.tds}</li>
    <li class="collection-item">Yards After Catch: ${stat.yacYds}</li>
    <li class="collection-item">Targets / Receptions: ${stat.target} / ${stat.rec}</li>
    </div>`
}

function insertRB(player, stat) {
    playerCard.innerHTML = `
    <div class="card-panel teal">
    <ul class="collection with-header">
    <li class="collection-header"><h4>${player.fullName}</h4></li>
    <li class="collection-item">Season: 2016</li>
    <li class="collection-item">Rushing Yards: ${stat.rushingYds}</li>
    <li class="collection-item">Rushing Touchdowns: ${stat.tds}</li>
    <li class="collection-item">Rushing Attempts: ${stat.attempt}</li>
    </div>`
}

function insertK(player, stat) {
    playerCard.innerHTML = `
    <div class="card-panel teal">
    <ul class="collection with-header">
    <li class="collection-header"><h4>${player.fullName}</h4></li>
    <li class="collection-item">Season: 2016</li>
    <li class="collection-item">Field Goals Attempted / Made: ${stat.fga} / ${stat.fgm}</li>
    <li class="collection-item">Extra Point Attempted / Made: ${stat.xpa} / ${stat.xpMade}</li>
    </div>`
}

function notFound() {
    playerCard.innerHTML = `<div class="card-panel red">
    <ul class="collection with-header">
    <li class="collection-header"><h4>Please Search An Offensive Player</h4></li>
    </ul>`
    setTimeout(function(){
        playerCard.innerHTML = '';
    }, 2000);
}

search.addEventListener('click', searchPlayer);
