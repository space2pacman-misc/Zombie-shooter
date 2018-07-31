	var map = document.querySelector(".map");
	var resolution = {
		x: true,
		y: true,
		move: true
	}
	var startMove = true;
	var bots = [];
	var quantityBot;

	var player = new CreateObject("player", 100, 100);

	function CreateObject(name, x = 0,y = 0) {
		var element = document.createElement("div");
		this.el = element;
		this.el.classList.add(name);
		this.el.style.left = x + "px";
		this.el.style.top = y + "px";
		this.width = this.el.offsetWidth;
		this.height = this.el.offsetHeight;
		this.pos = {
			x: 0,
			y: 0
		}
		map.appendChild(element)
	}

	function getRandom(n) {
		return Math.floor(Math.random() * n);
	}

	function addBot(quantity) {
		quantityBot = quantity;

		for(var i = 0; i < quantityBot; i++) {
			var bot = new CreateObject("bot", getRandom(300), getRandom(300));
			bots.push(bot);
		}
	}

	function moveBot() {
		for(var i = 0;i<quantityBot;i++) {
			lineBot(bots[i].el.offsetLeft, bots[i].el.offsetTop, player.pos.x, player.pos.y, i);
		}
	}

	function clearTimer() {
		var w = window;
		var i = w.setInterval(function(){},100000);
		while(i>=0) {
			w.clearInterval(i--);
		}
	}

	addBot(5);

	map.addEventListener("click", function(e) {
		player.pos.x = e.layerX - 25;
		player.pos.y = e.layerY - 25;
		resolution.x = true;
		resolution.y = true;
		if (startMove) {
			clearTimer();
			line(player.el.offsetLeft, player.el.offsetTop, player.pos.x, player.pos.y);
			moveBot();
			startMove = false;
		}
	})

	map.addEventListener("mousemove", function(e) {
		var boxCenter=[player.el.offsetLeft+player.width/2, player.el.offsetTop+player.width/2];
		var angle = Math.atan2(e.pageX - boxCenter[0], - (e.pageY - boxCenter[1]) )*(180/Math.PI);

		angle = Math.floor(angle);
		player.el.style.transform = "rotateZ(" + (270 + angle) + "deg)";
	});

	function line(x0, y0, x1, y1){
			var dx = Math.abs(x1-x0);
		    var dy = Math.abs(y1-y0);
		    var sx = (x0 < x1) ? 1 : -1;
		    var sy = (y0 < y1) ? 1 : -1;
		    var err = dx-dy;

		    var i = setInterval(function() {
		    	player.el.style.left = x0  + "px";
				player.el.style.top = y0 + "px";
				
			    if ((x0==x1) && (y0==y1)) return;
			    var e2 = 2*err;
			    if (e2 >-dy){ 
			    	err -= dy; 
			    	x0  += sx; 
			    }
			    if (e2 < dx){ 
			    	err += dx; 
			    	y0  += sy; 
			    }
			    if (x0 == player.pos.x && y0 == player.pos.y) {
			    	clearInterval(i);
			    	startMove = true;
			    }
		    })
		   
		}

function lineBot(x0, y0, x1, y1,index){
			var dx = Math.abs(x1-x0);
		    var dy = Math.abs(y1-y0);
		    var sx = (x0 < x1) ? 1 : -1;
		    var sy = (y0 < y1) ? 1 : -1;
		    var err = dx-dy;

		    i = setInterval(function() {
		    	bots[index].el.style.left = x0  + "px";
				bots[index].el.style.top = y0 + "px";

				var boxCenter=[bots[index].el.offsetLeft+bots[index].el.offsetWidth/2, bots[index].el.offsetTop+bots[index].el.offsetWidth/2];
				var angle = Math.atan2(player.pos.x - boxCenter[0], - (player.pos.y - boxCenter[1]) )*(180/Math.PI);

				angle = Math.floor(angle);
				bots[index].el.style.transform = "rotateZ(" + (270 + angle) + "deg)";



 var dx0 = player.el.offsetLeft - bots[index].el.offsetLeft;
  var dy0 = player.el.offsetTop - bots[index].el.offsetTop;
  var distance = Math.sqrt(dx0 * dx0 + dy0 * dy0);



/*
				for(var i= 0;i < quantityBot; i++) {




					if (index == i) continue
	var dxBot = bots[index].el.offsetLeft - bots[i].el.offsetLeft;
  var dyBot = bots[index].el.offsetTop - bots[i].el.offsetTop;
  var distanceBot = Math.sqrt(dxBot * dxBot + dyBot * dyBot);
					if(distanceBot < bots[index].el.offsetWidth / 2 + bots[i].el.offsetWidth / 2) {
						bots[index].el.style.background = "red";

					if(bots[index].el.classList.contains("red")) {
						break;
					}
					
					//return false;
				} else {
					bots[index].el.style.background = "#0f0";
				}
				}*/

 


				if(distance < player.el.offsetWidth / 2 + bots[index].el.offsetWidth / 2) {
					bots[index].el.style.background = "red";
					bots[index].el.classList.add("red");
					return false;
				} else {
					bots[index].el.style.background = "#0f0";
				}
				
			    if ((x0==x1) && (y0==y1)) return;
			    var e2 = 2*err;
			    if (e2 >-dy){ 
			    	err -= dy; 
			    	x0  += sx; 
			    }
			    if (e2 < dx){ 
			    	err += dx; 
			    	y0  += sy; 
			    }
			    if (x0 == player.pos.x && y0 == player.pos.y) {
			    	//clearInterval(i);
			    	startMove = true;
			    }
		    },50)
		   
		}




