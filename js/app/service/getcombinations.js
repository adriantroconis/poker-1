define(['app/global'], function(global) {
	var values = {
		'2': 2,
		'3': 3,
		'4': 3,
		'5': 5,
		'6': 6,
		'7': 7,
		'8': 8,
		'9': 9,
		'10': 10,
		'J': 11,
		'Q': 12,
		'K': 13,
		'A': 14
	}
	var valuesMirror = {
		2: '2',
		3: '3',
		3: '4',
		5: '5',
		6: '6',
		7: '7',
		8: '8',
		9: '9',
		10: '10',
		11: 'J',
		12: 'Q',
		13: 'K',
		14: 'A'
	}

	function getHighestCard() {
		var result = 0;
		var array = [global.obj.tableCards.spot1.value,
					global.obj.tableCards.spot2.value,
					global.obj.tableCards.spot3.value,
					global.obj.tableCards.spot4.value,
					global.obj.tableCards.spot5.value,
					global.obj.playerCards.spot1.value,
					global.obj.playerCards.spot2.value];
		for (var i = array.length - 1; i >= 0; i--) {
			if (values[array[i]] > result) {
				result = values[array[i]];
			}
		};

		return result;
	}

	function checkForMatchSuit() {
		var obj = {
			'spades' : 0,
			'hearts' : 0,
			'clubs' : 0,
			'diamonds' : 0
		};
		var result = false;
		var array = [global.obj.tableCards.spot1.suit,
					global.obj.tableCards.spot2.suit,
					global.obj.tableCards.spot3.suit,
					global.obj.tableCards.spot4.suit,
					global.obj.tableCards.spot5.suit,
					global.obj.playerCards.spot1.suit,
					global.obj.playerCards.spot2.suit];
		for (prop in obj) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] == prop) {
					obj[prop]++;
				}
			}
			if (obj[prop] > 4) {
				result = true;
			}
		}

		return result;
	}

	function checkForMatchValue() {
		var obj = {
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
			'6': 0,
			'7': 0,
			'8': 0,
			'9': 0,
			'10': 0,
			'J': 0,
			'Q': 0,
			'K': 0,
			'A': 0
		};

		var result = {
			2: {
				count: 0,
				value: []
			},
			3: {
				count: 0,
				value: []
			},
			4: {
				count: 0,
				value: []
			}
		}

		var array = [global.obj.tableCards.spot1.value,
					global.obj.tableCards.spot2.value,
					global.obj.tableCards.spot3.value,
					global.obj.tableCards.spot4.value,
					global.obj.tableCards.spot5.value,
					global.obj.playerCards.spot1.value,
					global.obj.playerCards.spot2.value];

		for (prop in obj) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] == prop) {
					obj[prop]++;

				}
			}
			if (obj[prop] == 4) {
				result[4].count++;
				result[4].value = prop;
			}
			if (obj[prop] == 3) {
				result[3].count++;
				result[3].value = prop;
			}
			if (obj[prop] == 2) {
				result[2].count++;
				result[2].value.push(prop);
			}

		}
		return result;
	}

	function checkForStraight() {
		var primes = {
			'2': 2,
			'3': 3,
			'4': 5,
			'5': 7,
			'6': 11,
			'7': 13,
			'8': 17,
			'9': 19,
			'10': 23,
			'J': 29,
			'Q': 31,
			'K': 37,
			'A': 41
		}

		

		var hashTable = {
			// hash : value
			8610: 1,
			2310: 2,
			15015: 3,
			85085: 4,
			323323: 5,
			1062347: 6,
			2800733: 7,
			6678671: 8,
			14535931: 9,
			31367009: 10
		}


		var hashTableFull = {
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
			9: [],
			10: []
		}

		for (var hashProp in hashTable) {
			for (var prime in primes) {
				hashTableFull[hashTable[hashProp]].push(hashProp * primes[prime]);
				for (var prime2 in primes) {
					hashTableFull[hashTable[hashProp]].push(hashProp * primes[prime] * primes[prime2]);
				}
			}
		}

		var result;
		var hash = 1;

		var array = [global.obj.tableCards.spot1.value,
					global.obj.tableCards.spot2.value,
					global.obj.tableCards.spot3.value,
					global.obj.tableCards.spot4.value,
					global.obj.tableCards.spot5.value,
					global.obj.playerCards.spot1.value,
					global.obj.playerCards.spot2.value];
		var primedArray = [];

		for (var i = 0; i <= array.length; i++) {
			if (primes[array[i]] != undefined) {
				primedArray.push(primes[array[i]]);
			}
		};

		for (var i = 0; i < primedArray.length; i++) {
			hash *= primedArray[i];
		};

		for (var hashProp in hashTableFull) {
			for (var i = 0; i < hashTableFull[hashProp].length; i++) {
				if (hash == hashTableFull[hashProp][i]) {
					result = hashProp;
				} else {
					
				}
			};
		}
		return result;
	}

	
	function getPair () {
		var obj = checkForMatchValue();
		var result = 0;
		for (var prop in obj) {
			if (obj[prop].count == 1 && prop == 2) {
				result = values[obj[prop].value[0]];
			}
		}

		return result;
	}

	function getTwoPair () {
		var obj = checkForMatchValue();
		var result = 0;
		for (var prop in obj) {
			if (obj[prop].count == 3 && prop == 2) {
				for (var i = obj[prop].value.length - 1; i >= 0; i--) {
					//bugged shoe here
					result += values[obj[prop].value[i]];
				};
			}
			if (obj[prop].count == 2 && prop == 2) {
				for (var i = obj[prop].value.length - 1; i >= 0; i--) {
					result += values[obj[prop].value[i]];
				};
			}

		}

		return result;
	}
	
	function getThreeKind () {
		var obj = checkForMatchValue();
		var result = 0;
		for (var prop in obj) {
			if (obj[prop].count != 0 && prop == 3) {
				result = values[obj[prop].value[0]];
			}
		}

		return result;	
	}

	function getSet () {
		var obj = checkForMatchValue();
		var result = 0;
		for (var prop in obj) {
			if (obj[prop].count != 0 && prop == 4) {
				result = values[obj[prop].value];
			}
		}

		return result;
	}

	function getFullHouse () {
		var result = 0;
		if (getThreeKind() != 0 && getPair() != 0) {
			result = (getThreeKind() + getPair());
		}

		return result;
	}

	function getFlush () {
		var result = 0;
		if (checkForMatchSuit() == true) {
			result = getHighestCard();
		}

		return result;
	}



	function getCombination() {
		//todo: return value of combination
		var result = 0;
		var message = '';
		var obj = checkForMatchValue();

		result = getHighestCard();
		message = 'has: highest card '+valuesMirror[getHighestCard()];

		if (getPair() !== 0) {
			result = 14 + parseInt(getPair());
			message = 'has: pair of '+valuesMirror[getPair()];
		}
		if (getTwoPair() !== 0) {
			result = parseInt(getTwoPair()) + 28;
			message = 'has: two pairs';
		}
		if (getThreeKind() !== 0 ) {
			result = parseInt(getThreeKind()) + 56;
			message = 'has: 3 of a kind '+valuesMirror[getThreeKind()];
		}
		if (checkForStraight() !== undefined) {
			result = parseInt(checkForStraight()) + 70;
			message = 'have straight';
		}
		if (getFlush() !== 0) {
			result = parseInt(getFlush()) + 81;
			message = 'have flush';
		}
		if (getFullHouse() !== 0) {
			result = parseInt(getFullHouse()) + 95;
			message = 'got full house';
		}
		if (getSet() !==0) {
			result = parseInt(getSet()) + 123;
			message = 'have a set of '+ valuesMirror[getSet()];
		}
		if (checkForStraight() !== undefined && getFlush() !== 0) {
			result = parseInt(checkForStraight()) + 140;
			message = 'have a straight flush';
		}
		if (checkForStraight() == 10 && getFlush !== 0) {
			result = 9999;
			message = 'is very lucky! Youve got royal straight flush';
		}

		// result = getHighestCard();
		// for (var prop in obj) {
		// 	if (obj[prop].count != 0) {
		// 		console.log('you have ' + prop +' of a kind! Its ' + obj[prop].value);
		// 		result = parseInt(prop) * values[obj[prop].value];
		// 	}
		// }
		// if (checkForMatchSuit() == true) {
		// 	console.log('you have flush!');
		// 	result = 100;
		// }
		// if (checkForStraight() != undefined) {
		// 	result = parseInt(checkForStraight()) * 100;
		// 	console.log('you have straight');
		// }
		// if (checkForStraight() != undefined && checkForMatchSuit() == true) {
		// 	result = checkForMatchSuit() * 1000;
		// 	console.log('you have straight flush!');
		// }
		// if (checkForStraight() == 10 && checkForMatchSuit() == true) {
		// 	console.log('you have royal straight flush!');
		// 	result = 99999999;
		// }
		
		return {
			result: result,
			message: message
		};
	}

	return {
		get: getCombination
	}

})