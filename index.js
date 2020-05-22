var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

//keybord press listener one time
$(document).click(function () {
    if (!started) {
  		setTimeout(function(){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        },500);
    }
});


//button clicks listener
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    // console.log(level);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

//game patter engine
function nextSequence() {
    //clearing the cahce user input
    userClickedPattern = [];
    //level increment
    level++;
    $("#level-title").text("Level " + level);

    //random number generator
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);

    //flash effect
    $("." + randomChoosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
}

//sound function
function playSound(name) {
    //playing sound in js
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    //adding a css class and removing after timer
    $("#" + currentColor).addClass("pressed");
    //timer
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//answer checks
function checkAnswer(currentlevel) {

    //comparing the current array indexes
    if (userClickedPattern[currentlevel] == gamePattern[currentlevel]) {
        //comparing the full lenght is matching
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        $("#level-title").text("Game Over! Score:"+level+" Press Any Key to Restart!");
        
        playSound("wrong");

        //changing background red
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },250);
        
        //restarting the game
        setTimeout(function(){
        startOver();
        },500);

    }
}

//reset function
function startOver(){
    level =0;
    gamePattern=[];
    started=0;
    userClickedPattern=[];
}