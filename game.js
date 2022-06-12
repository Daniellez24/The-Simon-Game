var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$(document).keypress(function(){
  if(!gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});


function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4); // random number between 0-3

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
  // console.log(userClickedPattern);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  else{
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
