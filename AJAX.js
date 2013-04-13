data = "";


function getXmlHttp(){
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function onload() {
	req = getXmlHttp();

	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			data = req.responseText;
		}
	}
	
	req.open("GET", "./log.replay.json", true);
	req.send(null);
}