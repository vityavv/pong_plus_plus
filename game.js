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
	down: false
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
});
var canvas, ctx;//These are the variables that depend on DOM, so we initialize them after load.
var ball = {
	velocity: {
		x: parseFloat((Math.random()*3 - 1.5).toFixed(2)), //Why does .toFixed() return a string? WHYYY?
		y: parseFloat((Math.random()*3 - 1.5).toFixed(2))
	},
	position: {
		x: 600,
		y: 400
	},
	speed: 5,
	radius: 15
};//beautiful
var player1 = {
	width: 10,
	height: 100,
	x: 50 - 10,
	y: 350
};
var player2 = {
	width: 10,
	height: 100,
	x: 1150,
	y: 350
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
	ball.position.x += ball.velocity.x*ball.speed;
	ball.position.y += ball.velocity.y*ball.speed;
	if (ball.position.y + ball.radius >= 800 || ball.position.y - ball.radius <= 0) {
		ball.velocity.y = -ball.velocity.y;
	}
	fillCircle(ball.position.x, ball.position.y, ball.radius);
	if (buttons.up) {
		player1.y -= 1;
	}
	if (buttons.down) {
		player1.y += 1;
	}
	ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
	ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

window.onload = start;
