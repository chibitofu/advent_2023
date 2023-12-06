// Determine which games would have been possible if the bag had been loaded
// with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of
// the IDs of those games?

//red 12
//green 13
//blue 14

//parse game to separate each set
//compare each set to the key
//if pass record ID

/*
{
    "id": 1,
    "sets": [
        {"red": 5,
        "green": 1,
        "blue": 3},
        {"red": 6,
        "green": 2,
        "blue": 2}
    ]
}
*/

let testCase1 = "Game 1: 5 red, 1 green; 6 red, 3 blue; 9 red; 1 blue, 1 green, 4 red; 1 green, 2 blue; 2 blue, 1 red"
let testCase2 = "Game 8: 2 blue, 12 red; 1 green, 2 blue, 10 red; 12 red, 10 blue; 5 red, 1 green, 2 blue; 13 red, 16 blue, 1 green; 2 blue, 18 red"
let testCase3 = "Game 33: 5 blue, 5 red; 8 red, 1 green, 7 blue; 1 green, 6 red"

function parseGame(game){
    const gameID = getGameID(game);
    const setCollection = parseSets(game);
    let gameObject = {};
    gameObject["id"] = Number(gameID);
    gameObject["sets"] = [];

    for (let i = 0; i < setCollection.length; i++) {
        let currentSet = setCollection[i].split(",");

        for (let j = 0; j < currentSet.length; j++) {
            const cubes = currentSet[j];
            //matches all letters after a space
            const regexColor = /\S([a-z]+)/gi
            const regexCount = /[\d]+/g
            const color = String(cubes.match(regexColor)[0]);
            const count = Number(cubes.match(regexCount)[0]);
            let setObject = {}

            setObject[color] = count;
            gameObject["sets"].push(setObject);
        }
    }

    return gameObject
}

function getGameID(game) {
    //finds first number is a string
    const regex = /(\b\d+\b)/
    const gameID = game.match(regex)[0];

    return gameID;
}

function parseSets(game){
    //selects everything after first number string
    //excluding :;
    const regex = /(\b\d+\b)\s([^:;]*)/g
    const sets = game.match(regex);

    return sets;
}

console.log(parseGame(testCase1));