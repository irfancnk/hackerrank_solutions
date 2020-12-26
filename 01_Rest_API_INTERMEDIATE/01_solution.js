const https = require('https');


function fetchWinner(name, year) {
    return new Promise(function(resolve, reject) {
        let url = `https://jsonmock.hackerrank.com/api/football_competitions?name=${name}&year=${year}`;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                return resolve(JSON.parse(data));
            });

        });
    });
}


function fetchHomeTeamMatches(competition, team, year, page) {
    return new Promise(function(resolve, reject) {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?competition=${competition}&year=${year}&team1=${team}&page=${page}`;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                return resolve(JSON.parse(data));
            });

        });
    });
}

function fetchAwayTeamMatches(competition, team, year, page) {
    return new Promise(function(resolve, reject) {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?competition=${competition}&year=${year}&team2=${team}&page=${page}`;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                return resolve(JSON.parse(data));
            });

        });
    });
}


async function getWinnerGoals(competition, year) {
    let winner = null;
    try {
        winner = await fetchWinner(competition, year);
    } catch (e) {
        console.log(e);
    }
    let winnerTeam = winner.data[0].winner;
    let homeResults = await fetchHomeTeamMatches(competition, winnerTeam, year, 1);
    let awayResults = await fetchAwayTeamMatches(competition, winnerTeam, year, 1);
    let teamGoals = 0;
    for (var i = 0; i < homeResults.data.length; i++) {
        teamGoals += parseInt(homeResults.data[i].team1goals);
    }
    for (var i = 0; i < awayResults.data.length; i++) {
        teamGoals += parseInt(awayResults.data[i].team2goals);
    }
    let home_total_pages = homeResults.total_pages;
    let away_total_pages = awayResults.total_pages;

    for (var i = 2; i < home_total_pages + 1; i++) {
        let currentResult = await fetchHomeTeamMatches(competition, winnerTeam, year, i);
        for (var j = 0; j < currentResult.data.length; j++) {
            teamGoals += parseInt(currentResult.data[j].team1goals);
        }
    }
    for (var i = 2; i < away_total_pages + 1; i++) {
        let currentResult = await fetchAwayTeamMatches(competition, winnerTeam, year, i);
        for (var j = 0; j < currentResult.data.length; j++) {
            teamGoals += parseInt(currentResult.data[j].team2goals);
        }
    }
    console.log(teamGoals);
}




getWinnerGoals("UEFA Champions League", "2011");
