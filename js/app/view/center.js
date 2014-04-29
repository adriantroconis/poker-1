define(function(){

	function centerBlock(id,dimensions) {
		var el = document.getElementById(id);
		var windowHeight = window.innerHeight;
		var windowWidth = window.innerWidth;
		var width = dimensions.width;
		var height = dimensions.height;
		el.style.top = (windowHeight - height)/2 + 'px';
		el.style.left = (windowWidth - width)/2 + 'px';
	}
	function popUpCheckCenter(id,dimensions) {
		var el = document.getElementById(id);
		var windowHeight = window.innerHeight;
		var windowWidth = window.innerWidth;
		var width = dimensions.width;
		var height = dimensions.height;
		el.style.top = (windowHeight - height)/2 + 150 + 'px';
		el.style.left = (windowWidth - width)/2 + 'px';
	}

	return {
		center: centerBlock,
		pucenter: popUpCheckCenter
	}
})