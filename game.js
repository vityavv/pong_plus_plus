var ev = {//environment-variables
	ball: {
		speed: 3,
		radius: 20
	},
	players: {
		width: 30,
		height: 150,
		speed: 5,
		offset: 100
	}
}
var settings_icon = new Image(256, 256);
settings_icon.src = "settings_icon.png";
function $(element) {
	return document.getElementById(element);
} //Looks a lot like jQuery, but _it's not_. Loads an element for you
function fillCircle(x, y, r) {// Makes code prettier by doing circle in one line.
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fill();
}
var buttons = {//buffer to check if it is down
	up: false,
	down: false,
	a: false,
	z: false
}
window.addEventListener("keydown", function(e){
	switch (e.keyCode) {
		case 38:
			buttons.up = true;
			break;
		case 40:
			buttons.down = true;
			break;
	}
	switch (e.keyCode) {
		case 90:
			buttons.z = true;
			break;
		case 65:
			buttons.a = true;
			break;
	}
});
window.addEventListener("keyup", function(e){
	switch (e.keyCode) {
		case 38:
			buttons.up = false;
			break;
		case 40:
			buttons.down = false;
			break;
	}
	switch (e.keyCode) {
		case 90:
			buttons.z = false;
			break;
		case 65:
			buttons.a = false;
			break;
	}
});
var canvas, ctx, customization;//These are the variables that depend on DOM, so we initialize them after load.
function Ball() {
	this.velocity = {
		x: parseFloat((Math.random()*2 - 1).toFixed(2)), //Why does .toFixed() return a string? WHYYY?
	};
	if (this.velocity.x > 0) {
		this.velocity.y = 1 - this.velocity.x;
		this.velocity.x++;
		this.velocity.y++;
	} else {
		this.velocity.y = -1 - this.velocity.x;
		this.velocity.x--;
		this.velocity.y--;
	}
	this.position = {
		x: canvas.width/2,
		y: canvas.height/2
	};
	this.speed = ev.ball.speed;
	this.radius = ev.ball.radius;
}
var ballbounced = false;//ENSURES IT BOUNCES
var ball;
function Player(playernum) {
	if (playernum == 1) {
		this.x = ev.players.offset - ev.players.width;
	} else if (playernum == 2) {
		this.x = canvas.width - ev.players.offset;
	}
	this.y = canvas.height/2 - ev.players.height/2;
	this.score = 0;
}
var interval;
var ranges = {};//These depend on DOM again
function changeBallSpeed() {
	ev.ball.speed = parseInt(ranges.ballspeed.value);
	var positiontemp = Object.assign({}, ball.position);
	ball = new Ball();
	ball.position = Object.assign({}, positiontemp);
}
function changeBallSize() {
	ev.ball.radius = parseInt(ranges.ballsize.value);
	var positiontemp = Object.assign({}, ball.position);
	ball = new Ball();
	ball.position = Object.assign({}, positiontemp);
}
function changePlayerWidth() {
	ev.players.width = parseInt(ranges.playerwidth.value);
	var player1y = player1.y;
	var player2y = player2.y;
	player1 = new Player(1);
	player2 = new Player(2);
	player1.y = player1y;
	player2.y = player2y;
}
function changePlayerHeight() {
	ev.players.height = parseInt(ranges.playerheight.value);
}
function start() {
	canvas = $("pongcanvas");
	ctx = canvas.getContext("2d");
	customization = $("customization");

	ranges.ballspeed = $("ballspeed");
	ranges.ballspeed.addEventListener("change", changeBallSpeed);
	ranges.ballsize = $("ballsize");
	ranges.ballsize.addEventListener("change", changeBallSize);
	ranges.playerwidth = $("playerwidth");
	ranges.playerwidth.addEventListener("change", changePlayerWidth);
	ranges.playerheight = $("playerheight");
	ranges.playerwidth.addEventListener("change", changePlayerHeight);
	ranges.playerspeed = $("playerspeed");
	ranges.playeroffset = $("playeroffset");
	ranges.canvasheight = $("canvasheight");
	ranges.canvaswidth = $("canvaswidth");

	ball = new Ball();
	player1 = new Player(1);
	player2 = new Player(2);
	ctx.textBaseline = "top";
	ctx.font = "100px ArcadeClassic";

	canvas.addEventListener("mouseup", function(e){
		var x = e.x - canvas.offsetLeft;
		var y = e.y - canvas.offsetTop;
		if (x >= canvas.width - 50 && x <= canvas.width && y >= 0 && y <= 50) {
			if (customization.style.display == "none" || customization.style.display == "") {
				customization.style.display = "block";
				clearInterval(interval);
			} else {
				customization.style.display = "none";
				interval = setInterval(update, 20);
			}
		}
	});
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	interval = setInterval(update, 20);
}
function update() {
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.lineWidth = 10;
	ctx.setLineDash([canvas.height/9, canvas.height/9]);
	ctx.beginPath()
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2, canvas.height);
	ctx.stroke();
	ctx.setLineDash([]);
	ctx.lineWidth = 1;
	//loss detection
	if (ball.position.x - ball.radius >= canvas.width) {
		ball = new Ball();
		player1.score++;
	}
	if (ball.position.x + ball.radius <= 0) {
		ball = new Ball();
		player2.score++;
	}
	//Collision Detection!
	var ballcolideswithplayer1 = ball.position.x - ball.radius >= ev.players.offset-2 && ball.position.x - ball.radius <= ev.players.offset+2 && ball.position.y >= player1.y && ball.position.y <= player1.y + ev.players.height;
	var ballcolideswithplayer2 = ball.position.x + ball.radius >= canvas.width - ev.players.offset-2 && ball.position.x + ball.radius <= canvas.width - ev.players.offset+2 && ball.position.y >= player2.y && ball.position.y <= player2.y + ev.players.height;
	if (ballcolideswithplayer1 && !ballbounced) {
		ball.velocity.x = -ball.velocity.x;
		ballbounced = true;
	} else if (ballcolideswithplayer2 && !ballbounced) {
		ball.velocity.x = -ball.velocity.x;
		ballbounced = true;
	}
	if (!(ballcolideswithplayer1 || ballcolideswithplayer2)) {
		ballbounced = false;
	}
	//move the ball
	ball.position.x += ball.velocity.x*ball.speed;
	ball.position.y += ball.velocity.y*ball.speed;
	if (ball.position.y + ball.radius >= canvas.height || ball.position.y - ball.radius <= 0) {
		ball.velocity.y = -ball.velocity.y;
	}// make it bounce
	//move the players
	if (buttons.up && player2.y > 0) {
		player2.y -= ev.players.speed;
	}
	if (buttons.down && player2.y + ev.players.height < canvas.height) {
		player2.y += ev.players.speed;
	}
	if (buttons.a && player1.y > 0) {
		player1.y -= ev.players.speed;
	}
	if (buttons.z && player1.y + ev.players.height < canvas.height) {
		player1.y += ev.players.speed;
	}
	//Draw everything
	ctx.fillRect(player1.x, player1.y, ev.players.width, ev.players.height);
	ctx.fillRect(player2.x, player2.y, ev.players.width, ev.players.height);
	fillCircle(ball.position.x, ball.position.y, ball.radius);
	ctx.textAlign = "right";
	ctx.fillText(player1.score, canvas.width/2-20, 10);
	ctx.textAlign = "left";
	ctx.fillText(player2.score, canvas.width/2+20, 10);
	ctx.drawImage(settings_icon, canvas.width-50, 0, 50, 50);
}

window.onload = start;
