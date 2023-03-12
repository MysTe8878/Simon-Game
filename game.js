
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var lvl = 0;
// Functions

// generate random number function
function randomNumber() {
  var ranNum = Math.floor(Math.random() * 4);
    return ranNum;
}

// flash and play sound of the clicked button
function clickButtonAnimate(buttonName) {
    $("#" + buttonName).addClass("pressed");
    setTimeout(function(){
      $("#" + buttonName).removeClass("pressed");
    }, 50);
    var audio = new Audio("sounds/" + buttonName + ".mp3");
    audio.play();
}

function wrongPattern() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

function nextSequence(gameLevel) {
  chosenNumber = randomNumber();
  gamePattern.push(buttonColors[chosenNumber]);
  clickButtonAnimate(gamePattern[gameLevel]);
}


function checkAnswer(gameLevel){
  nextLevel = false;
  console.log(userClickedPattern);
  console.log(gamePattern);
  for(var i=0; i < userClickedPattern.length; i++) {
    console.log(i)
    if (userClickedPattern[i] == gamePattern[i]) {
      if(gamePattern.length == userClickedPattern.length) {
        nextLevel = true;
      }
    }
    else {
      wrongPattern();
      console.log("wrong")
      started = false;
      nextLevel = false;
      gamePattern = [];
      userClickedPattern = [];
      lvl = 0;
      $("#level-title").text("GameOver! Press Any Key to Start Again.");
    }
  }
  if (nextLevel) {
    lvl++;
    $("#level-title").text("Level: " + lvl);
    setTimeout(function(){
      nextSequence(lvl);}, 1000);
    nextLevel = false;
    userClickedPattern = [];
  }
}


$(".btn").click(function(){
var buttonClicked = $(this).attr("id");
clickButtonAnimate(buttonClicked);
userClickedPattern.push(buttonClicked);
checkAnswer(lvl);
});


started = false;
$(document).keypress(function(){
  if (!started) {
    nextSequence(lvl);
    started = true;
    $("#level-title").text("Level: " + lvl);
  }

})

$(document).on("tap",function() {
  if (!started) {
    nextSequence(lvl);
    started = true;
    $("#level-title").text("Level: " + lvl);
  }
})
