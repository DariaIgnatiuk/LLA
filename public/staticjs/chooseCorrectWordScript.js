//global variables for the choosing game
let button = document.getElementById('startGameButton');
let index = 0;
let randomNumbers = [];
const numberOfOptions = 3;
let numberOfPairsGuessed = 0;


const apiRequest = async (url,options) => {
    try {
        const res = await fetch (url,options);
        const data = await res.json();  
        return data;
    } catch (error) {
        console.log(error);
    }
}

const finishGame = () => {
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    const timeResult = elapsedTime / 1000;
    // display the results
    document.getElementById('gameResult').innerHTML = `Game took ${timeResult.toFixed(3)} seconds you guessed ${numberOfPairsGuessed} words correctly`;
    // rename the Start game button to Play again and show it
    document.getElementById('oneWordInHeb').innerHTML = '';
    document.getElementById('optionsInEng').innerHTML = '';
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
    if (id === wordsArray[randomNumbers[index]].id){
        numberOfPairsGuessed ++;
        // document.getElementById('gameResult').innerHTML = 'correct!';
        e.target.style.backgroundColor = 'lightGreen';
        setTimeout(function() {
            e.target.style.backgroundColor = 'white';
            gameRound();
        }, 1000); 
    } 
    else {
        // document.getElementById('gameResult').innerHTML = 'wrong!';
        e.target.style.backgroundColor = 'red';
        setTimeout(function() {
            e.target.style.backgroundColor = 'white';
            gameRound();
        }, 1000); 
    }
    index ++;

}

function playSound() {
    console.log('hello');
    
//   const audio = wordsArray[randomNumbers[index]].audio;
  const audio = document.getElementById('myAudio');
  audio.play();
}

const gameRound = () => {
    document.getElementById('gameResult').innerHTML = '';
    if (index === randomNumbers.length -1) {
        finishGame();
    }
    else{
        console.log(wordsArray[randomNumbers[index]].audio_file);
        
        document.getElementById('oneWordInHeb').innerHTML = `<div class="matchCard" onClick="playSound()">${wordsArray[randomNumbers[index]].hebrew}</div>
        <audio id="myAudio"><source src="${wordsArray[randomNumbers[index]].audio_file}" type="audio/mpeg"></audio>`;
        // document.getElementById('oneWordInHeb').innerHTML = `<div class="matchCard" onClick="playSound()">${wordsArray[randomNumbers[index]].hebrew}</div>`;
        let array = getRepliesArray();
        let html = ``;
        for (const word of array) {
            html += `<div class="matchCard" onClick=checkAnswer(event,${word.id})>${word.english}</div>`;
        }
        document.getElementById('optionsInEng').innerHTML = html;
    }
}


const startGame = (data) => {
    //hide the previous game score
    document.getElementById('gameResult').innerHTML = '';
    //get the words from the server
    wordsArray = data;
    //get the random numbers to show the Hebrew word
    randomNumbers = getRandomNumbers(0, wordsArray.length-1);
    // run the first round og the game
    gameRound();
}



const gettheWords = async (studySet) => {
    await apiRequest(`http://localhost:3000/card-sets/${studySet}/words`)
    .then(data => {
        startGame(data);
    })
    .catch(error => console.log(error))
}

//onCliclk on the start button
const setupChooseWordGame = () => {
    // hide the results of the previous game
    document.getElementById('gameResult').innerHTML = '';
    // hide the start game button
    button.style.display = 'none';
    // reset the variables
    numberOfPairsGuessed = 0;
    index = 0;
    // get the study set from the URL
    const url = new URL(window.location.href);
    studySet = url.searchParams.get('studySet');
    // get the words from the server
    gettheWords(studySet)
    // // start the timer
    startTime = performance.now();
}

//get an array of random numbers
function getRandomNumbers(start, end) {
    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;   
  }
