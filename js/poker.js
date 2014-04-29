define(function (require) {
	var cfg = require('app/cfg'),
		render = require('view/render'),
		io = require('socketio'),
		flop = require('service/triggerFlop'),
		center = require('view/center'),
		login = require('service/login'),
		error = require('view/error'),
		output = require('view/console'),
        global = require('app/global'),
		combinations = require('service/getcombinations');

	center.center('loginPopup',{
		width: 300,
		height: 220
	});

	var config = cfg.obj;
	   socket = io.connect('http://localhost:8080/');

	//listen for submit

    var flopCount = 0;

	var controls = {
		login: 'login',
		signup: 'signup'
	}
	login.listen();

	socket.on('loginSuccess', function(user) {
    	render.clear(config);
    	render.dashboard(config);
    	render.updateDashboard(user,config);
        socket.emit('refreshRoomsSend');
    });
    socket.on('loginFailPass', function(){
    	error.render('Invalid pass','.controls');
    });
    socket.on('loginFailUser', function(){
    	error.render('Invalid username','.controls');
    });
    socket.on('userExists',function(){
    	error.render('User exists','.controls');
    });
    socket.on('signUpSuccess',function(user){
    	render.clear(config);
    	render.dashboard(config);
    	render.updateDashboard(user,config);
        socket.emit('refreshRoomsSend');
    });

    socket.on('gameCreated',function(){
    	render.clear(config);
    	render.table(config);
    	render.updateTable(config);
    	output.message('Server','Game is created. Now wait for the opponent',config);
    });
    socket.on('gameJoined',function(){
    	render.clear(config);
    	render.table(config);
    	render.updateTable(config);
    	output.message('Server','Joined to the game. Wait for the next hand...',config);
    	socket.emit('canStartGame', global.obj.userData.name);
    });
    socket.on('startGame', function(username){
        flop.giveCardsPlayer1(config);
        flop.giveCardsPlayer2(config);
        output.message('Server','The game is started',config);
        render.listenPopup(config);
        if (username == global.obj.userData.name) {
            render.popUp(config);
            center.pucenter('msgPopUp',{
                width: 200,
                height: 140
            });
        }
    });
    socket.on('updatechat', function (username, data) {
        output.message(username,data,config);
    });
    socket.on('refreshRoomsRecieve', function (rooms) {
        gamesList.innerHTML = '';
        for (var prop in rooms) {
            gamesList.innerHTML += '<li><a href="#" data-room="'+rooms[prop]+'">' + rooms[prop] + '</a></li>';
        }
    });
    socket.on('checkResponse', function (username){
        if (username !== global.obj.userData.name) {
            render.popUp(config);
            document.getElementById('msgPopUp').setAttribute('data-last','true');
            center.pucenter('msgPopUp',{
                width: 200,
                height: 140
            });
        } else {
            render.removePu(config);
        }
    });
    socket.on('flop', function (username,card1,card2,card3) {
        ++flopCount;
        if (flopCount == 1) {
            flop.triggerTableFlop1(config,card1,card2,card3);
        }
        if (flopCount == 2) {
            flop.triggerTableFlop2(config,card2);
        }
        if (flopCount == 3) {
            flop.triggerTableFlop3(config,card1);
        }
        if (flopCount == 4) {
            var value = combinations.get();
            global.obj.finalValue = value.result;
            console.log(value);
            socket.emit('finalValue', value, global.obj.userData.name);
        }
        if (username !== global.obj.userData.name && flopCount < 4) {
            render.popUp(config);
            center.pucenter('msgPopUp',{
                width: 200,
                height: 140
            });
        }
    });
    socket.on('lastCheckResponse', function (username) {
        if (username == global.obj.userData.name) {
            render.removePu(config);
        } 
    });
    socket.on('foldResponse', function (bank,username) {
        if (username !== global.obj.userData.name) {
            render.removePu(config);
            output.message('Server','You won',config);
            global.obj.userData.money += bank;
            global.obj.bankMoney = 0;
            render.updateUserMoney(config);
            render.updateBankMoney(config);
        } else {
            render.removePu(config);
            global.obj.userData.money -= bank;
            global.obj.bankMoney = 0;
            render.updateUserMoney(config);
            render.updateBankMoney(config);
            output.message('Server','You loose',config);
        }
    });
    socket.on('bidResponse', function (username,bidValue) {
        if (username == global.obj.userData.name) {
            render.removePu(config);
        } else {
            global.obj.bankMoney += parseInt(bidValue);
            render.updateBankMoney(config);
        };
    });
    socket.on('raiseResponse', function (value,username) {
        if (username !== global.obj.userData.name) {
            render.removePu(config);
            render.popUp(config,value);
            center.pucenter('msgPopUp',{
                width: 200,
                height: 140
            });
            global.obj.bankMoney += value;
            render.updateBankMoney(config);
        } else {
            render.removePu(config);
        }
    });
    socket.on('finalResponse', function (value,user){
        if (user !== global.obj.userData.name && value > global.obj.finalValue) {
            socket.emit('loose',user,global.obj.bankMoney);
            output.message('Server','You loose',config);
        }
        if (user !== global.obj.userData.name && value < global.obj.finalValue) {
            socket.emit('win',user,global.obj.bankMoney);
            output.message('Server','You won!',config);
        }
    })

    // combinations.get();
})