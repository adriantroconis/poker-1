define(function () {
	function renderErr(text,elAfterSel) {
		if (document.querySelector('.error') == null) {
			var elAfter = document.querySelector(elAfterSel);
			var error = document.createElement('div');
			error.className = 'error';
			error.innerHTML = text;
			elAfter.parentNode.insertBefore(error,elAfter);
		} else {
			document.querySelector('.error').style.display = "block";
			document.querySelector('.error').innerHTML = text;
		}
	}

	return {
		render: renderErr
	}
})