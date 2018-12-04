
var canvas = document.getElementById("playerArea");
var ctx = canvas.getContext("2d");
//global variables here
var ships =[];
var dragIndex, dragging, mouseX, mouseY, dragHoldX, dragHoldX1;
var dragHoldY, dragHoldY1;
var rotate = [0, 0, 0];
var rows =6, cols = 6, squareSize =30;
var collision = false;
var checkCollision = collision;
//images
image1 = new Image();
image1.src = "BattleShip1a.png";
image1a = new Image();
image1a.src = "BattleShip1.png";
image2 = new Image();
image2.src = "Cruiser.png";
image2a = new Image();
image2a.src ="Cruiser2a.png";
image3 = new Image();
image3.src = "PatrolBoat.png";
image3a = new Image();
image3a.src ="PatrolBoat3a.png";

//function that runs at the beginning
init();
function init() {
    makeShips();
    document.getElementById("playerArea").addEventListener("mousedown", mouseDown);
    document.getElementById("playerArea").addEventListener("mouseup", mouseUp);
    
}
//1. have to make each image and object
//1a. xcoor
//1b.ycoor
//1c.width
//1d.height
function makeShips() { 
    ship1 = {
        x: 0, y: 0, h: 30, w: 120, x1: 0, y1: 0, w1: 30, h1: 120, rot:0, cellX: 0, cellY: 0, s: 4};
    ship2 = { x: 0, y: 60, h: 30, w: 90, x1: 0, y1:0 , w1: 30, h1 : 90, rot:0, cellX: 0, cellY: 2, s: 3};
    ship3 = {
            x: 0, y: 120, h: 30, w: 60, x1: 0, y1: 0, h1: 60, w1: 30, rot:0, cellX: 0, cellY: 4, s: 2};
    ships = [ship1, ship2, ship3];
image1.onload = function(e) {
    ctx.drawImage(image1, ships[0].x, ships[0].y, ships[0].w, ships[0].h);
    }
image2.onload = function(e) {
    ctx.drawImage(image2, ships[1].x, ships[1].y, ships[1].w, ships[1].h);
    }
image3.onload = function (e) {
    ctx.drawImage(image3, ships[2].x, ships[2].y, ships[2].w, ships[2].h);
    }

}
function mouseDown(e) {
		
        var i;
        var highestIndex = -1;
        var rect = canvas.getBoundingClientRect();
        mouseX = parseInt(e.clientX -rect.left);
        mouseY = parseInt(e.clientY -rect.top);
        console.log("mouse: " + mouseX + " " + mouseY);
        //find out which shape was clicked
        for (i = 0; i < 3; i++) {
            if (hitTest(ships[i], mouseX, mouseY)) {
                console.log(i);
                dragging = true;
                if (i > highestIndex) {
                    dragHoldX = mouseX -ships[i].x;
                    dragHoldX1 = mouseX - ships[i].x1;
                    dragHoldY = mouseY - ships[i].y;
                    dragHoldY1 = mouseY -ships[i].y1;
                    highestIndex = 1;
                    dragIndex = i;
                    document.getElementById("playerArea").addEventListener("contextmenu", function (e) {
                        e.preventDefault();
                        ships[dragIndex].rot++;
						
                        drawScreen();
                    });
                }
            }
        }

        if (dragging) {
            document.getElementById("playerArea").addEventListener("mousemove", mouseMove);
        }
		}
		
function hitTest(ship, mx, my) {

    
            var dx, dx1, dxx, dxx1;
            var dy, dy1, dyy, dyy1;
            dx = mx -ship.x;
            dxx = dx *dx;
            dy = my -ship.y;
            dyy = dy*dy;
            dx1 = mx -ship.x1;
            dxx1 = dx1 * dx1;
            dy1 = my -ship.y1;
            dyy1 = dy1 * dy1;

            // hit will be registered if the distance away from the 
            //center is less than the height or the width
            if (dxx < ship.w*ship.w  && dyy < ship.h*ship.h)
                return true;
            if (dxx1 < ship.w1*ship.w1 && dyy1 < ship.h1*ship.h1)
                return true;
            return false;
            
}
function mouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;   
	posX = mouseX;
    posX1 = mouseX;	
	posY = mouseY;
	posY1 = mouseY;
	
        
	var minX = 0;
    var minX1 = 0;
    var maxX1 = canvas.width - ships[dragIndex].w1;
    var maxX = canvas.width - ships[dragIndex].w;
    var minY = 0;
    var minY1 =0;
    var maxY1 = canvas.height -ships[dragIndex].h1;
    var maxY = canvas.height -ships[dragIndex].h;
    
	
	posX = ((posX > maxX) ? maxX : posX);
	posY = ((posY > maxY) ? maxY : posY);
	posX1 = ((posX1 > maxX1) ? maxX1 : posX1);
	posY1 = ((posY1 > maxY1) ? maxY1 : posY1);
 
    
    
 

    ships[dragIndex].x1 = posX1;
    ships[dragIndex].y1 = posY1;
    ships[dragIndex].x = posX;
    ships[dragIndex].y = posY;
    //console.log(ships[dragIndex].x + " " + ships[dragIndex].y);
   
       drawScreen();
    }
	

