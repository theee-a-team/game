//==============================================================================================================================
// Event listener that hides overlay when the user clicks 'Start Game'
//==============================================================================================================================

document.getElementById("start").addEventListener("click", function() {document.getElementById("overlaystart").style.display = 'none';});

//==============================================================================================================================
// Variables needed in the game 
//==============================================================================================================================

const qwerty = document.getElementById("qwerty")
const phrase = document.getElementById("phrase")
let missed = 0; // Used to keep track of user's incorrect answers

//==============================================================================================================================
// Array of phrases (phrase that user will guess)
//==============================================================================================================================

const phrases = [
    'CYBERCRIMINAL',
    'FIREWALL',
    'RANSOMWARE',
    'SPEAR PHISHING',
    'STRONG PASSWORDS',
    'CLICKBAIT',
    'BAD LINKS',
    'HACKER',
    'LAST LINE OF DEFENSE',
    'PHISH ALERT BUTTON',
    'RED FLAGS'
]

//==============================================================================================================================
// Function to add phrase to display - uses math to get phrase from array
//
// The random number ensures that every time the page loads, the phrase on screen is random
// The function adds the array items to the page with correct classes
//==============================================================================================================================


function addPhraseToDisplay() {
    phraseLetterArr = [...phrases[Math.floor(Math.random()*phrases.length)]];
    let phraseLetters = '';
    for ( let i = 0; i < phraseLetterArr.length; i++) {
        if (phraseLetterArr[i] === " ") {
    phraseLetters += `<li class="space">${phraseLetterArr[i]}</li>`
    }   else {
        phraseLetters += `<li class="letter">${phraseLetterArr[i]}</li>`
    }}
    return phraseLetters;
} 

// Below statement uses functions to insert list items between <ul> tags

document.querySelector('#phrase').innerHTML = `<ul>${addPhraseToDisplay()}</ul>`;

//==============================================================================================================================
// Event listener to check what buttons users are clicking on the on-screen keyboard and runs the functions to check the user's 
// guess, increment missed score and remove lives/hearts, change the key so it can't be clicked again, check if user has won
//==============================================================================================================================

let clickedButton = ''

const keyboard = document.getElementsByTagName('button'); 
const phraseLetter = document.getElementsByClassName('letter');

for (const key of keyboard) {
    key.addEventListener('click', function onClick() {
        clickedButton = key.textContent;
        checkLetter();
        badGuess();
        key.className = "chosen";
        key.disabled = "true";
        checkWin();
    })};

let answer = null;

// This function matches a clicked letter on the keyboard with a phrase letter and changes the phrase letter's class to make it visible

function checkLetter() {
    answer = null;
    for (let i = 0; i < phraseLetterArr.length; i++)
        if (phraseLetter[i] !== undefined) {
        if (clickedButton === phraseLetter[i].textContent) {
            document.getElementsByClassName('letter')[i].classList.add("show");
            answer = clickedButton
        }}}

// This function checks whether the user inputted a bad guess, counts missed and replaces lives/heart images 

function badGuess() {
    if (answer === null) {
        missed++;
        document.getElementsByClassName('tries')[missed - 1].firstChild.src="images/lostHeart.png"; 
    }
}

//==============================================================================================================================
// Function to check whether the user has completed the phrase and thereby won the game, or missed has reached 5 and loses game.
// After checking score, win or lose overlay is displayed and page elements hidden
//==============================================================================================================================

const overlaywin = document.getElementById('overlaywin');
const overlaylose = document.getElementById('overlaylose');

// This function checks whether the user has completed the page or reached 0 lives
//'qwerty' and 'phrase' elements are hidden so there are no elements lingering on the page when the overlay is displayed
// This is needed because the buttons have hover and active classes and aren't immediately hidden when the overlay displays
// Lastly, on the 'lose' overlay the user is shown the phrase they were supposed to guess

function checkWin () {
    if (missed < 5 && document.getElementsByClassName('show').length === phraseLetter.length) {
        qwerty.style.display= 'none';
        phrase.style.display= 'none';
        overlaywin.style.display= 'flex';
    } else if (missed === 5) {
        qwerty.style.display= 'none';
        phrase.style.display= 'none';
        overlaylose.style.display= 'flex';
        document.getElementById("correctPhrase").textContent=(`The correct answer was: ${phraseLetterArr.join("")}`)
    }
}

//==============================================================================================================================
// Event listener that checks "Reset Game" button, stores whether the user is reloading and hides the start overlay if true
//==============================================================================================================================


// Create array from 2 identical buttons on the win and lose overlays and loop over them with a forEach function
// If user clicks "Reset Game", the browser stores that they've already visited the page and reloads it
Array.from(document.getElementsByClassName("btnreset")).forEach(elem => elem.addEventListener("click", () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload();
}
))

// This checks whether the page has reloaded and hides the start overlay if true, presenting the user with a newly loaded page
window.onload = () => {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        document.getElementById("overlaystart").style.display = 'none';
    }
}
