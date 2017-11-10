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
var canvas, ctx;//These are the variables that depend on DOM, so we initialize them after load.
var ball = {
	velocity: {
		x: parseFloat((Math.random()*2 - 1).toFixed(2)), //Why does .toFixed() return a string? WHYYY?
		y: parseFloat((Math.random()*2 - 1).toFixed(2))
	},
	position: {
		x: 600,
		y: 400
	},
	speed: 3,
	radius: 20
};//beautiful
var players = {
	width: 30,
	height: 150,
	speed: 5,
	player1: {
		x: 100 - 30,
		y: 400 - 150/2 //150 height
	},
	player2: {
		x: 1100,
		y: 400 - 150/2
	},
};
function start() {
	canvas = $("pongcanvas");
	ctx = canvas.getContext("2d");

	ctx.fillRect(0, 0, 1200, 800);
	setInterval(update, 20);
}
function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1200, 800);
	ctx.fillStyle = "white";
	//move the ball
	ball.position.x += ball.velocity.x*ball.speed;
	ball.position.y += ball.velocity.y*ball.speed;
	if (ball.position.y + ball.radius >= 800 || ball.position.y - ball.radius <= 0) {
		ball.velocity.y = -ball.velocity.y;
	}// make it bounce
	//move the players
	if (buttons.up) {
		players.player2.y -= players.speed;
	}
	if (buttons.down) {
		players.player2.y += players.speed;
	}
	if (buttons.a) {
		players.player1.y -= players.speed;
	}
	if (buttons.z) {
		players.player1.y += players.speed;
	}
	//Collision Detection!
	if (ball.position.x - ball.radius >= 100 && ball.position.x - ball.radius <= 102 && ball.position.y >= players.player1.y && ball.position.y <= players.player1.y + players.height) {
		ball.velocity.x = -ball.velocity.x;
	}
	if (ball.position.x + ball.radius >= 1098 && ball.position.x + ball.radius <= 1100 && ball.position.y >= players.player2.y && ball.position.y <= players.player2.y + players.height) {
		ball.velocity.x = -ball.velocity.x;
	}
	//Draw everything
	ctx.fillRect(players.player1.x, players.player1.y, players.width, players.height);
	ctx.fillRect(players.player2.x, players.player2.y, players.width, players.height);
	fillCircle(ball.position.x, ball.position.y, ball.radius);
}

window.onload = start;
