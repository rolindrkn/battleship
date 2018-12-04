
//TODO:
//want to designate the amount of rows and column
//for now we will input this manually
//but later we want to have it so that
//if the player clicks on easy: 6x6 grid
//medium: 12x12 and hard: 24x24 grid
var firstTime = 1;
var rows = 10;
var cols = 10;
var squareSize = 30;
var computerGuessArray = [""];
var playerGuess = [""];

//Use div element to add grid then give id
//get the container element for the player's board
var pBoard = document.getElementById("playerboard");
var eBoard = document.getElementById("enemyboard");

//create a div using rows and cols size
for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {

        //create a new div element for each grid
        var pSquare = document.createElement("div");
        pBoard.appendChild(pSquare);

        //id each square
        var id = "p" + String.fromCharCode('A'.charCodeAt(0) + r) + c; 	//first square will have id "A0"
        pSquare.setAttribute("id", id);
		pSquare.style.backgroundColor ="blue";

        //we want each squares to start from somewhere
        var topPosition = c * squareSize;
        var leftPosition = r * squareSize;

        //we have to state where we want each of them 
        pSquare.style.top = topPosition + "px";
        pSquare.style.left = leftPosition + "px";


    }
}


//now we have to do the same for the enemy's board
for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {

        //create new div under the enemyboard div
        var eSquare = document.createElement("div");
        eBoard.appendChild(eSquare);

        //give each square an id
        var id = "e" + String.fromCharCode('A'.charCodeAt(0) + i) + j;
        eSquare.setAttribute("id", id);

        //want to also be able to click each square on the enemy square
        //when click it will call the guess method from the controller
        //object
        eSquare.setAttribute("onclick", "controller.guess(this.id)");
		eSquare.style.backgroundColor ="blue";

        //we have to sets the position of the enemyboard
        //won't be the same way as the player board
        //because player's board is already there
        var topPosition = j * squareSize;
        var leftPosition = (i * squareSize);

        eSquare.style.top = topPosition + "px";
        eSquare.style.left = leftPosition + "px";
    }
}

//so far we only have 3 objects at the moment 
//1. to update all the display - upDisp
//2. to keep all the stats - Stats
//3. to get userinput and so on - controller

//1. we'll be declaring the upDisp object and adding
//properties to it
var upDisp = {
    //this method will display messages to the user
    //in the message display area
    displayMessage: function (msg) {
        var msgArea = document.getElementById("msgArea");
        msgArea.innerHTML = msg;
    },

    //this method will display when a ship is hit
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    },

    //this method will display when the user miss
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");


    }
};

//2. this is the Stats object
//making for enemy for now... maybe can add the player's
//stat in here as well... but will find out later
//might have to do a different one for the player
var eStats = {
    //tells us the boardsize
    boadSize: rows,
    //the number of ship in the game
    numShips: 3,
    //the amount of ship shunked
    shipSunk: 0,

    //and the actualy ships with their location, which part is hit
    //and each ship's lenght
    ships: [{ locations: ["", "", "", ""], hits: ["", "", "", ""], shipLength: 4 },
			{ locations: ["", "", ""], hits: ["", "",""], shipLength: 3 },
			{ locations: ["",""], hits: ["",""], shipLength: 2}],

    //this is the fire method,
    //it takes the user's guess and determine if the guess matches
    //the ship's location
    fire: function (guess) {
        //as long as i is less than the lenght of the array, ships
        //it will check to see if location matches guess
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];

			//checks to see if guess is in location
			//if it is, it will return the index it is in
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
					upDisp.displayMessage("You sank computer's battleship!");
					//alert("You sank computer's battleship!");
				}
				//this make the upDisp display a hit message
				upDisp.displayMessage("HIT");
				//make the upDisp update the status of the grid
				upDisp.displayHit(guess);
				//also return true if there is a hit

				//          computer turn here
				computerTurn();
				// setTimeout(computerTurn, 2000);
				return true;

			}
			
        }
        //if nothing happens inside then return false
        //don't need an else statement because a function/ method
        //can only return something once 
        upDisp.displayMessage("You missed.");
        upDisp.displayMiss(guess);

        //                  computer turn here
        // setTimeout(computerTurn, 2000);
        computerTurn();

        return false;
    },

    //this method determines if the ship is sunk
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
};



