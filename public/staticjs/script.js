const apiRequest = async (url,options) => {
    try {
        const res = await fetch (url,options);
        const data = await res.json();  
        return data;
    } catch (error) {
        console.log(error);
    }
}

// add the study sets to the dropdown menu
const addStudySets = () => {
    const studySetsInput = document.getElementById('studySets');
    // getting the list of study sets from the API and adding it to the dropdown menu
    apiRequest('http://localhost:3000/card-sets')
    .then((studySets) => {    
        studySets.forEach((set) => {
            html = `<option>${set.set_name}</option>`;
            studySetsInput.innerHTML += html;
        })
    })
    .catch(error => console.log(error))
}

//shows the game choice section when the user chooses the study set
const showGames = () =>{
    document.getElementById('gamesSection').style.display = 'inline';
    
    //sending the study set to the games via the API
    studySet = document.getElementById('studySets').value
    if (studySet != 'choose') {
        //make the game links visible
        document.getElementById('gameLinks').removeAttribute('style');
        // remove the comment 'ple4ase choose a study set'
        document.getElementById('comment').innerHTML = '';
        // set the href of the game links
        document.getElementsByTagName('a')[0].setAttribute('href',`/match-words?studySet=${studySet}`)
        document.getElementsByTagName('a')[1].setAttribute('href',`/choose-word?studySet=${studySet}`)
    }
    else {
        //hide the game links
        document.getElementById('gameLinks').style.display = 'none';
        //show the comment 'please choose a study set'
        document.getElementById('comment').innerHTML += `<p>Please choose a study set</p>`
    }

}




