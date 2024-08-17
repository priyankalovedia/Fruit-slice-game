let playing=false;
let score;
let step;
let action;
let trialLeft;
let fruits=["apple","banana","berry","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"]; 
$(()=>
{
    //click on start/reset button
    $("#startreset").click(()=>{
        // if we are playing
        if(playing){
            //reload page
            location.reload();
            playing=false;
        }
        else{
            // if we are not playing
            // hide the game over box
            $("#gameover").hide();
            // change the text to reset
            $("#startreset").html("Reset Game");
            playing=true;
            // score initialize to 0
            score=0;
            $("#scorevalue").html(score);
            // show the time or life left
            $("#trialLeft").show();
            // setting initial trial value
            trialLeft=3;
            //adding trial hearts
            addHearts();
            // start sending fruits
            startAction();
        }
    });
    function addHearts()
    {
        // clear hearts
        $("#trialLeft").empty();
        // fill with hearts
        for(let i=0;i<trialLeft;i++)
        {
            $("#trialLeft").append('<img src="img/heart.png" class="heart">')
        }
    }
    // start sending fruits
function startAction()
{
    // generate fruits
    $("#fruit").show();
    // generate random fruits 
    chooseFruit();
    // random position
    $("#fruit").css({"left":Math.round(650 * Math.random()),"top":50});
    // generate steps
    step=1 + Math.round( 5 + Math.random());
    // maove fruits down every millisecond
    action=setInterval(()=>{
        $("#fruit").css("top",$("#fruit").position().top + step);
        // fruits is too slow
        if($("#fruit").position().top > $("#fruitContainer").height())
        {
            // to check life left
            if(trialLeft > 1){
                $("#fruit").show();
                chooseFruit();
                $("#fruit").css({"left":Math.round(650 * Math.random()),"top":50});
                step=1 + Math.round( 5 + Math.random());
                // reduce the life
                trialLeft--;
                // populate hearts
                addHearts();
            }
            else{
                playing=false;
                // we are not playing
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html("<p>Game Over !</p><p>Your Score is " + score + "</p>")
                // hide the life or trial left
                $("#trialLeft").hide();
                stopAction(); 
            }
            
        }
    },10)
}
// generate random fruit
function chooseFruit(){
    let rand=fruits[Math.round(7*Math.random())];
    // console.log(rand);
    $("#fruit").attr('src','img/' + rand + '.png');   
}
function stopAction(){
    clearInterval(action);
    // hide the fruits
    $("#fruit").hide();
}
// slice the fruits
$("#fruit").mouseover(()=>{
    // increase the score by one
    score++;
    // update score value
    $("#scorevalue").html(score);
    // play the sound
    $("#sliceSound")[0].play();
    // stop fruit
    clearInterval(action);
    //hide fruit
    $("#fruit").hide("explode",200);
    // send new fruit
    setTimeout(startAction,400);
})
})
