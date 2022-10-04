var gamePattern = [];
var userClickedPattern=[];
var buttonColours =['red','blue','green','yellow'];
var level = 0;

//check first keypress from user for start the game
$(document).on("keypress",function(){   
    if (level === 0){      
        $("h1").text("Level 0");
        nextSequence();
    }
});

//User clicks
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var won = checkAnswer();
    if (won == true && gamePattern.length === userClickedPattern.length){
        userClickedPattern=[]
        setTimeout(nextSequence,1000);
        
    }
    else if (won ==false){
        $("h1").text("Game Over! Press Any Key To Restart.");
        //play sound of Game Over
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        //add game-over class to styles, just for 200ms
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startover();
    };
})

//Function for playing soung
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};

//Function for adding next color of the sequence.
function nextSequence(){
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+ (level));
};

//Function for animating the style when button is pressed
function animatePress(currentColour){
    $("#"+currentColour).toggleClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).toggleClass("pressed");
    },100); 
};

//Function for comparing user vs game list.
function checkAnswer(){
    for (var i= 0; i< userClickedPattern.length;i++){
            if (gamePattern[i] != userClickedPattern[i]){
                 return false;
            };
    };
    return true; 
};

//Function startover
function startover(){
    gamePattern = [];
    userClickedPattern=[];
    level = 0;
}




