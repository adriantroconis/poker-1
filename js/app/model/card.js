define(function(){

	function Card(cfgGlobal,cfgCard,isBack) {
		this.canvas = document.getElementById(cfgGlobal.canvasIdObjects);
		this.ctx = this.canvas.getContext('2d');
		this.isBack = isBack || false;

    	this.r = cfgCard.radius;
    	this.w = cfgCard.width;
    	this.h = cfgCard.height;
    	this.backBgPath = cfgGlobal.cardBackPath;
    }

    Card.prototype.draw = function (cardPosition,value,suit) {
    	var that = this;

    	this.x = cardPosition.x;
    	this.y = cardPosition.y;

    	function borderDraw() {
    		this.ctx.strokeStyle='#000';
			this.ctx.lineWidth=2;
    		this.ctx.beginPath();

		    this.ctx.moveTo(this.x+this.r, this.y);
		    this.ctx.lineTo(this.x+this.w-this.r, this.y);
		    this.ctx.quadraticCurveTo(this.x+this.w, this.y, this.x+this.w, this.y+this.r);
		    this.ctx.lineTo(this.x+this.w, this.y+this.h-this.r);
		    this.ctx.quadraticCurveTo(this.x+this.w, this.y+this.h, this.x+this.w-this.r, this.y+this.h);
		    this.ctx.lineTo(this.x+this.r, this.y+this.h);
		    this.ctx.quadraticCurveTo(this.x, this.y+this.h, this.x, this.y+this.h-this.r);
		    this.ctx.lineTo(this.x, this.y+this.r); 
		    this.ctx.quadraticCurveTo(this.x, this.y, this.x+this.r, this.y);
		    this.ctx.stroke();
    	}

    	if (this.isBack == false) {
    		this.ctx.fillStyle='#fff';
    		borderDraw.apply(this);
    		this.ctx.fill();
    	} else {
    		this.backBg = new Image();
			this.backBg.src = this.backBgPath;

			this.backBg.onload = function () {
				that.pattern = that.ctx.createPattern(that.backBg,'repeat');
				that.ctx.fillStyle = that.pattern;
				borderDraw.apply(that);
				that.ctx.fill();
			}
    	}
    	
	    if (this.isBack == false) {
    		switch (suit) {
		    	case 'spades':
		    		drawSpades(this.ctx,cardPosition,{
				    	width: this.w,
				    	height: this.h
				    });
		    		break;
		    	case 'hearts':
		    		drawHearts(this.ctx,cardPosition,{
				    	width: this.w,
				    	height: this.h
				    });
		    		break;
		    	case 'diamonds':
		    		drawDiamonds(this.ctx,cardPosition,{
				    	width: this.w,
				    	height: this.h
				    });
		    		break;
		    	case 'clubs':
		    		drawClubs(this.ctx,cardPosition,{
				    	width: this.w,
				    	height: this.h
				    });
		    		break;

		    }
		   
		    renderValue(this.ctx,cardPosition,{
		    	width: this.w,
		    	height: this.h
		    }, {
		    	value: value
		    })
    	}
	    
    }

    function renderValue(ctx,position,cfgCard,valueCfg) {
    	var value = valueCfg.value;

    	var size = 20;
		var cardWidth = cfgCard.width;
    	var cardHeight = cfgCard.height;
    	var x = position.x + (cardWidth - size) / 5;
    	var y = position.y + (cardHeight - size) / 2;

    	ctx.font=size+"px Arial";
    	ctx.textBaseline="top";
    	ctx.fillText(value,x,y);
    }

    function drawSpades(ctx,position,cfgCard) {
    	//size
    	var width = 15;
    	var height = 20;

    	var cardWidth = cfgCard.width;
    	var cardHeight = cfgCard.height;
    	//selecting bottom left point to start
    	var x = position.x + (width + (cardWidth - width) / 3);
    	var y = position.y + (height + (cardHeight - height) / 2);

    	ctx.fillStyle='#000';
    	ctx.strokeStyle='#fff';
    	ctx.lineWidth=2;
    	ctx.lineJoin="round";
    	ctx.lineCap="round";

    	ctx.beginPath();

    	ctx.moveTo(x,y);
    	ctx.lineTo(x+width,y);
    	ctx.bezierCurveTo(x+width,y,x+width/2,y,x+width/2,y-height/2);
    	ctx.bezierCurveTo(x+width/2,y-height/2,x+width/2,y,x,y);
    	ctx.moveTo(x+width/2,y-height/2);
    	ctx.bezierCurveTo(x+width/2,y-height/2,x+width/2,y-height/4,x+width/4,y-height/4);
    	ctx.bezierCurveTo(x+width/4,y-height/4,x,y-height/4,x,y-height/2);
    	ctx.lineTo(x+width/2,y-height);
    	ctx.lineTo(x+width,y-height/2);
    	ctx.bezierCurveTo(x+width,y-height/2,x+width,y-height/4,x+3*width/4,y-height/4);
    	ctx.bezierCurveTo(x+3*width/4,y-height/4,x+width/2,y-height/4,x+width/2,y-height/2);
    	ctx.stroke();
    	ctx.fill();
    }

    function drawHearts(ctx,position,cfgCard) {
		//size
		var width = 18;
    	var height = 17;

    	var cardWidth = cfgCard.width;
    	var cardHeight = cfgCard.height;
    	//selecting bottom left point to start
    	var x = position.x + (width + (cardWidth - width) / 3);
    	var y = position.y + (height + (cardHeight - height) / 2);

    	ctx.fillStyle='#FF0000';
    	ctx.strokeStyle='#000';
    	ctx.lineWidth=3;

    	ctx.beginPath();

    	ctx.moveTo(x+width/2,y);
    	ctx.lineTo(x+width/4,y-height/2);
    	ctx.quadraticCurveTo(x,y-height,x+width/4,y-height);
    	ctx.quadraticCurveTo(x+width/2,y-height,x+width/2,y-height/2);
    	ctx.quadraticCurveTo(x+width/2,y-height,x+3*width/4,y-height);
    	ctx.quadraticCurveTo(x+width,y-height,x+3*width/4,y-height/2);
    	ctx.lineTo(x+width/2,y);

        ctx.closePath();

		ctx.stroke();
    	ctx.fill();
    }

    function drawDiamonds(ctx,position,cfgCard) {
    	var width = 15;
    	var height = 20;

    	var cardWidth = cfgCard.width;
    	var cardHeight = cfgCard.height;
    	//selecting bottom left point to start
    	var x = position.x + (width + (cardWidth - width) / 3);
    	var y = position.y + (height + (cardHeight - height) / 2);

    	ctx.fillStyle='#FF0000';
    	ctx.strokeStyle='#000';
    	ctx.lineWidth=3;

    	ctx.beginPath();

    	ctx.moveTo(x+width/2,y);
    	ctx.lineTo(x,y-height/2);
    	ctx.lineTo(x+width/2,y-height);
    	ctx.lineTo(x+width,y-height/2);
    	ctx.lineTo(x+width/2,y);

        ctx.closePath();

		ctx.stroke();
    	ctx.fill();
    }
    function drawClubs(ctx,position,cfgCard) {
    	var width = 15;
    	var height = 17;

    	var cardWidth = cfgCard.width;
    	var cardHeight = cfgCard.height;
    	//selecting bottom left point to start
    	var x = position.x + (width + (cardWidth - width) / 3);
    	var y = position.y + (height + (cardHeight - height) / 2);

    	ctx.fillStyle='#000';
    	ctx.strokeStyle='#fff';
    	ctx.lineWidth=1;

    	ctx.beginPath();

    	ctx.moveTo(x,y);
    	ctx.lineTo(x+width,y);
    	ctx.quadraticCurveTo(x+width/2,y,x+width/2,y-height/3);
    	ctx.quadraticCurveTo(x+width/2,y,x,y);

    	ctx.moveTo(x+width/2,y-height/3);
    	ctx.quadraticCurveTo(x+width/2,y-height/4,x+width/4,y-height/4);
    	ctx.quadraticCurveTo(x,y-height/4,x,y-height/3);
    	ctx.quadraticCurveTo(x,y-height/2,x+width/4,y-height/2);
    	ctx.quadraticCurveTo(x+width/2,y-height/2,x+width/2,y-2*height/5);
    	ctx.quadraticCurveTo(x+width/4,y-2*height/5,x+width/4,y-2*height/3);
    	ctx.quadraticCurveTo(x+width/4,y-height,x+width/2,y-height);
    	ctx.quadraticCurveTo(x+3*width/4,y-height,x+3*width/4,y-2*height/3);
    	ctx.quadraticCurveTo(x+3*width/4,y-2*height/5,x+width/2,y-2*height/5);
    	ctx.quadraticCurveTo(x+width/2,y-height/2,x+3*width/4,y-height/2);
    	ctx.quadraticCurveTo(x+width,y-height/2,x+width,y-height/3);
    	ctx.quadraticCurveTo(x+width,y-height/4,x+3*width/4,y-height/4);
    	ctx.quadraticCurveTo(x+width/2,y-height/4,x+width/2,y-2*height/5);

		ctx.stroke();
    	ctx.fill();
    }


    return Card;
})