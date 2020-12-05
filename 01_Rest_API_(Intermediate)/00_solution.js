const https = require('https');

async function fetcher(year, page) {
    return new Promise(function(resolve, reject) {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${page}`;
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



async function getNumDraws(year) {
    var result = null;
    try {
        result = await fetcher(year, 1);
    } catch (e) {
        console.log(e);
    }
    let drawMatches = 0;
    let {total_pages} = result;
    for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].team1goals === result.data[i].team2goals) {
            drawMatches++;
        }
    }

    let batchGetList = [];
    for (var i = 2; i < total_pages + 1; i++) {
        batchGetList.push(
            fetcher(year, i)
        );
        if (batchGetList.length === 50) {
            let batchResult = await Promise.all(batchGetList);
            for (var j = 0; j < batchResult.length; j++) {
                let currentResult = batchResult[j];
                for (var k = 0; k < currentResult.data.length; k++) {
                    if (currentResult.data[k].team1goals === currentResult.data[k].team2goals) {
                        drawMatches++;
                    }
                }
            }
            batchGetList = [];
        }
    }
    let batchResult = await Promise.all(batchGetList);
    for (var j = 0; j < batchResult.length; j++) {
        let currentResult = batchResult[j];
        for (var k = 0; k < currentResult.data.length; k++) {
            if (currentResult.data[k].team1goals === currentResult.data[k].team2goals) {
                drawMatches++;
            }
        }
    }
    console.log(drawMatches);
    return drawMatches;
}


getNumDraws("2011");
