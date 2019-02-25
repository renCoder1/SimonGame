

alert("Welcome to Simon Game🎮");
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var inputPattern = [];
var gameLevel = 0;
var start = false;

// On keypress start/restart the game
$(document).on("keypress", function() {
  //check if first time
  if (start === false) { //start game
    $("h1").text("Level " + gameLevel); //updtae h1 to game level
    start = true; //so that everytime keypress happens the game doesn't restart, keypress won't work if start is true!
    inputPattern = [];
    NextSequence();
  }
});

$(".btn").on("click", function() {
  //clicks will only work to add input color to array if game is turn on, if start is false, click event wont register!
  if (start == true) {
    inputPattern.push(this.id);
    //console.log(this.id);
    playSound(this.id);
    $("#" + this.id).addClass("pressed"); //class to highlight selected button
    setTimeout(function() {
      $(".btn").removeClass("pressed");
    }, 100); //class is removed after 100millisec
    setTimeout(function() {
      checkAnswer();
    }, 100); //answer is checked after 100millisec so that user has enough time to input sequence!
  }
});

function checkAnswer() {
  if (inputPattern.length === gamePattern.length) {
    for (var i = 0; i < inputPattern.length; i++) {
      //console.log("in checkAnswer");
      if (inputPattern[i] != gamePattern[i]) { //the moment mis-match happens game is restarted and array is not further checked, this is good for efficiency
        restartGame();
        return;
      }
    }
    //if return doesn't happen means everything is good, level increased
    gameLevel += 1;
    //console.log("right");
    inputPattern = []; //so that only new user input for each level exist in the array
    //update gameLevel;
    $("h1").text("Level " + gameLevel);
    NextSequence();
    //FOR LOOP ENDS
  }

}

//restart game
function restartGame() {
  //empty user input & game pattern array
  gamePattern = [];
  inputPattern = [];
  gameLevel = 0;
  start = false;

  playSound("wrong");
  //To flash red screen body on wrong answer to get user's attention!
  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");
}, 150);
  //console.log("wrong");
  $("h1").text("Press A Key to Start");
}

//blink the color add to quiz sequence
function NextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];

  gamePattern.push(chosenColor);
  blinkBtn("#" + chosenColor);
  playSound(chosenColor);
  //console.log(colorToBlink);
}

//blink button function
function blinkBtn(selector) {
  $(selector).fadeOut("slow", function() {
    $(this).fadeIn("slow", function() {});
  });
}

//play respective color sound
function playSound(audioName) {
  var colorToPlay = new Audio("sounds/" + audioName + ".mp3");
  colorToPlay.play();
}
