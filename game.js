function $(element) {
	return document.getElementById(element);
} //Looks a lot like jQuery, but _it's not_
function fillCircle(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fill();
}

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

function start() {
	canvas = $("pongcanvas");
	ctx = canvas.getContext("2d");

	ctx.fillRect(0, 0, 1200, 800);
	setInterval(update, 20);
}
function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1200, 800);
	ball.position.x += ball.velocity.x*ball.speed;
	ball.position.y += ball.velocity.y*ball.speed;
	if (ball.position.y + ball.radius >= 800 || ball.position.y - ball.radius <= 0) {
		ball.velocity.y = -ball.velocity.y;
	}
	ctx.fillStyle = "white";
	fillCircle(ball.position.x, ball.position.y, ball.radius);
}

window.onload = start;
