//(global)
STOP = true;
//(private)
var _url = "./log.replay.json";
var _start_time = 0;

function onload() {
	 STOP = true;
	 initEvents();
	 initCRS();
	 initAjax(_url);
	 
	 waitLoad();
}

function render() {
	 moveScene();
	 var cTime = Date.now();
	 var dTime = cTime - _start_time;
	 moveBodies(dTime/1000);
	 renderer.render(scene, camera);
	 requestAnimationFrame(render);
}

function waitLoad() {
	 console.log(STOP);
	 if(STOP == false)
		{
		 _start_time = Date.now();
		 render();
		}
		else
		{
		 setTimeout(waitLoad, 100);
		}
}