var x= document.getElementById("battleship");
document.getElementById("pause").addEventListener("click",pauseAudio)
var myVar;

function playAudio(){

x.play();
}


function pauseAudio(){

x.pause();

}

function timer(){

myVar= setTimeout(function(){ alert("Hello");},3000); // put switch player function instead of alert.after 3 seconds it automotically call switchplayer();



}

// if you want to end the game 
function myStopFunction(){

clearTimeout(myVar);

}
function enterName(){
	
var namePlayer= document.getElementById("name").value;
	 alert(" Good luck "+ namePlayer );
	 
	
	
	
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function clickMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

