/* pseudo code 
1. System pick a random color by flashing the color and play sound.
2. Add the random color in a list called gamePattern.
3. User click on a color, flash upon clicking and play sound.
4. Add the clicked color into list called userClickedPattern.
5. Compare the userClickedPattern with gamePattern.
6. If color sequence correct then continue, else game over.
*/

var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("button").click(function () {
  // add effect on click
  $(this).addClass("target");
  setTimeout(() => {
    $(this).removeClass("target");
  }, 100);

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  $("#" + userChosenColour).addClass("pressed");
  setInterval(() => {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  // change level title
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(200);
}

function checkAnswer(answer) {
  if (userClickedPattern[answer] === gamePattern[answer]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();

    startOver();
  }
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
}

function gameOver() {
  playSound("Wrong");
  $("#level-title").text("Game Over. Click Any Key To Restart.");
  $("body").addClass("game-over");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

$("body").keydown(nextSequence);
