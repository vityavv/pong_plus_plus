function $(element) {
	return document.getElementById(element);
} //Looks a lot like jQuery, but _it's not_

function start() {
	$("jstest").innerHTML = "Your mom is testing the javascript";
	alert("hi");
}


window.onload = start;
