var canvas = document.getElementById('canvas');
document.getElementById("canvas").width = window.innerWidth;
document.getElementById("canvas").height = window.innerHeight;

var wid = document.getElementById("canvas").width;
var hig = document.getElementById("canvas").height;

var ctx = canvas.getContext('2d');

var up = null;
var down = null;

var ballRad = 20;
var ballY = 300;
var ballX = 300;
var ballDy = 2;
var ballDx = 2;
var levCount = 0;
var tlc = 1;
var sy = 2;
var sx = 2;
var st = 4;
var straw = 4;
var lost = false;
var here = false;

var score = 0;
var paused = false;

var aiin = 0;
var mY = 250;


function cls(){
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,wid,hig);
}

function Ball(x,y,rad,dx,dy){
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.dx = dx;
	this.dy = dy;
	this.exists = true;
	this.sy;
	this.sx;
	this.straw;
	this.st;
	this.draw = function(){
		if(this.exists == true){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2);
			ctx.fillStyle = "#FFFFFF";
			ctx.fill();
			ctx.closePath();
		}
	}
	this.delete = function(){
		// Delete Ball
		this.exists = false;
	}
	this.pointCheck = function(){
		if(this.dy < 0){
			this.sy = -this.dy;
		}else if(this.dy > 0){
			this.sy = this.dy;
		}

		if(this.dx < 0){
			this.sx = -this.dx;
		}else if(ballDx > 0){
			this.sx = this.dx;
		}

		this.straw = this.sx + this.sy;

		this.st = Math.floor(this.straw/2);
	}
	this.update = function(){
		here = false;
		this.x += this.dx;
	    this.y += this.dy;

	    if(this.dy > 3){
	    	this.dy = 3;
	    }
	    if(this.dx > 3){
	    	this.dx = 3;
	    }

	    if(this.x - 30 < 0){
	    	if(this.y > player.y && this.y < player.y + 150){
	    		this.dx = -this.dx
	    		score += this.st;
	    		levCount++;
	    		if(levCount % 3 == 0){
	    			levCount = 0;
	    			this.dy *= 1.5;
	    			this.dy *= 1.5;
	    			tlc *= 1.5;
	    		}
	    		here = true;
	    	}
	    }

	    if(this.x + 45 > wid){
	    	//ballDx = ballDx-(ballDx*2);
	    	//ballDy += 5;
	    	this.dx = -this.dx;
	    }else if(this.x - 2 < 0){
	    	if(this.y > player.y && this.y < player.y + 150 && here == false){
	    		score += this.st;
	    		levCount++;
	    		if(levCount % 3 == 0){
	    			levCount = 0;
	    			this.dy *= 1.5;
	    			this.dy *= 1.5;
	    			tlc *= 1.5;
	    		}else{
	    			this.dx = -this.dx;
	    		}
	    		
	    	}else{
	    		Lose()
	    	}
	    }

	    if(this.y + 20 > hig){
	    	this.dy = -this.dy;
	    }else if(this.y - 20 < 0){
	    	this.dy = -this.dy;
	    }

	}
}

function Player1(){
	
	//
	this.y = 230;
	this.dy = 7*tlc;

	this.draw = function(){
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0,this.y,30,(hig/4));
	}

	this.update = function(){
		/*if(up){
			this.y -= this.dy;
		}else if(down){
			this.y += this.dy;
		}*/
		this.y = mY;
	}

}

function AI(){

	//
	this.y = 300;
	this.dy = 7;

	this.draw = function(){
		ctx.fillStyle = '#00FF00';
		//ctx.fillRect(570,this.y,30,150);
		ctx.fillRect(wid-30,0,30,hig);
	}

	this.update = function(){
		for(var i = 0; i < balls.length; i++){
			this.y = balls[i].y-70;
		}
	}

}

function Win(){
	
	//

}

function Lose(){
	
	//
	if(lost == false){
		lost = true;
		alert("Game Over - Your Score was " + score);
		document.location.reload();
	}
	

}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score: "+score, ((wid/2)-20), 20);
}

function randnegpostwo(negall){
	var negpos = 0;
	var negposmat = Math.random();
	var plusone = 0;
	var plusonemat = Math.random();
	var realfinal = 0;
	var realtwo = 0;
	var realmat = Math.random() * (Math.random()+1);

	if(negposmat > 0.5){
		negpos = true;
	}else if(negposmat < 0.5){
		negpos = false;
	}

	if(plusone > 0.5){
		plusone = true;
	}else if(plusone < 0.5){
		plusone = false;
	}

	if(plusone == true){
		realtwo = realmat+1;
	}else if(plusone == false){
		realtwo = realmat;
	}

	if(negpos == true && negall == true){
		realfinal = -realtwo;
	}else if(negpos == false){
		realfinal = realtwo;
	}

	console.log(realfinal)

	if(realfinal < 1){
		realfinal = randnegpostwo(negall);
	}

	return realfinal;

}


var player = new Player1();
var ai = new AI();
var balls = [];
balls.push(new Ball((wid/2)-30,(hig/2)-30,ballRad,1,2));
setInterval(function(){
	if(paused == false){
		balls.push(new Ball(/*ballX-100*/(wid/2)-30,/*ballY*/(hig/2)-30,ballRad,randnegpostwo(false),randnegpostwo(true)));
	}
},3000);
//var ball = new Ball(ballX,ballY,ballRad,1,1);

function draw(){

	cls();

	//balls[0].pointCheck();
	for(var i = 0; i < balls.length; i++){
		this.y = balls[i].pointCheck();
	}

	player.draw();

	ai.draw();
	//ai.update();

	balls[0].draw();
	for(var i = 0; i < balls.length; i++){
		this.y = balls[i].draw();
	}

	if(!paused){
		player.update();
		//balls[0].update();
		for(var i = 0; i < balls.length; i++){
			this.y = balls[i].update();
		}
	}
	
	drawScore();

	requestAnimationFrame(draw);
}

draw();

document.addEventListener("keydown", keyDownHandle);
document.addEventListener("keyup", keyUpHandle);
document.getElementById("canvas").addEventListener("mousemove", mouseUpdate);

function mouseUpdate(event){
	window.mY = event.clientY;
}

function togglePause(){
	if(!paused){
		paused = true;
	}else if(paused){
		paused = false;
	}
}

function keyDownHandle(e){
	if(e.keyCode == 38){
		window.up = true;
	}else if(e.keyCode == 40){
		window.down = true;
	}else if(e.keyCode == 80 || e.keyCode == 32){
		togglePause();
	}
}

function keyUpHandle(e){
	if(e.keyCode == 38){
		window.up = false;
	}else if(e.keyCode == 40){
		window.down = false;
	}
}
