define(['model/table','app/global','view/error'], function(Table,global,error){

	function table (configObj) {
		var section = document.createElement('section');
		section.setAttribute('class','content poker');
		section.innerHTML=configObj.tableContent;
		document.body.appendChild(section);
		var canvas = document.getElementById(configObj.canvasId);
		var PokerTable = new Table(configObj);
	}

	function updateUserMoney(configObj) {
		var userMoney = document.getElementById(configObj.userMoneyId);
		userMoney.innerHTML = global.obj.userData.money;
	}
	function updateBankMoney(configObj) {
		var bankMoney = document.getElementById(configObj.bankMoneyId);
		bankMoney.innerHTML = global.obj.bankMoney;
	}

	function updateTable(configObj) {
		updateUserMoney(configObj);
		var sendchat = document.getElementById(configObj.sendChatId);

		sendchat.addEventListener('keypress', function(e) {
            if (e.which == '13') {
                socket.emit('sendchat', sendchat.value);
                sendchat.value = '';
            }
        });
	}

	function clear(configObj) {
		var section = document.querySelector(configObj.contentSel);
		section.parentNode.removeChild(section);
	}

	function removePopUp(configObj) {
		var popup = document.querySelector(configObj.popUpSel);
		if (popup !== null) popup.parentNode.removeChild(popup);
	}

	function dashboard(configObj) {
		var section = document.createElement('section');
		section.setAttribute('class','content dashboard');
		section.innerHTML=configObj.dashboardContent;
		document.body.appendChild(section);
	}

	function updateDashboard(user,configObj) {
		var name = document.getElementById(configObj.dashboard.userNameId),
			money = document.getElementById(configObj.dashboard.moneyId),
			wins = document.getElementById(configObj.dashboard.winsId),
			loss = document.getElementById(configObj.dashboard.lossId),
			create = document.getElementById(configObj.dashboard.create),
			refresh = document.getElementById(configObj.dashboard.refreshId),
			gamesList = document.getElementById(configObj.dashboard.gamesList),
			userData = global.obj.userData;

		name.innerHTML = user.user;
		money.innerHTML = user.money;
		wins.innerHTML = user.wins;
		loss.innerHTML = user.loss;

		userData.name = user.user;
		userData.money = user.money;

		refresh.addEventListener('click', function() {
			socket.emit('refreshRoomsSend');
		},false);

		gamesList.addEventListener('click', function (e) {
			if (e.target.nodeName == 'A') {
				socket.emit('switchRoom', e.target.getAttribute('data-room'), global.obj.userData.name);
			}
		})

		create.addEventListener('click', function() {
			socket.emit('adduser',user.user);
		},false);
	}

	function popUp(configObj,bidValue) {
		var overlay = document.createElement('div');
		var popUp = configObj.popUpCheck;
		overlay.setAttribute('class','popUpOverlay');
		overlay.innerHTML = popUp;
		document.body.appendChild(overlay);

		if (bidValue !== undefined) {
			document.querySelector('.check').className = 'popupBtn big bid';
			document.querySelector('.bid').innerHTML = 'Bid($'+bidValue+')';
			document.querySelector('.bid').setAttribute('data-bid',bidValue);
		}		
	}

	function listenPopup(configObj) {
		document.body.addEventListener('click',function (e) {
			if (e.target.className.indexOf('check') !== -1){
				if (document.getElementById('msgPopUp').getAttribute('data-last') == "true") {
					socket.emit('last',global.obj.userData.name);
				} else {
					socket.emit('checkTry',global.obj.userData.name);
				}
			};
			if (e.target.className.indexOf('bid') !== -1) {
				var bidValue = parseInt(document.querySelector('.bid').getAttribute('data-bid'));
				if (global.obj.userData.money > bidValue) {
					if (document.getElementById('msgPopUp').getAttribute('data-last') == "true") {
						socket.emit('last',global.obj.userData.name);
					} else {
						global.obj.bankMoney += bidValue;
						global.obj.userData.money -= bidValue;
						updateUserMoney(configObj);
						updateBankMoney(configObj);
						socket.emit('bidTry',bidValue,global.obj.userData.name);
					}
				} else {
					error.render('not enough money','.bid');
				}
			};
			if (e.target.className.indexOf('fold') !== -1) {
				socket.emit('foldTry',global.obj.bankMoney,global.obj.userData.name);
			}
			if (e.target.className.indexOf('raise') !== -1) {
				var raiseVal = parseInt(document.getElementById('raiseValue').value);
				if (global.obj.userData.money > raiseVal) {
					global.obj.bankMoney += raiseVal;
					global.obj.userData.money -= raiseVal;
					updateUserMoney(configObj);
					updateBankMoney(configObj);
					socket.emit('raiseTry',raiseVal,global.obj.userData.name);
				} else {
					error.render('not enough money','.check');
				}	
			}
		});
	}

	return {
		table: table,
		dashboard: dashboard,
		clear: clear,
		updateDashboard: updateDashboard,
		updateTable: updateTable,
		popUp: popUp,
		removePu: removePopUp,
		updateUserMoney: updateUserMoney,
		updateBankMoney: updateBankMoney,
		listenPopup: listenPopup
	}
})