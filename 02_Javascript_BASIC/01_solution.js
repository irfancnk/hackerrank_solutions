const https = require('https');


function getPageAtYear(year, page) {
    let url = "https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=" + year + "&page=" + page
    return new Promise(function (resolve, reject) {
        https.get(url, (res) => {
            let result = "";
            res.on('data', (d) => {
                result += d;
            });
            res.on('end', function () {
                return resolve(JSON.parse(result));
            });
        }).on('error', (e) => {
            console.error(e);
        });

    });

}

function analyzeList(dataList, teams) {
    for (let i = 0; i < dataList.length; i++) {
        if (teams[dataList[i].team1] === undefined) {
            teams[dataList[i].team1] = 1;
        } else {
            teams[dataList[i].team1] += 1;
        }
        if (teams[dataList[i].team2] === undefined) {
            teams[dataList[i].team2] = 1;
        } else {
            teams[dataList[i].team2] += 1;
        }
    }
    return teams;
    
}



async function getTeams(year, k) {
    let currentPage = await getPageAtYear(year, 1);
    let { total_pages } = currentPage;
    let teams = {};
    teams = analyzeList(currentPage.data, teams)
    for (let i = 2; i <= total_pages; i++) {
        currentPage = await getPageAtYear(year, i);
        teams = analyzeList(currentPage.data, teams);
    }
    let lookingFor = [];
    let teamNames = Object.keys(teams);
    for (let i = 0; i < teamNames.length; i++) {
        if (teams[teamNames[i]] >= k) {
            lookingFor.push(teamNames[i]);
        }
        
    }
    lookingFor = lookingFor.sort();
    for (let i = 0; i < lookingFor.length; i++) {
        console.log(lookingFor[i]);
    }
    return lookingFor;
}


getTeams(2015, 13)