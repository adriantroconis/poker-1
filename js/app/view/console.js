define(function(){

	function postMessage (user,message,configObj) {
		var consoleEl = document.getElementById(configObj.consoleId);
		var consoleCurr = consoleEl.innerHTML;
		var result = consoleCurr + '<div><span>'+user+'</span>'+message+'</div>';
		consoleEl.innerHTML = result;
		consoleEl.scrollTop = consoleEl.scrollHeight;
	};

	return {
		message : postMessage
	}

});