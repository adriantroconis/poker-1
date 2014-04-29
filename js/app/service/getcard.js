define(function(){

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

	return {
		getRandomCard : getRandomCard
	}
})