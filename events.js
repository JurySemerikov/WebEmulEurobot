//(global)
var dX, dY, dZ;
//(local)
var preX, preY;
// var deltaMove = 0.03;
// var deltaAngle = 0.003;


function initEvents() {
	 dX = 0; dY = 0; dZ = 0;
	 window.onmousedown = mouseDown;
	 window.onmouseup = mouseUp;
	 window.onmousewheel = mouseWheel;
}

function mouseDown(e) {
	 window.onmousemove = mouseMove;
	 preX = e.clientX;
	 preY = e.clientY;
}

function mouseUp() {
	 window.onmousemove = null;
}

function mouseWheel(e) {
	 dZ += e.wheelDeltaY;
	 // camera.position.z -= e.wheelDeltaY * deltaMove;
}

function mouseMove(e) {
	 var ddX = preX - e.clientX;
	 var ddY = preY - e.clientY;
	 
	 preX -= ddX;
	 preY -= ddY;
	 
	 
	 dX += ddX;
	 dY += ddY;
	 // table.rotation.x -= dY * deltaAngle;
	 // table.rotation.y -= dX * deltaAngle;
}