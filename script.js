var canvas;
var canvascontext;
var ballx = 60;
var bally = 60;
var balldirx = 10;
var balldiry = 5;
var paddlewidth = 10;
var paddleheight = 100;
var paddle1y = 250;
var paddle2y = 250;
var pscore = 0;
var aiscore = 0;
var winscore = 3;
var won = false;
function AI(){
    if(bally - 30 > paddle2y + paddleheight / 2){
        paddle2y += 6;
        if( paddle2y > canvas.height - paddleheight / 2)
            paddle2y = canvas.height - paddleheight / 2;
    }
    else if(bally + 30 < paddle2y + paddleheight / 2){
        paddle2y -= 6;
        if( paddle2y < -paddleheight / 2)
            paddle2y = -paddleheight / 2;
    }
}

function mouse(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mousex = evt.clientX - rect.left - root.scrollLeft;
    var mousey = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mousex,
        y:mousey
    };
}
window.onload = function(){
    console.log("Harshil Tagadiya");
    canvas = document.getElementById('gamecanvas');
    canvascontext=canvas.getContext('2d');
    var fps = 30;
    setInterval(function(){
        move();
        draw();
    },1000/fps);

    canvas.addEventListener('mousedown',function(evt){
        if(won == true){
                pscore = 0;
                aiscore = 0;
                won = false;
        }
    });
    canvas.addEventListener('mousemove',function(evt){
        var mousepos = mouse(evt);
        paddle1y = mousepos.y - paddleheight / 2;
    });

}

function reset(){
    if(pscore >= winscore || aiscore >= winscore){
        won = true;
    }
    balldirx = -balldirx;
    ballx = canvas.width / 2;
    bally = canvas.height / 2;
}

function move(){
    if(won == true){
        return;
    }   
    AI();

    ballx += balldirx;
    bally += balldiry;
    if(ballx > canvas.width){
        if(bally > paddle2y && bally < paddle2y + paddleheight){
            balldirx = -balldirx;
            var angle = (bally - paddle2y - paddleheight / 2);
            balldiry = angle * 0.27;
            if(balldiry < 2 && balldiry >= 0)
                balldiry = 2;
            else if(balldiry > -2 && balldiry < 0)
                balldiry = -2;
        }
        else{
            pscore++;
            reset();}
    }
    if(ballx < 0){
        if(bally > paddle1y && bally < paddle1y + paddleheight){
            balldirx = -balldirx;
            var angle = (bally - paddle1y - paddleheight / 2);
            balldiry = angle * 0.27;
            if(balldiry < 2 && balldiry >= 0)
                balldiry = 2;
            else if(balldiry > -2 && balldiry < 0)
                balldiry = -2;
        }
        else{
            aiscore++;
            reset();
        }
    }
    if(bally > canvas.height){
        balldiry = -balldiry;
    }
    if(bally < 0){
        balldiry = -balldiry;
    }
}


function draw(){
    console.log(balldiry);
    //draw main canvas
    drawrect(0,0,canvas.width,canvas.height,'black');   

    if(won == true){
        canvascontext.fillStyle = 'white';
        canvascontext.font ="20px arial";
        if(pscore >= winscore){
            canvascontext.fillText("You Won!",350,200);
        }
        else if(aiscore >= winscore){
            canvascontext.fillText("Computer Won!",330,200);
        }
        canvascontext.fillText("Click to Continue",320,400);
        return;
    }
    for(var i = 0 ; i < canvas.height ; i += 41){
        drawrect(canvas.width / 2 - 1,i,2,20,'white');
    }
    drawcirc(ballx,bally,10,'red');
    drawrect(0,paddle1y,paddlewidth,paddleheight,'white');
    drawrect(canvas.width - paddlewidth,paddle2y,paddlewidth,paddleheight,'white');

    canvascontext.font ="15px arial"; 

    canvascontext.fillText("Player's Score",65,75);
    canvascontext.fillText(pscore,100,100);
    canvascontext.fillText("Computer's Score",canvas.width - 155,75)
    canvascontext.fillText(aiscore,canvas.width - 100,100);
    }
function drawcirc(x,y,r,color){
    canvascontext.fillStyle = color;
    canvascontext.beginPath();
    canvascontext.arc(x,y,r,0,Math.PI * 2,true);
    canvascontext.fill();
}
function drawrect(x,y,width,height,color){
    canvascontext.fillStyle = color;
    canvascontext.fillRect(x,y,width,height);   
}