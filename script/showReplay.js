function showReplay(div, url, startTime) {
	 ReplayLoader.load(url);
	 if(startTime)
		ReplayLoader.setStartTime(startTime);
	 
	 ReplayWindow.addScene(div);
	 ReplayWindow.addFPS(div);
	 ReplayWindow.addEvents(div);
	 
	 ReplayWindow.start();
}