/*
function lineBot(x0, y0, x1, y1,index){
			var dx = Math.abs(x1-x0);
		    var dy = Math.abs(y1-y0);
		    var sx = (x0 < x1) ? 1 : -1;
		    var sy = (y0 < y1) ? 1 : -1;
		    var err = dx-dy;

		    i = setInterval(function() {
		    	bots[index].el.style.left = x0  + "px";
				bots[index].el.style.top = y0 + "px";

				var boxCenter=[bots[index].el.offsetLeft+bots[index].el.offsetWidth/2, bots[index].el.offsetTop+bots[index].el.offsetWidth/2];
				var angle = Math.atan2(player.pos.x - boxCenter[0], - (player.pos.y - boxCenter[1]) )*(180/Math.PI);

				angle = Math.floor(angle);
				bots[index].el.style.transform = "rotateZ(" + (270 + angle) + "deg)";

				for(var i= 0;i < quantityBot; i++) {
					if (index == i) continue
					if(bots[index].el.offsetLeft + bots[index].el.offsetWidth >= bots[i].el.offsetLeft
					&& bots[index].el.offsetLeft <= bots[i].el.offsetLeft + bots[i].el.offsetWidth
					&& bots[index].el.offsetTop + bots[index].el.offsetHeight >= bots[i].el.offsetTop
					&& bots[index].el.offsetTop <= bots[i].el.offsetTop + bots[i].el.offsetHeight) {
					bots[index].el.style.background = "red";

					if(bots[index].el.classList.contains("red")) {
						break;
					}

					if(bots[index].el.offsetLeft + bots[index].el.offsetWidth == bots[i].el.offsetLeft) x0-=1;
					if(bots[index].el.offsetLeft == bots[i].el.offsetLeft + bots[i].el.offsetWidth) x0+=1;
					if(bots[index].el.offsetTop + bots[index].el.offsetHeight == bots[i].el.offsetTop) y0-=1; 
					if(bots[index].el.offsetTop == bots[i].el.offsetTop + bots[i].el.offsetHeight) y0 += 1; 
					
					//return false;
				} else {
					bots[index].el.style.background = "#0f0";
				}
				}

				if(bots[index].el.offsetLeft + bots[index].el.offsetWidth >= player.el.offsetLeft
					&& bots[index].el.offsetLeft <= player.el.offsetLeft + player.el.offsetWidth
					&& bots[index].el.offsetTop + bots[index].el.offsetHeight >= player.el.offsetTop
					&& bots[index].el.offsetTop <= player.el.offsetTop + player.el.offsetHeight) {
					bots[index].el.style.background = "red";
					bots[index].el.classList.add("red");
					return false;
				} else {
					bots[index].el.style.background = "#0f0";
				}
				
			    if ((x0==x1) && (y0==y1)) return;
			    var e2 = 2*err;
			    if (e2 >-dy){ 
			    	err -= dy; 
			    	x0  += sx; 
			    }
			    if (e2 < dx){ 
			    	err += dx; 
			    	y0  += sy; 
			    }
			    if (x0 == player.pos.x && y0 == player.pos.y) {
			    	//clearInterval(i);
			    	startMove = true;
			    }
		    },50)
		   
		}

*/