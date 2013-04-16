ReplayWindow = {
DELTA_MOVE:	0.03,	DELTA_ANGLE:0.003,
camera:		null,	renderer:	null,	scene:	null,
bodies:		[],		permit:		null,	isEnd:	false,
FPS:		null,	FPSCounter:	0,		FPSTime:0,
startTime:	0,
dX:			0,		dY:			0,		dZ:		0,
preX:		0,		preY:		0,

start:		function() {
	 if(ReplayLoader.isReady())// ждем пока загрузится реплей
		{
		 if(ReplayLoader.hasNext())// проверим, что пришедший реплей не пуст
			{
			 ReplayWindow.permit = ReplayLoader.getNext();
			 ReplayWindow.render();
			}
		}
	 else
		setTimeout(ReplayWindow.start, 100);
},

render:		function() {
	 var currentTime = Date.now();
	 if(ReplayWindow.startTime == 0)
		ReplayWindow.startTime = currentTime;
	 var time = currentTime - ReplayWindow.startTime;
	 
	 ReplayWindow.doMove();
	 if(ReplayWindow.isEnd == false)
		ReplayWindow.doPermit(time);
		
	 ReplayWindow.renderer.render(ReplayWindow.scene, ReplayWindow.camera);
	 requestAnimationFrame(ReplayWindow.render);

},
doMove:		function() {
	 ReplayWindow.bodies[0].rotation.z	-= ReplayWindow.dX * ReplayWindow.DELTA_ANGLE;
	 ReplayWindow.bodies[0].rotation.x	-= ReplayWindow.dY * ReplayWindow.DELTA_ANGLE;
	 ReplayWindow.camera.position.z 	-= ReplayWindow.dZ * ReplayWindow.DELTA_MOVE;
	 ReplayWindow.dX = 0;
	 ReplayWindow.dY = 0;
	 ReplayWindow.dZ = 0;
},
doPermit:	function(time) {
	 while(ReplayWindow.permit[0] <= time)
		{
		 ReplayWindow.permit[1].forEach(ReplayWindow.process);
		 if(ReplayLoader.hasNext())
			ReplayWindow.permit = ReplayLoader.getNext();
		 else
			{
			 ReplayWindow.isEnd = true;
			 break;
			}
		}
},
process:	function(elem) {
	 var body;
	 switch(elem.name)
		{
		 case undefined:
			 body = ReplayWindow.bodies[elem.id];	break;
		 case "Box":
			 body = ReplayWindow.addBox(elem);		break;
		 case "Cylinder":
			 body = ReplayWindow.addCylinder(elem);		break;
		 default:
			 body = ReplayWindow.addBody(elem);
		}

	 if(elem.x)
		 body.position.x = elem.x;
	 if(elem.y)
		 body.position.y = elem.y;
	 if(elem.z)
		 body.position.z = elem.z;

	 if(elem.yaw)
		 body.rotation.z = elem.yaw;
	 if(elem.pitch)
		 body.rotation.y = elem.pitch;
	 if(elem.roll)
		 body.rotation.x = elem.roll;
},
addBox:		function(elem) {
	 var geometry = new THREE.CubeGeometry(elem.xSize, elem.ySize, elem.zSize);
	 var material = new THREE.MeshBasicMaterial( {color: elem.color} );
	 var body = new THREE.Mesh( geometry, material );
	 ReplayWindow.bodies[elem.id] = body;
	 ReplayWindow.bodies[elem.parent].add(body);
	 return body;
},
addCylinder:function(elem) {
	 var geometry = new THREE.CylinderGeometry(elem.rTop, elem.rBottom, elem.height);
	 var material = new THREE.MeshBasicMaterial( {color: elem.color} );
	 var body = new THREE.Mesh( geometry, material );
	 ReplayWindow.bodies[elem.id] = body;
	 ReplayWindow.bodies[elem.parent].add(body);
	 return body;
},
addBody:	function(elem) {
	 console.log('Unknown body: ' + elem.name);
	 var body = new THREE.Object3D();
	 ReplayWindow.bodies[elem.id] = body;
	 ReplayWindow.bodies[elem.parent].add(body);
	 return body;
},

addScene:	function(div) {	 
	 var camera = new THREE.PerspectiveCamera(75, div.clientWidth/div.clientHeight, 0.1, 1000);

	 var renderer = new THREE.WebGLRenderer();
	 renderer.setSize( div.clientWidth, div.clientHeight );
	 div.appendChild( renderer.domElement );
  
	 var scene = new THREE.Scene();
	 
	 camera.position.z = 150;
	 
	 var rootBody = new THREE.Object3D();
	 
	 
	 ReplayWindow.bodies[0] = rootBody;
	 rootBody.rotation.x = -1;
	 rootBody.rotation.z = -7;
	 scene.add(rootBody);
	 
	 ReplayWindow.camera = camera;
	 ReplayWindow.renderer = renderer;
	 ReplayWindow.scene = scene;
},

addFPS:		function(div) {
	 var span = document.createElement('span');
	 span.style.position = 'absolute';
	 span.style.top = '0px';
	 span.style.right = '0px';
	 span.style.color = 'green';
	 span.innerText = '0';
	 div.appendChild(span);
	 ReplayWindow.FPS = span;
},
removeFPS:	function() {
	 ReplayWindow.FPS.parentNode.removeChild(ReplayWindow.FPS);
	 ReplayWindow.FPS = null;
},

addEvents:	function(div) {
	 div.onmousedown = ReplayWindow.mouseDown;
	 div.onmousewheel = ReplayWindow.mouseWheel;
},
mouseDown:	function(e) {
	 ReplayWindow.dX = 0;
	 ReplayWindow.dY = 0;
	 ReplayWindow.preX = e.clientX;
	 ReplayWindow.preY = e.clientY;
	 window.onmouseup = ReplayWindow.mouseUp;
	 window.onmousemove = ReplayWindow.mouseMove;
},
mouseWheel:	function(e) {
	 //TODO + firefox
},
mouseUp:	function(e) {
	 window.onmouseup = null;
	 window.onmousemove = null;
},
mouseMove:	function(e) {
	 var ddX = ReplayWindow.preX - e.clientX;
	 var ddY = ReplayWindow.preY - e.clientY;
	 
	 ReplayWindow.preX -= ddX;
	 ReplayWindow.preY -= ddY;
	 
	 ReplayWindow.dX += ddX;
	 ReplayWindow.dY += ddY;
}
};