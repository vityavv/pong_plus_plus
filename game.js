function $(element) {
	return document.getElementById(element);
} //Looks a lot like jQuery, but _it's not_

var canvas, ctx;//These are the variables that depend on DOM, so we initialize them after load.
var ball = {
	velocity = {
		x = Math.random().toFixed(2),
		y = 1 - x
	},
	position = {
		x = 600,
		y = 400
	}
};//beautiful

function start() {
	canvas = $("pongcanvas");
	ctx = canvas.getContext("2d");

	ctx.fillRect(0, 0, 1200, 800);
}
function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1200, 800);
	ctx.fillStyle = "white";
}

window.onload = start;
