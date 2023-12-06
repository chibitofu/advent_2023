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

//true
let testCase1 = "Game 1: 5 red, 1 green; 6 red, 3 blue; 9 red; 1 blue, 1 green, 4 red; 1 green, 2 blue; 2 blue, 1 red"
//false
let testCase2 = "Game 8: 2 blue, 12 red; 1 green, 2 blue, 10 red; 12 red, 10 blue; 5 red, 1 green, 2 blue; 13 red, 16 blue, 1 green; 2 blue, 18 red"
//true
let testCase3 = "Game 33: 5 blue, 5 red; 8 red, 1 green, 7 blue; 1 green, 6 red"

function getData(fileName){
    const fs = require('fs');
    const output = fs.readFileSync(fileName).toString();

    return output;
};

function computeValidGames(fileName) {
    //splits on lines and removes empty lines
    const games = getData(fileName).split('\n').filter(Boolean);
    let idSum = 0;

    for (let i = 0; i < games.length; i++) {
        const isValid = validGameID(games[i])

        if (isValid) {
            idSum += isValid;
        }
    }

    return idSum;
}

//returns false or a number
function validGameID(game){
    const gameID = getGameID(game);
    const setCollection = parseSets(game);
    let gameObject = {};
    gameObject["id"] = Number(gameID);

    for (let i = 0; i < setCollection.length; i++) {
        let currentSet = setCollection[i].split(",");

        for (let j = 0; j < currentSet.length; j++) {
            const cubes = currentSet[j];
            //matches all letters after a space
            const regexColor = /\S([a-z]+)/gi;
            //matches all numbers
            const regexCount = /[\d]+/g;
            const color = String(cubes.match(regexColor)[0]);
            const count = Number(cubes.match(regexCount)[0]);

            if (checkScore(color, count) === false) {
                return false;
            }
        }
    }

    return gameObject["id"];
};

function getGameID(game) {
    //finds first number is a string (game id)
    const regex = /(\b\d+\b)/;
    const gameID = game.match(regex)[0];

    return gameID;
};

function parseSets(game){
    //selects everything after first number string (game id)
    //excluding :;
    const regex = /(\b\d+\b)\s([^:;]*)/g;
    const sets = game.match(regex);

    return sets;
};

function checkScore(color, count){
    //valid counts
    const colorChecker = {
        "red": 12,
        "green": 13,
        "blue": 14
    }

    const checkValue = colorChecker[color]

    if (count > checkValue) {
        return false;
    }

    return true;
};

/*
Part 2
For each game, find the minimum set of cubes that must have been present.
Find the power of each minimum set of cubes.
The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

The power of the minimum set of cubes in game 1 is 48 (4 red * 2 green * 6 blue).
In games 2-5 it was 12, 1560, 630, and 36, respectively.
Adding up these five powers produces the sum 2286.

What is the sum of the power of these sets?
*/
function computeMinColors(fileName) {
    //splits on lines and removes empty lines
    const games = getData(fileName).split('\n').filter(Boolean);
    let count = 0;

    for (let i = 0; i < games.length; i++) {
        const currentSet = minColors(games[i])
        const reds = currentSet["red"];
        const greens = currentSet["green"];
        const blues = currentSet["blue"];
        const colorSum = reds * greens * blues;

        //console.log(reds)
        count += colorSum;
    }

    return count;
}

function minColors(game){
    const gameID = getGameID(game);
    const setCollection = parseSets(game);
    let gameObject = {};
    gameObject["id"] = Number(gameID);
    gameObject["colors"] = {"red":0, "green":0, "blue":0};

    for (let i = 0; i < setCollection.length; i++) {
        let currentSet = setCollection[i].split(",");

        for (let j = 0; j < currentSet.length; j++) {
            const cubes = currentSet[j];
            //matches all letters after a space
            const regexColor = /\S([a-z]+)/gi;
            //matches all numbers
            const regexCount = /[\d]+/g;
            const color = String(cubes.match(regexColor)[0]);
            const count = Number(cubes.match(regexCount)[0]);

            if (gameObject["colors"][color] < count) {
                gameObject["colors"][color] = count;
            }
        }
    }

    return gameObject["colors"];
};

//expected 1867
console.log("game id sum:", computeValidGames('input.txt'));
console.log("expected:", 1867)

//expected 84538
console.log("min set power:", computeMinColors('input.txt'));
console.log("expected:", 84538)