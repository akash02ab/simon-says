const startGame = document.querySelector(".btn");
const taps = document.querySelector(".taps");
const currentScore = document.querySelector(".score");
const winMessage = document.querySelector(".win-msg");
const looseMessage = document.querySelector(".lose-msg");

let palette = ["green", "red", "yellow", "blue"];
let level = 1;
let tap = 1;
let score = 0;
let pattern = [];

function glowEffect(element, box) {
	switch (box) {
		case "green":
			element.style.backgroundColor = "lime";
			element.style.boxShadow = "-10px -10px 12px 0px rgba(0, 255, 0, 0.8)";
			break;
		case "red":
			element.style.backgroundColor = "rgb(255, 80, 80)";
			element.style.boxShadow = "10px -10px 12px 0px rgba(255, 80, 80, 0.8)";
			break;
		case "yellow":
			element.style.backgroundColor = "rgb(252, 255, 100)";
			element.style.boxShadow = "-10px 10px 12px 0px rgba(252, 255, 87, 0.8)";
			break;
		case "blue":
			element.style.backgroundColor = "cyan";
			element.style.boxShadow = "10px 10px 12px 0px rgba(101, 188, 225, 0.8)";
			break;
	}
}

function resetGlowEffect(element, box) {
	switch (box) {
		case "green":
			element.style.backgroundColor = "#3ecb74";
			element.style.boxShadow = "";
			break;
		case "red":
			element.style.backgroundColor = "#f52e16";
			element.style.boxShadow = "";
			break;
		case "yellow":
			element.style.backgroundColor = "#ece02e";
			element.style.boxShadow = "";
			break;
		case "blue":
			element.style.backgroundColor = "#38a0eb";
			element.style.boxShadow = "";
			break;
	}
}

function generatePattern() {
    pattern = [];

    for (let times = 1; times <= level; times++) {
        let index = Math.floor(Math.random() * 4);
        let element = document.querySelector("." + palette[index]);
        
        pattern.push(index);
        
        setTimeout(() => {
            glowEffect(element, palette[index]);
        }, 1000 * (times) + 100);
        
        setTimeout(() => {
            resetGlowEffect(element, palette[index]);
        }, 1000 * (times + 1));
    }
    console.log(pattern);
}

function playThisLevelAgain() {
    console.log("wrong pattern");
    //display lose message
    looseMessage.classList.remove("hide");

    setTimeout(() => {
        //reset the taps to level
        tap = level;
        taps.innerText = tap;
        //hide loseMessage
        looseMessage.classList.add("hide");
        //generate the pattern again
        generatePattern();
    }, 2000);
}

function gotoNextLevel() {
    //to display Taps left: 0
    taps.innerText = tap;
    //increase Level
    level++;
    //display win message
    winMessage.classList.remove("hide");

    setTimeout(() => {
        //set tap to level to show number of Taps left in this level
        tap = level;
        taps.innerText = tap;
        //increase the score and display it
        score++;
        currentScore.innerText = score;
        //hide win message
        winMessage.classList.add("hide");
        //generate pattern for next level
        generatePattern();
    }, 2000);
    
}

startGame.addEventListener("click", () => {
    startGame.innerText = "Game Started";
    generatePattern();
    startGame.disabled = true;

    document.addEventListener("click", (event) => {
        let color = event.target.classList[0];
    
        if(palette.includes(color)) {
            let originalChoice = pattern.shift();
            let userChoice = palette.indexOf(color);
    
            if(originalChoice != userChoice) {
                playThisLevelAgain();
            }
            else {
                tap--;
                taps.innerText = tap;
            }
            
            if(tap == 0){
                gotoNextLevel();
            }
        }
    });
});

