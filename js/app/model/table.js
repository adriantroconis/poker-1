define(function(){

	function Table(cfg) {
		var that = this;
		this.canvas = document.getElementById(cfg.canvasIdTable);
		this.ctx = this.canvas.getContext('2d');
		this.width = this.canvas.getAttribute('width');
		this.height = this.canvas.getAttribute('height');
		this.radius = cfg.tableCfg.radius;
		this.x = cfg.tableCfg.x;
		this.y = cfg.tableCfg.y;

		this.tableBg = new Image();
		this.tableBg.src = cfg.tableBgPath;
		this.tableBg.onload = function () {
			that.pattern = that.ctx.createPattern(that.tableBg,'repeat');

			that.gradient = that.ctx.createLinearGradient(that.width/2,0,that.width/2,that.height);
			that.gradient.addColorStop("0",cfg.tableCfg.gradient["0"]);
			that.gradient.addColorStop("1",cfg.tableCfg.gradient["1"]);

			that.draw();
		}
	}

	Table.prototype.draw  =	function() {
		var x = this.x,
			y = this.y,
			r = this.radius,
			w = this.width,
			h = this.height,
			pattern = this.pattern,
			gradient = this.gradient;
		this.ctx.fillStyle=pattern;
		this.ctx.strokeStyle=gradient;
		this.ctx.lineWidth=10;

	    this.ctx.beginPath();

	    this.ctx.moveTo(x+r, y);
	    this.ctx.lineTo(x+w-r, y);
	    this.ctx.quadraticCurveTo(x+w, y, x+w, y+r);
	    this.ctx.lineTo(x+w, y+h-r);
	    this.ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
	    this.ctx.lineTo(x+r, y+h);
	    this.ctx.quadraticCurveTo(x, y+h, x, y+h-r);
	    this.ctx.lineTo(x, y+r); 
	    this.ctx.quadraticCurveTo(x, y, x+r, y);

	    this.ctx.fill();
	    this.ctx.stroke();
    }
    
	return Table;	
})

