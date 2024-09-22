const apiRequest = async (url,options) => {
    try {
        const res = await fetch (url,options);
        const data = await res.json();  
        return data;
    } catch (error) {
        console.log(error);
    }
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

const gettheWords = async (studySet) => {
    await apiRequest(`http://localhost:3000/cardsets/${studySet}/words`)
    .then(data => {
        startGame(data);
    })
    .catch(error => console.log(error))
}