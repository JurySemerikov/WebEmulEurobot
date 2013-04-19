ReplayLoader = {
dt:		0,	size:	0,	pos:	0,
data:	[],	types: ["Body", "Ball", "Box", "Cylinder"],
order:	["x", "y", "z", "Z", "Y", "X", "parent", "color"],
typesOrder: [[], ["radius"], ["xSize", "ySize", "zSize", "texture"], ["rTop", "rBottom", "height"]],
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
	 var pos = ReplayLoader.pos++;
	 var time = Math.round( (pos-1)*ReplayLoader.dt*1000 );

	 var array = ReplayLoader.data[pos].map(ReplayLoader.convert);
	 
	 return [time, array];
},
convert:	function(str) {
	 var array = str.split(",");
	 var type = array.shift();
	 var object = {};
	 
	 if(type > 0)
		{
		 object.id = type;
		 ReplayLoader.readEdit(object, array);
		}
		else
		{
		 object.id = array.shift();
		 ReplayLoader.readEdit(object, array);
		 ReplayLoader.readCreate(object, array, -type);
		}
	 return object;
},
readEdit:	function(object, array) {
	 var order = ReplayLoader.order;
	 for(var i in order)
		{
		 var elem = array.shift();
		 if(elem && elem != "")
			object[order[i]] = elem;
		}
},
readCreate:	function(object, array, type) {
	 var order = ReplayLoader.typesOrder[type];
	 object.name = ReplayLoader.types[type];
	 for(var i in order)
		{
		 var elem = array.shift();
		 if(elem && elem != "")
			object[order[i]] = elem;
		}
},
hasNext:	function() {
	 return ReplayLoader.pos < ReplayLoader.size;
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