function mouseUp(e) {
     var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top; 

	posX = mouseX;
    posX1 = mouseX;	
	posY = mouseY;
	posY1 = mouseY;

  
	ships[dragIndex].cellX = Math.floor(posX / squareSize);
	ships[dragIndex].cellY = Math.floor(posY /squareSize);

    ships[dragIndex].cellX = ((ships[dragIndex].cellX < 0) ? 0: ((ships[dragIndex].cellX > cols) ? (cols-1) : ships[dragIndex].cellX));
    ships[dragIndex].cellY = ((ships[dragIndex].cellY < 0) ? 0: ((ships[dragIndex].cellY > cols) ? (rows-1) : ships[dragIndex].cellY));
    if(ships[dragIndex].rot % 2 == 0)
        if(ships[dragIndex].cellX > 6 - ships[dragIndex].s)
            ships[dragIndex].cellX = 6 - ships[dragIndex].s;

 
    collision = false;
	
   
	
    for(i = 0; i <= 2; i++){
        for(m = i+1; m <= 2; m++){
            var oShip = ships[i];
			var sShip = ships[m];
            for(var j = 0; j < oShip.s; j++){
                for(var k = 0; k < sShip.s; k++){
                    if((oShip.rot % 2 == 0) && (sShip.rot % 2 == 0)){
                       
                       if((oShip.cellX + j == sShip.cellX + k) && (oShip.cellY == sShip.cellY)){
                            collision = true;
                            
							
                        }
                    }
                    else if((oShip.rot % 2 == 1) && (sShip.rot % 2 == 1)){
                        if((oShip.cellY + j == sShip.cellY + k) && (oShip.cellX == sShip.cellX)){
                            collision = true;
                       
						 
                        }
                    }
                    else if((oShip.rot % 2 == 0) && (sShip.rot % 2 == 1)){
                        if((oShip.cellX + j == sShip.cellX) && (oShip.cellY == sShip.cellY + k)){
                            collision = true;
                         
							
                        }
                    }
                    else if((oShip.rot % 2 == 1) && (sShip.rot % 2 == 0)){
                        if((oShip.cellX == sShip.cellX + k) && (oShip.cellY + j == sShip.cellY)){
                            collision = true;
                         
                        }
                    }
                }
            
            }
		}
	}
    
	
    console.log(collision);
	console.log("cellX " + ships[dragIndex].cellX + "cellY " + ships[dragIndex].cellY);
     
    var posX, posY, posX1, posY1;
	var minX = ships[dragIndex].cellX * squareSize;
    var minX1 = ships[dragIndex].cellX * squareSize;
    var maxX1 = canvas.width - ships[dragIndex].w1;
    var maxX = canvas.width - ships[dragIndex].w;
    var minY = ships[dragIndex].cellY * squareSize;
    var minY1 = ships[dragIndex].cellY * squareSize;
    var maxY1 = canvas.height -ships[dragIndex].h1;
    var maxY = canvas.height -ships[dragIndex].h;
    
	
	posX = ((posX > maxX) ? maxX : minX);
	posY = ((posY > maxY) ? maxY : minY);
	posX1 = ((posX1 > maxX1) ? maxX1 : minX1);
	posY1 = ((posY1 > maxY1) ? maxY1 : minY1);
 

    ships[dragIndex].x1 = posX1;
    ships[dragIndex].y1 = posY1;
    ships[dragIndex].x = posX;
    ships[dragIndex].y = posY;
	console.log(ships[dragIndex].x + " " + ships[dragIndex].y);
   
	   drawScreen();
    
    

    

    
    if (dragging) {
        dragging = false;
        document.getElementById("playerArea").removeEventListener("mousemove", mouseMove, false);
    }
	//document.getElementById("playerArea").removeEventListener("mouseup", mouseUp, false);

}


function drawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShips();
}
function drawShips() {
	
    for(var i =0; i< 3; i++){
        if(ships[i].rot % 2 == 0){
            ctx.drawImage(pickHorImage(i), ships[i].x, ships[i].y, ships[i].w, ships[i].h);
        }
        else{
            ctx.drawImage(pickVertImage(i), ships[i].x1, ships[i].y1, ships[i].w1, ships[i].h1);
        }
    }
}

function pickHorImage(i){
    switch(i){
        case 0:
            return image1;
        case 1:
            return image2;
        case 2:
            return image3;
    }
}
function pickVertImage(i){
    switch(i){
        case 0:
            return image1a;
        case 1:
            return image2a;
        case 2:
            return image3a;
    }
}

var pStats = {
    //tells us the boardsize
    boardSize: rows,
    //the number of ship in the game
    numShips: 3,
    //the amount of ship shunked
    shipSunk: 0,
    //and the actualy ships with their location, which part is hit
    //and each ship's lenght
    ships: [{locations: ["","","",""], hits:["","","",""], shipLength: 4},
			{ locations: ["", "", ""], hits: ["", "", ""], shipLength: 3 },
			{ locations: ["", ""], hits: ["", ""], shipLength: 2 }],
				

    //this is the fire method,
    //it takes the user's guess and determine if the guess matches
    //the ship's location
    fire: function (guess) {
        //as long as i is less than the lenght of the array, ships
        //it will check to see if location matches guess
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            //checks to see if guess is in location
            //if it is, it will return the indext it is in
            //if not, then it will return a -1
            var index = ship.locations.indexOf(guess);
            //if the guess is found
            if (index >= 0) {
                //then change the status of hits to equal "hit"
                //for the ship that got hit
                ship.hits[index] = "hit";
                //check to see if the hit caused the ship to sink
                if (this.isSunk(ship)) {
                    this.shipSunk++;
                    upDisp.displayMessage("Oooh... That must hurt!");
                    //alert("OUCH!");
                }
                //this make the upDisp display a hit message
                upDisp.displayMessage("HIT");
                //make the upDisp update the status of the grid
                upDisp.displayHit(guess);
                //also return true if there is a hit
                return true;

            }
        }
        //if nothing happens inside then return false
        //don't need an else statement because a function/ method
        //can only return something once 
        upDisp.displayMessage("You missed.");
        upDisp.displayMiss(guess);
        return false;
    },
	    isSunk: function (ship) {

        for (var i = 0; i < ship.shipLength; i++) {
            //if the ship.hits is not all "hit" then, it 
            //will return a false value
            if (ship.hits[i] !== "hit") {

                return false;
            }
        }
        return true;
    }
}
function play(){
	if(collision){
		alert("The ships can not be placed on top of each other!");
		
	}
	else{
		
		document.getElementById("playerArea").removeEventListener("mousedown", mouseDown,false);
		document.getElementById("playerArea").removeEventListener("mouseUp",mouseUp,false);
		document.getElementById("playerArea").removeEventListener("mousemove", mouseMove,false);
		findShipsLoc();
		for(var i = 0; i< 3; i++)
			console.log(pStats.ships[i].locations);
	}
}
function findShipsLoc(){
	var divNumX;
	var divId;
	var first,second;

	for(var i =0; i< 3; i++){
		if(ships[i].rot % 2 == 0){
			divNumX = ships[i].x/squareSize;
			second = ships[i].y/squareSize;
			first = String.fromCharCode("A".charCodeAt(0) + divNumX);
			
			divId = "p" + first + second;
			for(var j = 0; j < pStats.ships[i].shipLength; j++){
				pStats.ships[i].locations[j] = divId
				first = String.fromCharCode(first.charCodeAt(0)+1);
				divId ="p" + first + second;
			}
		}
		else if(ships[i].rot % 2 !=0){
			
			divNumX = ships[i].x1/squareSize;
			second = ships[i].y1/squareSize;
			first = String.fromCharCode("A".charCodeAt(0) + divNumX);
			divId = "p" + first + second;
			for(var j = 0; j < pStats.ships[i].shipLength; j++){
				pStats.ships[i].locations[j] = divId
				divId = "p" + first + (++second);
			}
		}
		
	}
	
}