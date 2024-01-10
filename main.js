// Code added by anthony
const startGame = () => {
    let main_div = document.getElementById('main');
    let game_div = document.getElementById('game');
    game_div.style.display = 'block';
    main_div.style.display = 'none';
}



window.addEventListener('load', init);
//Globals

//Available levels
const levels = {
    easy : 8,
    medium: 6,
    hard: 3,
}

// To Select levels
let levelSelect = document.getElementById('levelSelect');
levelSelect.addEventListener('change', () => {
    selectedLevelFunction();
});

const selectedLevelFunction = () => {
    let selectedLevel = levelSelect.value;
    let x;

    // Check the selected level and set it
    switch(selectedLevel){
        case 'medium':
            currentLevel = levels.medium, x = levels.medium;
            break;
        case 'hard':
            currentLevel = levels.hard, x = levels.hard;
            break;
        default:
            currentLevel = levels.easy, x = levels.easy;
            break;
    }
    return x;
}

//To change level
let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

/*  To Start Counting
    Start Count Variable to determine whether user is typing
    Runs only once 
 */
var startCount = false;

//Dom Elements 
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');


const words = [
    '<html>',
    '</html>',
    '<head>',
    '</head>',
    '<title>',
    '</title>',
    '<body>',
    '</body>',
    '<main>',
    '</main>',
    '<header>',
    '</header>',
    '<footer>',
    '</footer>',
    '<aside>',
    '</aside>',
    '<section>',
    '</section>',
    '<div>',
    '</div>',
    '<h1>',
    '</h1>',
    '<h2>',
    '</h2>',
    '<h1>',
    '</h1>',
    '<h3>',
    '</h3>',
    '<h4>',
    '</h4>',
    '<h5>',
    '</h5>',
    '<h6>',
    '</h6>',
    '<span>',
    '</span>',
    '<img src="">',
    '<video>',
    '</video>',
    '<p>',
    '</p>',
    '<br>',
    '<hr>',
    '<ul>',
    '</ul>',
    '<a href="">',
    '<i>',
    '</i>',
    '<em>',
    '</em>',
    '<strong>',
    '</strong>',
    'hypertext',
    'markup',
    'language',
    'domain',
    'hosting',
    'ssl certificate',
    'propagation',
    'charset',
    'keywords',
    'search engine'
]


function init(){
    //Show number of seconds in UI
    seconds.innerText = `currentLevel`;

    //Load word from array
    showWord(words);
    
    //Start matching on word input 
    wordInput.addEventListener('input', startMatch);

    //Call countdown every second 
    setInterval(countdown, 1000);

    //Check game status 
    setInterval(checkStatus, 50);
}

function startMatch(){

    // Start Counting when user begins to type
    startCount = true;

    if(matchWords()){
        isPlaying = true;
        time = currentLevel+1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    //if score is -1, display 0
    if(score === -1){
        scoreDisplay.innerText = 0;
    }
    else{
       scoreDisplay.innerText = score;  
    }
    
}


//Match current word to wordinput 
function matchWords(){
    if(wordInput.value === currentWord.innerText){
        message.innerText = 'Correct!';
        return true;
    }
    else{
        message.innerText = '';
        return false;
    }
}


//Pick & show random word 
function showWord(words){
    //Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    //Output random word 
    currentWord.innerText = words[randIndex];

}


//Countdown timer
function countdown(){

    if(startCount == true){

    //Make sure time is not run out
    if(time > 0){
        //Decrement
        time--;
    }
    else if(time === 0){
        //Game is over
        isPlaying = false;
    }
    //Show time
    timeDisplay.innerText = time;
    }

}

//Check game status 
function checkStatus(){
    if(!isPlaying && time === 0  ){
        message.innerText = 'Game Over!';
        score = -1;
    }
}