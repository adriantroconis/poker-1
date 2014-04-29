define(['app/global','model/card','service/getcard'],function(global,Card,getcard){

	function triggerFlop1(configObj,card1,card2,card3) {
		var tableCard1 = new Card(configObj,configObj.cardCfgDefault)
		var tableCard2 = new Card(configObj,configObj.cardCfgDefault)
		var tableCard3 = new Card(configObj,configObj.cardCfgDefault);

		tableCard1.draw(configObj.tableSpot['1'],card1.value,card1.suit);
		tableCard2.draw(configObj.tableSpot['2'],card2.value,card2.suit);
		tableCard3.draw(configObj.tableSpot['3'],card3.value,card3.suit);

		global.obj.tableCards.spot1 = card1;
		global.obj.tableCards.spot2 = card2;
		global.obj.tableCards.spot3 = card3;
	}

	function triggerFlop2(configObj,card4) {
		var tableCard4 = new Card(configObj,configObj.cardCfgDefault);

		tableCard4.draw(configObj.tableSpot['4'],card4.value,card4.suit);

		global.obj.tableCards.spot4 = card4;
	}

	function triggerFlop3(configObj,card5) {
		var tableCard5 = new Card(configObj,configObj.cardCfgDefault);

		tableCard5.draw(configObj.tableSpot['5'],card5.value,card5.suit);

		global.obj.tableCards.spot5 = card5;
	}

	function giveCardsPlayer1(configObj){
		var playerCard1 = new Card(configObj,configObj.cardCfgDefault);
		var playerCard2 = new Card(configObj,configObj.cardCfgDefault);

		var card1 = getcard.getRandomCard();
		var card2 = getcard.getRandomCard();

		playerCard1.draw(configObj.playerSpot1['1'],card1.value,card1.suit);
		playerCard2.draw(configObj.playerSpot1['2'],card2.value,card2.suit);

		global.obj.playerCards.spot1 = card1;
		global.obj.playerCards.spot2 = card2;
	}

	function giveCardsPlayer2(configObj) {
		var playerCard1 = new Card(configObj,configObj.cardCfgDefault,true);
		var playerCard2 = new Card(configObj,configObj.cardCfgDefault,true);

		playerCard1.draw(configObj.playerSpot2['1']);
		playerCard2.draw(configObj.playerSpot2['2']);
	}

	return {
		triggerTableFlop1 : triggerFlop1,
		triggerTableFlop2 : triggerFlop2,
		triggerTableFlop3 : triggerFlop3,
		giveCardsPlayer1 : giveCardsPlayer1,
		giveCardsPlayer2 : giveCardsPlayer2
	}
})