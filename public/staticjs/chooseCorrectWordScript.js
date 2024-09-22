//global variables for the choosing game
let button = document.getElementById('startGameButton');
let index = 0;
let randomNumbers = [];
const numberOfOptions = 3;
let numberOfPairsGuessed = 0;
let studySet = '';


const postResults = async (name, timeResult) => {
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({  
            "username": name,
            "set_name": studySet,
            "game_name": "Choose Correct Word",
            "correct_answers": numberOfPairsGuessed,
            "time_spent": timeResult})
    }
    apiRequest('http://localhost:3000/api/playerstatistics', options)
}

const finishGame = () => {
    // stop the timer
    const endTime = performance.now();
    // calculate the time
    const elapsedTime = endTime - startTime;
    const timeResult = elapsedTime / 1000;
    //get the user's name
    //!! This is for posting
    // const name = prompt('Please enter your name:');
    // postResults(name, timeResult);
    //remove fields for the cards
    document.getElementById("chooseGameContainer").innerHTML = '';
    // display the results
    document.getElementById('gameResult').innerHTML = `<div>Game took ${timeResult.toFixed(3)} seconds you guessed ${numberOfPairsGuessed} words correctly</div>`;
    // rename the Start game button to Play again and show it
    button.innerHTML = 'Play again';
    button.style.display = 'inline';
}

const getRepliesArray = () => {
    // create an empty array of replies. Length of the array is numberOfOptions (can be changed)
    let array = [];
    // fill the array with empty objects
    for (let i = 0; i < numberOfOptions; i++) {
        array.push(false);
    }
    // randomly choose an index of the array to put the correct answer and add the correct answer to the array
    const indexOfCorrectAnswer = Math.floor(Math.random() * numberOfOptions);
    array[indexOfCorrectAnswer] = wordsArray[randomNumbers[index]]
    // fill the rest of the array with random words from the wordsArray
    for (let i = 0; i < numberOfOptions; i++) {
        if (i !== indexOfCorrectAnswer) {
            //check if the word is already in the array
            do {
                let option = wordsArray[randomNumbers[Math.floor(Math.random() * randomNumbers.length)]]; 
                if (!array.includes(option)) {
                    array[i] = option;
                }
            }
            while (!array[i]); // if the word is already in the array, try again
        }
    }
    return array;
}

const checkAnswer = (e, id) => {
    // check if the clicked word is the correct answer
    if (id === wordsArray[randomNumbers[index]].id){
        // increase the number of pairs guessed
        numberOfPairsGuessed ++;
        // change the color of the clicked word to green
        e.target.style.backgroundColor = 'lightGreen';
        setTimeout(function() {
            //start the next round
            gameRound();
        }, 500); 
    } 
    else { // if the clicked word is not the correct answer
        // change the color of the clicked word to red
        e.target.style.backgroundColor = 'red';
        setTimeout(function() {
            //start the next round
            gameRound();
        }, 500); 
    }
    // increase the index - go to th next Hebrew word
    index ++;
}

function playSound() {
  const audio = document.getElementById('myAudio');
  audio.play();
}

const gameRound = () => {
    if (index === randomNumbers.length -1) {
        finishGame();
    }
    else{
        document.getElementById('oneWordInHeb').innerHTML = `<div class="matchCard" onClick="playSound()">▶️ ${wordsArray[randomNumbers[index]].hebrew}</div>
        <audio id="myAudio"><source src="${wordsArray[randomNumbers[index]].audio_file}" type="audio/mpeg"></audio><br><p>Choose the correct translation of this word: </p>`;
        let array = getRepliesArray();
        let html = ``;
        for (const word of array) {
            html += `<div class="matchCard" onClick=checkAnswer(event,${word.id})>${word.english}</div>`;
        }
        document.getElementById('optionsInEng').innerHTML = html;
    }
}

const startGame = (data) => {  
    document.getElementById('gameResult').innerHTML = '';
    //get the words from the server
    wordsArray = data;
    //get the random numbers to show the Hebrew word
    randomNumbers = getRandomNumbers(0, wordsArray.length-1);
    // run the first round og the game
    gameRound();
}

//onCliclk on the start button
const setupChooseWordGame = () => {
    // hide the start game button
    button.style.display = 'none';
    // reset the variables
    numberOfPairsGuessed = 0;
    index = 0;
    // add fields for cards
    document.getElementById("chooseGameContainer").innerHTML = `<div id="oneWordInHeb"></div><div id="optionsInEng"></div>`
    // get the study set from the URL
    const url = new URL(window.location.href);
    studySet = url.searchParams.get('studySet');
    // get the words from the server
    gettheWords(studySet)
    // // start the timer
    startTime = performance.now();
}
