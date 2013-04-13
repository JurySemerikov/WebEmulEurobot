//(public)
var dt = 0;
//(private)
var _ajax_pos = 0, _ajax_size = 0;
var _ajax_data = null;

function initAjax(url) {
	 var req = _ajax_getXmlHttp();
	 req.onreadystatechange = _ajax_stateChange;
	 req.open("GET", url, true);
	 req.send(null);
}

//(public)
AjaxIsEnd = function() {
	return _ajax_pos >= _ajax_size;
}
//(public)
AjaxGetNext = function() {
	 return [(_ajax_pos-1)*dt, _ajax_data[_ajax_pos++] ];
}

//(private)
function _ajax_stateChange(e) {
	if(e.target.readyState == 4 && e.target.status == 200)
		{
		 _ajax_data = JSON.parse(e.target.responseText);
		 dt = _ajax_data[_ajax_pos++];
		 _ajax_size = _ajax_data.length;
		 STOP = false;
		}
}

//(private)
function _ajax_getXmlHttp(){
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