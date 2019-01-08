var dogSizeWidth=50;
var dogSizeHeight=50;
var canvasWidth=600;
var canvasHeight=600;

var lawnMowerWidth=60;
var lawnMowerHeight=60;

var dp = {x:canvasWidth/2-dogSizeWidth/2,y:canvasHeight/2 - dogSizeHeight/2};
var lp= [{x:50,y:50},{x:500,y:50},{x:50,y:500},{x:500,y:500}];

var scoreShow=document.querySelector("#score");


var canvas = document.getElementById("myCanvas");
canvas.style.background="green";

function clearCanvas() {
	canvas.fillStyle="green";
	canvas.fillRect(0,0,canvasWidth,canvasHeight);
	// body...
};
/*
var dog = canvas.getContext("2d");
dog.fillStyle = "brown";
dog.fillRect(dp.x, dp.y,dogSizeWidth,dogSizeHeight);

var lawnMower1 = canvas.getContext("2d");
lawnMower1.fillStyle = "black";
lawnMower1.fillRect(lp1.x,lp1.y,lawnMowerWidth,lawnMowerHeight);

var lawnMower2 = canvas.getContext("2d");
lawnMower2.fillStyle = "black";
lawnMower2.fillRect(lp2.x,lp2.y,lawnMowerWidth,lawnMowerHeight);

var lawnMower3 = canvas.getContext("2d");
lawnMower3.fillStyle = "black";
lawnMower3.fillRect(lp3.x,lp3.y,lawnMowerWidth,lawnMowerHeight);


var lawnMower4 = canvas.getContext("2d");
lawnMower4.fillStyle = "black";
lawnMower4.fillRect(lp4.x,lp4.y,lawnMowerWidth,lawnMowerHeight);
*/






function drawDog() {
	var dog = canvas.getContext("2d")
	dog.fillStyle="brown";
	dog.fillRect(dp.x,dp.y,dogSizeWidth,dogSizeHeight);
	// body...
}
drawDog();

var dx=10;
var dy=0;

function moveDog() {
	dp={x:dp.x+dx,y:dp.y+dy}


	// body...
};

function clearDog() {
	var dog = canvas.getContext("2d")
	dog.fillStyle="green";
	dog.fillRect(dp.x,dp.y,dogSizeWidth,dogSizeHeight);

	// body...
};
var t0=performance.now();
function main() {
	if (gameOver()) {
		return;
	}
		
	setTimeout(function() {
  		clearDog();
  		moveDog();
  		drawDog();
  		main();
  		var t1=performance.now();
  		var score=Math.round((t1-t0)/100);
		scoreShow.innerHTML=score;
		}, 100)
}

var dl= [{x:20,y:20},{x:-20,y:-20},{x:-20,y:20},{x:20,y:20}];

function drawLawnmower(position) {
	var lawnMower = canvas.getContext("2d")
	lawnMower.fillStyle="black";
	lawnMower.fillRect(position.x,position.y,lawnMowerWidth,lawnMowerHeight);
	// body...
}
lp.forEach(drawLawnmower);

function moveLawnmower() {
	// position={x:position.x+dx,y:position.y+dy};
	for (var i = 0; i < lp.length; i++) {
	// lp[i]={x:lp[i].x+dx,y:lp[i].y+dy};
	lp[i]={x:lp[i].x+dl[i].x,y:lp[i].y+dl[i].y};
	}// body...
};


function clearLawnmower(argument) {
	var lawnMower= canvas.getContext("2d")
	lawnMower.fillStyle="green";
	lawnMower.fillRect(argument.x,argument.y,lawnMowerWidth,lawnMowerHeight);
	// body...
};

function mainLawnmover() {
	if (gameOver()) {
		return;
	}
	setTimeout(function() {
  		lp.forEach(clearLawnmower);
  		// lp.forEach(moveLawnmower);
  		moveLawnmower();
  		lp.forEach(drawLawnmower);
  		mainLawnmover();
  		reflect();
		}, 100)
}

var right=document.querySelector("#right");
var left=document.querySelector("#left");
var up=document.querySelector("#up");
var down=document.querySelector("#down");
right.addEventListener("mousedown",function(){
	dx=10;
	dy=0;
});
left.addEventListener("mousedown",function(){
	dx=-10;
		dy=0;
});
up.addEventListener("mousedown",function(){
	dx=0;
		dy=-10;
});

down.addEventListener("mousedown",function(){
	dx=0;
		dy=10;
});






function changeDirectionButton(argument) {
	var	keyPressed=argument.keyCode;
	var leftKey=37;
	var rigtKey=39;
	var upKey=38;
	var downKey=40;

	if (keyPressed===leftKey) {
		dx=-10;
		dy=0;
	}
	if (keyPressed===rigtKey) {
		dx=10;
		dy=0;
	}
	if (keyPressed===upKey) {
		dx=0;
		dy=-10;
	}
	if (keyPressed===downKey) {
		dx=0;
		dy=10;
	}
}
function changeDirection(argument) {
	var	keyPressed=argument.keyCode;
	var leftKey=37;
	var rigtKey=39;
	var upKey=38;
	var downKey=40;

	if (keyPressed===leftKey) {
		dx=-10;
		dy=0;
	}
	if (keyPressed===rigtKey) {
		dx=10;
		dy=0;
	}
	if (keyPressed===upKey) {
		dx=0;
		dy=-10;
	}
	if (keyPressed===downKey) {
		dx=0;
		dy=10;
	}
}
main();
mainLawnmover();
document.addEventListener("keydown",changeDirection);


function gameOver() {
	for (var i = 0; i < lp.length; i++) {
		if(lp[i].x+60>=dp.x&&lp[i].x-60<=dp.x&&lp[i].y+60>=dp.y&&lp[i].y-60<=dp.y)
				return true;
	}
		// if(lp[0].x+50>=dp.x&&lp[0].x-50<=dp.x&&lp[0].y+50>=dp.y&&lp[0].y-50<=dp.y)
		// 		console.log(lp[0],dp);
	var hitLeftWall=dp.x<0
	var hitRightWall=dp.x>canvasWidth-dogSizeWidth;
	var hitTopWall=dp.y<0
	var hitBottomWall=dp.y>canvasHeight-dogSizeHeight;
	return hitBottomWall||hitTopWall||hitRightWall||hitLeftWall;
 };

function reflect() {
	
for (var i = 0; i < lp.length; i++) {
	if(lp[i].x<0)
		dl[i].x=20;
	if(lp[i].x>canvasWidth-lawnMowerWidth)
		dl[i].x=-20;
	if (lp[i].y<0)
		dl[i].y=20;
	if (lp[i].y>canvasHeight-lawnMowerWidth)
		dl[i].y=-20;
	}
}














