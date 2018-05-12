var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var b = document.getElementById("b");
var score = document.getElementById("score");
var width_max = document.body.clientWidth;
var height_max = document.body.clientHeight;
var radius_ball = 50;
var pHeight = 140;
var pWidth = 30;
var deltaX = 5;
var deltaY = 5;
var up = false;
var down = false;
var points = 0;

p1.style.top = p1.style.left = p2.style.top = p2.style.right = '0px';
b.style.top = '200px';
b.style.left = '400px';

function posTop(el) {
	return parseFloat(el.style.top.slice(0,-2));
}

function posLeft(el) {
	return parseFloat(el.style.left.slice(0,-2));
}

function changePos() {
	var currentY = posTop(b) + deltaY;
	var currentX = posLeft(b) + deltaX;
	b.style.top = currentY + 'px';
	b.style.left = currentX + 'px';
	score.innerHTML = 'Score: ' + points;
	
	if(currentY + radius_ball > posTop(p1) && currentY < posTop(p1) + pHeight) {
			if(currentX < pWidth){
				deltaX = -deltaX;
				points++;
			}
	} 

	if(currentY + radius_ball > posTop(p2) && currentY < posTop(p2) + pHeight) {
			if(currentX > width_max - radius_ball - pWidth){
				deltaX = -deltaX;
				points++;
			}
	} 

	if(currentX < 0 || currentX > width_max - radius_ball) {
		alert("Game Over. Score: " +points);
		window.alert = null;
		document.location.reload();		
	}

	if(currentY < 0 || currentY > height_max - radius_ball){
		deltaY = -deltaY;
	}

	if(up && posTop(p1) > 0 ){
		p1.style.top = (posTop(p1) - 5) + 'px';
		p2.style.top = (posTop(p2) - 5) + 'px';
	}
	else if(down && posTop(p1) < height_max - pHeight){
		p1.style.top = (posTop(p1) + 5) + 'px';
		p2.style.top = (posTop(p2) + 5) + 'px';
	}
}

function keyUp(el){
	if(el.keyCode == 40) {
		down = false;
	}
	if(el.keyCode == 38) {
		up = false;
	}
}

function keyDown(el){
	if(el.keyCode == 40) {
		down = true;
	}
	if(el.keyCode == 38) {
		up = true;
	}

}

setInterval(changePos,10);

document.addEventListener("keyup",keyUp);
document.addEventListener("keydown",keyDown);