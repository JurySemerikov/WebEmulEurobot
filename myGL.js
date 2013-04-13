var camera, renderer, scene;
var table;
var eve;
var preX, preY;
var deltaMove = 0.03;
var deltaAngle = 0.003;

function onload2() {
  initEvents();
  initCRS();

  
  var g = new THREE.CubeGeometry(100,70,1);
  //var m = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
	var texture = THREE.ImageUtils.loadTexture('pic2.jpg');
	var m = new THREE.MeshBasicMaterial({map: texture})
  table = new THREE.Mesh( g, m );
  
  scene.add(table);
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
  camera.position.z = 120;
  render();
}

function render() {
  redraw();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function redraw() {
  //table.position.y -= 0.01;
  /*cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  
  cube.position.x += 0.02;*/
  //camera.translateZ(0.01);
}

function initEvents() {
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
	 camera.position.z -= e.wheelDeltaY * deltaMove;
}

function mouseMove(e) {
	 eve = event;
	 var dX = preX - e.clientX;
	 var dY = preY - e.clientY;
	 
	 preX -= dX;
	 preY -= dY;
	 
	 table.rotation.x -= dY * deltaAngle;
	 table.rotation.y -= dX * deltaAngle;
}

function initCRS() {
	 var _parent = document.getElementById('scene');
	 
	 camera = new THREE.PerspectiveCamera(75, _parent.clientWidth/_parent.clientHeight, 0.1, 1000);

	 renderer = new THREE.WebGLRenderer();
	 renderer.setSize( _parent.clientWidth, _parent.clientHeight );
	 _parent.appendChild( renderer.domElement );
  
	 scene = new THREE.Scene();
}