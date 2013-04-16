ReplayLoader = {
dt:		0,
size:	0,
pos:	0,
data:	[],
ready:	false,

load:	function(url, replay) {
	 var req = ReplayLoader.getXmlHttp();
	 req.onreadystatechange = ReplayLoader.stateChange;
	 req.open("POST", url, true);
	 req.send("replay=" + replay);
},

isReady:	function() {
	 return ReplayLoader.ready;
},

getNext:	function() {
	 return [ReplayLoader.getTime(ReplayLoader.pos-1), ReplayLoader.data[ReplayLoader.pos++] ];
},
hasNext:	function() {
	 return ReplayLoader.pos < ReplayLoader.size;
},
getTime:	function(n) {
	 return Math.round( n*ReplayLoader.dt*1000 );
},

stateChange: function(e) {
	 if(e.target.readyState == 4 && e.target.status == 200)
		{
		 ReplayLoader.data = JSON.parse(e.target.responseText);
		 ReplayLoader.dt = ReplayLoader.data[ReplayLoader.pos++];
		 ReplayLoader.size = ReplayLoader.data.length;
		 ReplayLoader.ready = true;
		}
},
getXmlHttp:	function() {
	 var xmlhttp;
	 try{
		 xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e)
		{
		 try{
			 xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
			 xmlhttp = false;
			}
		}
	 if (!xmlhttp && typeof XMLHttpRequest!='undefined')
		 xmlhttp = new XMLHttpRequest();
	 return xmlhttp;
}
};