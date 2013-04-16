function showReplay(div, url, replay) {
	 ReplayLoader.load(url, replay);
	 ReplayWindow.addScene(div);
	 //ReplayWindow.addFPS(div);
	 ReplayWindow.addEvents(div);
	 ReplayWindow.start();
}
/*
function render() {
	 moveScene();
	 var cTime = Date.now();
	 var dTime = cTime - _start_time;
	 moveBodies(dTime/1000);
	 renderer.render(scene, camera);
	 requestAnimationFrame(render);
}

function waitLoad() {
	 if(ReplayLoader.isReady())
		{
		 _start_time = Date.now();
		 render();
		}
		else
		{
		 setTimeout(waitLoad, 100);
		}
}*/