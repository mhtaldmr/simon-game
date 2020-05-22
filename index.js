var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    console.log(level);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    //clearing the cahce user input
    userClickedPattern = [];
    //level increment
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("." + randomChoosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);

    console.log(gamePattern);

}


function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    //timer
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function checkAnswer(currentlevel) {



    if (userClickedPattern[currentlevel] == gamePattern[currentlevel]) {
        if (userClickedPattern.length == gamePattern.length) {

            setTimeout(function () {
                nextSequence();

            }, 1000);
        }

    } else {
        $("#level-title").text("Game Over! Score:"+level+" Press Any Key to Restart!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },250);
        startOver();
    }
}

function startOver(){
    level =0;
    gamePattern=[];
    started=0;
    userClickedPattern=[];
}