function $(element) {
	return document.getElementById(element);
} //Looks a lot like jQuery, but _it's not_

var canvas, ctx;//These are the variables that depend on DOM, so we initialize them after load.

function start() {
	canvas = $("pongcanvas");
	ctx = canvas.getContext("2d");

	ctx.fillRect(0, 0, 1000, 500);
}


window.onload = start;
