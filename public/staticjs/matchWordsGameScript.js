//global variables for the matching game
let wordEngId = 0;
let wordHebId = 0;
let numberOfTries = 0;
let numberOfPairsGuessed = 0;
let startTime = 0;
let button = document.getElementById('startGameButton');
let wordsArray = [];

// compares 2 words, if they match, remove them from the page. If not, change the color of the clicked pair to red
const compareWords = (engId, hebId) => {
    // reset the global variables
    wordEngId = 0;
    wordHebId = 0;
    // add to number of tries
    numberOfTries += 1;
    // find the corresponding objects in the set of words
    const objectEng = wordsArray.filter(word => word.id == engId);
    const objectHeb = wordsArray.filter(word => word.id == hebId);
    // get an array of all the word elements 
    const wordElements = document.getElementsByClassName('matchCard');
    // find the picked elements
    let elementEng;
    let elementHeb;
    for (const element of wordElements) {
        if (element.innerHTML === objectEng[0].english) {elementEng = element}
        if (element.innerHTML === objectHeb[0].hebrew) {elementHeb = element}
    }
    // compare the words
    if (engId == hebId) { //if a pair is found
        // add to the number of pairs guessed
        numberOfPairsGuessed ++;
        // after 1 second, remove the pair from the page
        elementEng.style.backgroundColor = 'lightGreen';
        elementHeb.style.backgroundColor = 'lightGreen';
        setTimeout(function() {
            elementEng.remove();
            elementHeb.remove();
          }, 500); 
    }
    else { //if a pair is not found
        //change the color of the clicked pair to red
        elementEng.style.backgroundColor = 'red';
        elementHeb.style.backgroundColor = 'red';
        // change the color back to white after 1 second
        setTimeout(function() {
            elementEng.style.backgroundColor = 'white';
            elementHeb.style.backgroundColor = 'white';
          }, 500); 
    }
}

const clickOnWords = (e, side, id) => {
    // change the color of the clicked word to green and the rest to white
    const allCardsSameLanguage = e.target.parentNode.children
    for (const card of allCardsSameLanguage) {
            card.style.backgroundColor = 'white';
        }
    e.target.style.backgroundColor = 'lightBlue';
    // if the clicked word is on one side, compare it to the word on the other side
    if (side) {
        wordHebId = id; 
        if (wordEngId != 0) compareWords(wordEngId, wordHebId);
    }
    else {
        wordEngId = id;
        if (wordHebId != 0) compareWords(wordEngId, wordHebId);
    }
}

const startGame = (data) => {
    wordsArray = data;
    // get 2 sets of random numbers for displaying words
    const randomNumbersHeb = getRandomNumbers(0, wordsArray.length-1);
    const randomNumbersEng = getRandomNumbers(0, wordsArray.length-1);
    // create the cards
    let engWords = []; 
    let hebWords = [];
    for (let i = 0; i < wordsArray.length; i++) {
        engWords.push(`<div class="matchCard" onClick=clickOnWords(event,0,${wordsArray[randomNumbersEng[i]].id})>${wordsArray[randomNumbersEng[i]].english}</div>`);
        hebWords.push(`<div class="matchCard" onClick=clickOnWords(event,1,${wordsArray[randomNumbersHeb[i]].id})>${wordsArray[randomNumbersHeb[i]].hebrew}</div>`);
    }
    const engCards = engWords.join('');
    const hebCards = hebWords.join('');
    // display the cards
    document.getElementById('englishWords').innerHTML = engCards;
    document.getElementById('hebrewWords').innerHTML = hebCards;
}

//onCliclk on the start button
const startMatchingGame = () => {
    // hide the results of the previous game
    document.getElementById('gameResult').innerHTML = '';
    // hide the start game button
    button.style.display = 'none';
    // get the study set from the URL
    const url = new URL(window.location.href);
    studySet = url.searchParams.get('studySet');
    // get the words from the server
    gettheWords(studySet)
    // start the timer
    startTime = performance.now();
}

// if there are no more words left on the screen, end the game, display the results
const checkIfMatchingGameEnded = (e) => {
    if (numberOfPairsGuessed === wordsArray.length){
        // stop the timer
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        const timeResult = elapsedTime / 1000;
        // display the results
        document.getElementById('gameResult').innerHTML = `Game took ${timeResult.toFixed(3)} seconds and ${numberOfTries} attempts`;
        // rename the Start game button to Play again and show it
        button.innerHTML = 'Play again';
        button.style.display = 'inline';
    }
}

