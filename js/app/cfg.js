define(function(){
	
	var obj = {
		contentSel: ".content",
		canvasIdTable : "table",
		canvasIdObjects : "objects",
		tableBgPath : "img/tableBg.jpg",
		cardBackPath : "img/cardBackBlack.jpg",
		tableCfg : {
			x: 0,
			y: 0,
			radius: 170,
			gradient: {
				"0" : "black",
				"1" : '#4E4D4F'
			}
		},
		cardCfgDefault : {
			radius : 15,
			width: 50,
			height: 80
		},
		playerSpot1 : {
			1 : {
				x: 245,
				y: 210
			},
			2 : {
				x: 305,
				y: 210
			}
		},
		playerSpot2 : {
			1 : {
				x: 245,
				y: 10
			},
			2 : {
				x: 305,
				y: 10
			}
			
		},
		tableSpot: {
			1: {
				x: 150,
				y: 110
			},
			2: {
				x: 210,
				y: 110
			},
			3: {
				x: 270,
				y: 110
			},
			4: {
				x: 330,
				y: 110
			},
			5: {
				x: 390,
				y: 110
			}
		},
		dashboard: {
			userNameId: 'userName',
			moneyId: 'money',
			winsId: 'wins',
			lossId: 'loss',
			refreshId: 'refresh',
			gamesList: 'gamesList',
			create: 'create'
		},
		dashboardContent: '<h1 class="title">Bionic Poker</h1><h3>Welcome back, <span id="userName">user name</span></h3><table class="userInfo"><tr><td>Your money</td><td id="money"></td></tr><tr><td>Current wins count</td><td id="wins"></td></tr><tr><td>Current loss count</td><td id="loss"></td></tr></table><h3>Active games:</h3><a id="refresh">refresh</a><ul id="gamesList"></ul><a id="create">Create game</a>',
		tableContent: '<h1>Texas holdem</h1><div class="canvasWrap"><div class="tableWrap"><canvas id="table" width="600" height="300"></canvas></div><div class="objWrap"><canvas id="objects" width="600" height="300"></canvas></div></div><div class="moneyPanel"><div class="user">Your Money:<span id="userMoney"></span></div><div class="bank">Bank Money:<span id="bankMoney"></span></div></div><div id="console"></div><input type="text" id="sendMessage" placeholder="type to chat">',
		consoleId: 'console',
		userMoneyId: 'userMoney',
		bankMoneyId: 'bankMoney',
		sendChatId: 'sendMessage',
		popUpCheck: '<div class="popUpMsg" id="msgPopUp"><div class="popupBtn big check">Check</div><div class="popupBtn big fold">Fold</div><div class="popupBtn small raise">Raise</div><input type="text" value="5" id="raiseValue"></div>',
		popUpSel: '.popUpOverlay'
	}

	return {
		obj: obj
	}
})