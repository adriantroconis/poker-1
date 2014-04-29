var io = require('socket.io').listen(8080);

var usernames = {};
var rooms = {};

var md5 = require('MD5');

var databaseUrl = "localhost/poker";
var collections = ["users"];
var db = require("mongojs").connect(databaseUrl, collections);

db.users.ensureIndex({user: 1}, {unique: true});

var defaultUser = {
	money: 1000,
	wins: 0,
	loss: 0
};
	var suits = {
		1: 'spades',
		2: 'hearts',
		3: 'clubs',
		4: 'diamonds'
	};
	var values = {
		11: 'J',
		12: 'Q',
		13: 'K',
		14: 'A'
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getRandomCard() {
		var suit = suits[getRandomInt(1,4)];
		var value = getRandomInt(2,14);
		if (value > 10) {
			value = values[value];
		}
		return {
			suit: suit,
			value: value
		}
	}

io.sockets.on('connection', function (socket) {
	socket.on('loginTry', function(login,pass) {
		db.users.find({user: login}, function(err, usersList) {
			if (err || !usersList) {
				console.log('something wrong');
			} else {
				if (usersList.length > 0) {
					usersList.forEach(function(foundUser) {
						if (foundUser.pass == md5(pass)) {
							socket.emit('loginSuccess',foundUser);
						} else {
							socket.emit('loginFailPass');
						}
					});
				} else {
					socket.emit('loginFailUser');
				}
			}
		});
	});

	socket.on('signupTry', function (login,pass) {
		var found = false;

		db.users.find({user: login}, function (err, usersList) {
			if (err || !usersList) {
				console.log('something wrong');
			} else {
				if (usersList.length > 0) {
					socket.emit('userExists');
					found = true;
				}
			}
		});
		if (found == false) {
			db.users.save({
				user: login,
				pass: md5(pass),
				money: defaultUser.money,
				wins: defaultUser.wins,
				loss: defaultUser.loss
			}, function(err,saved){
				if (err || !saved) {
					console.log("User not saved");
				} else {
					//saved
					socket.emit('signUpSuccess',{user: login,money: defaultUser.money,wins: defaultUser.wins, loss: defaultUser.loss});
				}
			});
		}
	});

	socket.on('adduser', function (username){
		socket.username = username;
		rooms[username] = username + ' lobby';
		socket.room = rooms[username];
		socket.join(rooms[username]);
		socket.emit('setRoom', socket.room);
		socket.emit('gameCreated');
		//socket.emit('updatechat', 'SERVER', 'you have connected to '+rooms[username]);
		//socket.broadcast.to(rooms[username]).emit('updatechat', 'Server', username + ' has connected to this room');
	});

	socket.on('sendchat', function (data) {
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('refreshRoomsSend', function () {
		socket.emit('refreshRoomsRecieve', rooms);
	});

	socket.on('switchRoom', function (newroom, id) {
		socket.username = id;
		socket.join(newroom);
		socket.room = newroom;
		socket.emit('gameJoined');
		socket.emit('setRoom', socket.room);
		socket.broadcast.to(newroom).emit('updatechat', 'Server', id+' has joined this room');
	});
	socket.on('canStartGame', function (username) {
		io.sockets.in(socket.room).emit('startGame',username);
	});
	socket.on('checkTry', function (username) {
		io.sockets.in(socket.room).emit('checkResponse',username);
		io.sockets.in(socket.room).emit('updatechat', username, 'Check...');
	});
	socket.on('last', function (username) {
		var card1 = getRandomCard();
		var card2 = getRandomCard();
		var card3 = getRandomCard();
		// io.sockets.in(socket.room).emit('flop',username, {
		// 	suit: 'spades',
		// 	value: 'A',
		// },{
		// 	suit: 'clubs',
		// 	value: '3',
		// },{
		// 	suit: 'hearts',
		// 	value: '2',
		// });
		io.sockets.in(socket.room).emit('flop',username,card1,card2,card3);
		io.sockets.in(socket.room).emit('lastCheckResponse',username);
		io.sockets.in(socket.room).emit('updatechat', 'Server', 'Flopping new card(s)');
	});
	socket.on('bidTry', function (bidValue,username) {
		var currMoney = 0;
		var card1 = getRandomCard();
		var card2 = getRandomCard();
		var card3 = getRandomCard();
		db.users.find({user: username}, function (err, theUser) {
			if (err || !theUser) {
				console.log('something wrong');
			} else {
				currMoney = theUser[0].money - bidValue;
				var obj = {};
				obj.money = currMoney;
				db.users.update({user: username}, {$set: obj}, function(err, updated) {
					if (err || !updated) {
						console.log("not updated"+err);
					} else {
						io.sockets.in(socket.room).emit('updatechat', username, 'Bid $'+bidValue);
						io.sockets.in(socket.room).emit('bidResponse',username,bidValue);
						io.sockets.in(socket.room).emit('flop',username,card1,card2,card3);
					}
				});
			}
		});
	});
	socket.on('foldTry', function (bankMoney,username) {
		var currMoney = 0;
		db.users.find({user: username}, function (err, theUser) {
			if (err || !theUser) {
				console.log('something wrong');
			} else {
				currMoney = parseInt(theUser[0].money) + parseInt(bankMoney);
				var obj = {};
				obj.money = currMoney;
				db.users.update({user: username}, {$set: obj}, function(err, updated) {
					if (err || !updated) {
						console.log("not updated");
					} else {
						io.sockets.in(socket.room).emit('updatechat', username, 'Fold!');
						io.sockets.in(socket.room).emit('foldResponse', bankMoney, username);
					}
				});
			}
		});
	});
	socket.on('raiseTry', function (raiseValue,username) {
		var currMoney = 0;
		db.users.find({user: username}, function (err, theUser) {
			if (err || !theUser) {
				console.log('something wrong');
			} else {
				currMoney = parseInt(theUser[0].money) - parseInt(raiseValue);
				var obj = {};
				obj.money = currMoney;
				db.users.update({user: username}, {$set: obj}, function(err, updated) {
					if (err || !updated) {
						console.log("not updated");
					} else {
						io.sockets.in(socket.room).emit('updatechat', username, 'Raise for $'+raiseValue);
						io.sockets.in(socket.room).emit('raiseResponse',raiseValue,username);
					}
				});
			}
		});
	});
	socket.on('finalValue', function (value,user) {
		io.sockets.in(socket.room).emit('finalResponse',value.result,user);
		io.sockets.in(socket.room).emit('updatechat', user, value.message);
	});



	socket.on('disconnect', function() {
		delete usernames[socket.username];
		delete rooms[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.leave(socket.room);
	});
});