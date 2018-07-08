var gameHasStarted = false;
var targetWord = "alphabet";
var currentGuess = "";
var badLetters = "";
var maxGuesses = 3;
var hangmanWords = ["nollie", "Kickflip", "heelflip", "ollie", "treflip"];
var wordIndex = 0;


$(document).keyup(function(event) {
    if(!gameHasStarted){
        startGame();
    }
    //console.debug(event.keyCode+"  :  "+event.key);
})

function startGame(){
    //set target word based on index
    targetWord = hangmanWords[wordIndex];
    //increment index
    wordIndex++;
    if(wordIndex >= hangmanWords.length){
        wordIndex = 0;
    }
    badLetters = "";
    currentGuess = "";
    for(var i=0; i < targetWord.length; i++){
        currentGuess += "_";
     }
    $("#currentGuess").text(currentGuess);
    $("#badLetters").text("");
    $("#guessesLeft").text("Guesses left: "+ maxGuesses);
    $("#guessInput").keyup(function(event) {
        if(event.keyCode >= 65 && event.keyCode <= 90){
            processKeyStroke(event.key);
        }
        return false;
    });
    gameHasStarted = true;
}
function processKeyStroke(key){
    //clear out value
    $("#guessInput").val("");
    //have we already used the letter?
    if(currentGuess.toLowerCase().indexOf(key.toLowerCase()) > -1 || badLetters.toLowerCase().indexOf(key.toLowerCase()) > -1){
        return;
    }
    //if not is it a winner?
    if(targetWord.toLowerCase().indexOf(key.toLowerCase()) > -1){
       processGoodLetter(key.toLowerCase())
    }
    //if not a inner what happens?
    else{
        processBadLetter(key.toLowerCase())
    }
}
function processGoodLetter(key){
    for(var i=0; i < targetWord.length; i++){
       var targetChar = targetWord.toLowerCase().charAt(i);
       if(targetChar == key){
            currentGuess = currentGuess.substr(0, i) + targetChar + currentGuess.substr(i + 1);
       } 
    }
    $("#currentGuess").text(currentGuess);
    if(currentGuess == targetWord.toLowerCase()){
        processWinner();
    }
}
function processBadLetter(key){
    badLetters += key;
    $("#badLetters").text(badLetters);
    if(badLetters.length >= maxGuesses){
        processLoser();
    }
    else{
        var guessesLeft = maxGuesses - badLetters.length;
        $("#guessesLeft").text("Guesses left: "+ guessesLeft);
    }
}
function processWinner(){
    alert("winner");
    processEnd();
}
function processLoser(){
    alert("loser");
    processEnd();
}
function processEnd(){
    $("#guessInput").off('keyup');
    gameHasStarted = false;
    startGame();
}