//3. this is the controller object
var controller = {
    //track the amount of guesses the player has made
    guesses: 0,
    //this method will take the id of the clicked cell
    //and call the eStats.fire method 
    guess: function (clicked) {
			
		if(playerGuess.indexOf(clicked) > 0){
				alert("You have already clicked that location, try again!");
		}
		else{
			
			var shot = eStats.fire(clicked);
			//alert(clicked);
			//increment guess so that we can show stats at 
			//the end of the game
			playerGuess.push(clicked);
			this.guesses++;
			//check to see if the player has won the game if
			//they made a correct guess
			if (shot && eStats.shipSunk === eStats.numShips) {
				alert("You win!!");
				document.write('<img src="trophy.png">');
				document.write("Now reload the webpage");
	            
			}
		}
    }
};






function computerTurn(){
    
    // whenever user hits the enemy board, computer hits random user board.
    var isSame = true;
    if(firstTime==1)
    {
        var computerGuess = "p"+ String.fromCharCode(Math.floor((Math.random()*6+65)))+ Math.floor((Math.random()*6));
            computerGuessArray.push(computerGuess);
        var computerShot = pStats.fire(computerGuess);
            console.log(computerGuess +" "+ computerGuessArray.toString());
            firstTime++;
        if (computerShot && pStats.shipSunk === pStats.numShips)
             alert("Computer Win");
            return;
    }else
    {
        while(isSame == true)
        {
            var computerGuess = "p"+ String.fromCharCode(Math.floor((Math.random()*6+65)))+ Math.floor((Math.random()*6));
            
            if(sameGuessNum(computerGuess) == false)
            {
                var computerShot = pStats.fire(computerGuess);
				computerGuessArray.push(computerGuess);
                isSame = false;
                console.log(computerGuess +" "+ computerGuessArray.toString());
                if (computerShot && pStats.shipSunk === pStats.numShips){
                    alert("Computer Win");
                    return;
				}
            }
        }
    }
 }


function sameGuessNum(guess){
    var guessNum =0;
    
        if(computerGuessArray.indexOf(guess) > -1)
            return true;
		return false;
}
function compShipLoc(){
	for(var i = 0; i< eStats.ships.length; i++){
		var vert = isVert();
		do{
			var divId = getShipsFirstLoc();
			//console.log(divId);
			//console.log(divId.slice(0,2) + (parseInt(divId.charAt(2))+ 1));
		}while(outOfBound(divId, i, vert) || colliding(divId, i, vert));
		if(vert){
			for(var j = 0; j < eStats.ships[i].shipLength; j++){
				eStats.ships[i].locations[j] = divId;
				divId = divId.slice(0,2) + (parseInt(divId.charAt(2))+1);
			}
		}
		else{
			for(var j = 0; j < eStats.ships[i].shipLength; j++){
				eStats.ships[i].locations[j] = divId;
				divId = "e" + String.fromCharCode(divId.charCodeAt(1)+1) + divId.charAt(2);
			}
		}
	
		console.log(eStats.ships[i].locations);
	}
}

function isVert(){
	
	var vert = (Math.floor(Math.random() * 2) == 1);
	console.log(vert);
	return vert;
		
}
function getShipsFirstLoc(){
	var first = "e"+ String.fromCharCode(Math.floor((Math.random()* 6 +65)))
	var second = Math.floor((Math.random()* 6));
	var divId = first + second;
	return divId;
}


function outOfBound(divId, i, vert){
	if(vert){
		if((parseInt(divId.charAt(2)) + eStats.ships[i].shipLength) > 5)
			return true;
		}
	else{
		if(divId.charCodeAt(1)+ eStats.ships[i].shipLength > 71)
			
			return true;
	}
	return false;
		
}
function colliding(divId, i, vert){
	var shipLoc, k;
	if(vert){
		//this is the number of the length of the ships looking at
		for(var j = 0; j < eStats.ships[i].shipLength; j++){
			k=0;
			shipLoc = divId.slice(0,2) + (parseInt(divId.charAt(2))+ j);
			while(k < i){
				
				if(eStats.ships[k].locations.indexOf(shipLoc) >= 0)
					return true;
				k++;
			}	

		}	
	}
	else{
		for(var j = 0; j < eStats.ships[i].shipLength; j++){
			k =0;
			shipLoc = "e" + String.fromCharCode(divId.charCodeAt(1)+j) + divId.charAt(2);
			while(k< i){
				
				if(eStats.ships[k].locations.indexOf(shipLoc) >= 0)
					return true;
				k++;
			}	
		
		}

	}
	return false;
}

compShipLoc();