
var camera, renderer, scene;

var deltaMove = 0.03;
var deltaAngle = 0.003;

var nextPermit;

var bodies = [];

function onload3() {
	 initEvents();
	 initCRS();
	 initAjax(url);
	 /*
  return 0;
  var g = new THREE.CubeGeometry(100,70,1);
  //var m = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
	var texture = THREE.ImageUtils.loadTexture('pic2.jpg');
	var m = new THREE.MeshBasicMaterial({map: texture})
  table = new THREE.Mesh( g, m );
  
  scene.add(table);*/
  /*
  //var geometry = new THREE.CubeGeometry(1,1,1);
  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vector3( -10, 10, 0 ) );
  geometry.vertices.push( new THREE.Vector3( -10, -10, 0 ) ); 
  geometry.vertices.push( new THREE.Vector3( 10, -10, 0 ) ); 
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geometry.computeBoundingSphere();
  var texture = THREE.ImageUtils.loadTexture('pic.jpg');
  //var material = new THREE.MeshBasicMaterial({map: texture})
  var material = new THREE.MeshBasicMaterial( { color: 0x20ff50 } );
  cube = new THREE.Mesh( geometry, material );

  cube.position.x = 3;
  
  table.add( cube );
*/
  time = Date.now();
  render();
}


function moveScene() {
	 bodies[0].rotation.z -= dX * deltaAngle;
	 bodies[0].rotation.x -= dY * deltaAngle;
	 camera.position.z 	  -= dZ * deltaMove;
	 dX = 0; dY = 0; dZ = 0;
}

function moveBodies(time) {
	 while(nextPermit[0] < time && STOP == false)
		{
		 doPermit();
		 if(AjaxIsEnd())
			 STOP = true;
		 else
			 nextPermit = AjaxGetNext();
		}
}

function doPermit() {
	 var perm = nextPermit[1];
	 for(var i = 0; i < perm.length; ++i)
		{
		 var elem = perm[i];
		 if(elem.name)
			{
			 if(elem.name == "Box")
				addBox(elem);
			}
			else
			{
			 var body = bodies[elem.id];
			 if(elem.x)
				body.position.x = elem.x;
			 if(elem.y)
				body.position.y = elem.y;
			 if(elem.z)
				body.position.z = elem.z;
			 if(elem.yaw)
				body.rotation.z = elem.yaw; // ТАК
			 if(elem.pitch)
				body.rotation.y = elem.pitch;
			 if(elem.roll)
				body.rotation.x = elem.roll;
			}
			//else if(elem.name == "")
		}
}

function addBox(elem) {
	 var geometry = new THREE.CubeGeometry(elem.xSize, elem.ySize, elem.zSize);
	 var material = new THREE.MeshBasicMaterial( genColor() );
	 body = new THREE.Mesh( geometry, material );
	 body.position.x = elem.x;
	 body.position.y = elem.y;
	 body.position.z = elem.z;
	 bodies[elem.id] = body;
	 bodies[elem.parent].add(body);
}

function initCRS() {
	 var _parent = document.getElementById('scene');
	 
	 camera = new THREE.PerspectiveCamera(75, _parent.clientWidth/_parent.clientHeight, 0.1, 1000);

	 renderer = new THREE.WebGLRenderer();
	 renderer.setSize( _parent.clientWidth, _parent.clientHeight );
	 _parent.appendChild( renderer.domElement );
  
	 scene = new THREE.Scene();
	 
	 camera.position.z = 444;
	 var geometry = new THREE.CubeGeometry(0, 0, 0);
	 var material = new THREE.MeshBasicMaterial( { color: 0x20ff50 } );
	 bodies[0] = new THREE.Mesh( geometry, material );
	 bodies[0].rotation.x = -1;
	 bodies[0].rotation.z = -7;
	 //bodies[0].rotation.y = 3.14/2;
	 scene.add(bodies[0]);
	 nextPermit = [-1, []];
}

var EEE = 0;
var colors = [0x20ff50, 0xff2050, 0x2050ff, 0xe2e3e4];

function genColor() {
	return {color: colors[EEE++]};
}