// tests
// let input1 = 'two3bhlrgqjxbc6crzbvzmz9nqfdtztvqbhcrjptdvm'
// let input2 = 'rcmlkj5'
// let input3 = 'lltwo4ninestwoseven1l'

function getData(){
    const fs = require('fs');
    const output = fs.readFileSync('input.txt').toString();

    return output;
};

function findNumbers(input) {
    const currentLine = input;
    let numbers = [];

    for (let i = 0; i < input.length; i++) {
        const currentCharacter = currentLine[i];
        if (isNaN(currentCharacter)) { continue };
        numbers.push(Number(currentCharacter));
    }

    if (numbers.length === 0) {
        return 0;
    }

    const firstNumber = numbers[0];
    const lastNumber = numbers.at(-1);

    return Number(`${firstNumber}${lastNumber}`);
}

function allNumbers() {
    const data = getData().split("\n");
    let numberArray = [];

    for (let i = 0; i < data.length; i++) {
        const currentLine = data[i];
        let numberFound = findNumbers(currentLine)
        numberArray.push(numberFound);
    }

    return numberArray;
}

function sumNumbers() {
    const numberArray = allNumbers();
    let totalSum = 0;

    for (let i = 0; i < numberArray.length; i++) {
        totalSum += numberArray[i];
    }

    return totalSum;
}

console.log(sumNumbers());




