define(function (require) {

	var io = require('socketio');
	var error = require('view/error');

	var controls = {
		loginId: 'login',
		signupId: 'signup'
	}
	var fields = {
		userId: 'user',
		passId: 'pass'
	}

	var socket = io.connect('http://localhost:8080/');

	function listen() {
		var login = document.getElementById(controls.loginId),
			signup = document.getElementById(controls.signupId),
			user = document.getElementById(fields.userId),
			pass = document.getElementById(fields.passId);
		login.addEventListener('click', function() {
			//verify
			if (pass.value.length > 0 &&  user.value.length > 0) {
				if (document.querySelector('.error') !== null) {
					document.querySelector('.error').style.display = "none";
				}
				socket.emit('loginTry',user.value,pass.value);
			} else {
				error.render('All fields are required','.controls');
			}
		},false);

		signup.addEventListener('click', function() {
			if (pass.value.length > 0 &&  user.value.length > 0) {
				if (document.querySelector('.error') !== null) {
					document.querySelector('.error').style.display = "none";
				}
				socket.emit('signupTry',user.value,pass.value);
			} else {
				error.render('All fields are required','.controls');
			}
		},false);
	}

	return {
		listen: listen
	}
})