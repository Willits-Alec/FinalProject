/*
make things move on canvas
change things into cars
add background
make frogger move
add hitbox



*/
import Car from "./cars.js";
import Character from "./character.js";
import Background from "./background.js";
import { qs, saveToLS, getFromLS } from './utilities.js';

var carList = [];
var backgroundList = [];

var canvas, ctx;
var character;
var score;
var levelScore;
var currentLevel;
var characterImage = new Image();
var gameGoing = false;
var highScores = [];


canvas = document.getElementById("canvas");



ctx = canvas.getContext("2d");
highScores = loadScore("scores");
if (highScores == null) {
    highScores = [];
}
highScores.sort((a, b) => b - a); // For ascending sort
displayScores();
console.log(highScores);
let x = new Image();
x.src = "Pictures/start.png";
if (x.complete) {
    ctx.drawImage(x, rect.x, rect.y, rect.width, rect.height);
} else {
    x.onload = function() {
        ctx.drawImage(x, rect.x, rect.y, rect.width, rect.height);
    };
}
console.log(x);
// ctx.drawImage(x, rect.x, rect.y, rect.width, rect.height);

function startGame() {
    window.scrollTo(0, 300);
    gameGoing = true;
    currentLevel = 1;
    carList = [];
    backgroundList = [];
    roadY = [];
    score = 0;
    levelScore = 0;

    characterImage.src = "Pictures/frogger/frogger_forward.png";
    character = new Character(characterImage, (canvas.width / 2) - 50, 750, 5, 50, 50);
    addBackground();
    populateCars();
    animate();
}
document.getElementsByTagName("body")[0].addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        characterImage.src = "Pictures/frogger/frogger_forward.png";

        character.y -= 50;

        updateScore(10);


    } else if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        characterImage.src = "Pictures/frogger/frogger_backward.png";

        character.y += 50;

        updateScore(-10);


    } else if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        characterImage.src = "Pictures/frogger/frogger_right.png";

        character.x += 50;

    } else if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        characterImage.src = "Pictures/frogger/frogger_left.png";

        character.x -= 50;

    }
});



function updateScore(c) {
    if (character.y <= 750 && character.y >= 0) {
        levelScore += c;
        score += c;
    }
    console.log("score is " + score);
    console.log("level score is " + levelScore);


}

function animateBackground() {
    let grass = new Image();
    grass.src = "Pictures/background/grass.jpg";
    ctx.drawImage(grass, 0, 0, 800, 800);

    for (let i = 0; i < backgroundList.length; i++) {

        let element = backgroundList[i];
        ctx.drawImage(element.image, element.x, element.y, element.width, element.height);

    }
}

function animateCars() {
    for (let i = 0; i < carList.length; i++) {
        let element = carList[i];
        let e = new Image();
        e.src = element.src;
        ctx.drawImage(e, element.x, element.y, element.width, element.height);

        element.x += element.speed;
        if (element.x > 1000) {
            element.x = -100;
        }
    }
}

function animate() {

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("lives").innerText = "Lives: " + character.lives;

    // ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    animateBackground();

    ctx.drawImage(character.image, character.x, character.y, character.width, character.height);
    checkForCollisions();
    animateCars();
    checkForBumping();
    boundaries();
    if (character.lives == 0) {
        endGame();
        return;
    }
    if (character.y <= 0) {
        console.log("change level");
        changeLevel();
        return;
    }
    requestAnimationFrame(animate) // loop


}

function changeLevel() {
    character.y = 750;
    currentLevel++;
    console.log(currentLevel);
    levelScore = 0;
    carList = [];
    backgroundList = [];
    roadY = [];
    addBackground();
    populateCars();
    animate();
}

function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    let ch = new Image();
    ch.src = "Pictures/game_over.png";
    console.log(ch);
    // game over screen
    document.getElementById("lives").innerText = "Lives: " + character.lives;
    document.getElementById("score").innerText = "Score: " + score;
    if (ch.complete) {
        ctx.drawImage(ch, rect.x, rect.y, rect.width, rect.height);
    } else {
        ch.onload = function() {
            ctx.drawImage(ch, rect.x, rect.y, rect.width, rect.height);
        };
    }
    if (highScores == null) {
        highScores = [];
    }
    highScores.push(score);
    console.log(highScores);
    saveScore("scores");
    displayScores();
    gameGoing = false;

}

function displayScores() {
    let ulScores = document.getElementById("HighScores");
    ulScores.innerHTML = "High Scores: ";
    for (let index = 0; index < highScores.length; index++) {
        const element = highScores[index];
        let liScore = document.createElement("li");
        liScore.innerHTML = element;
        ulScores.appendChild(liScore);

    }
}

function checkForBumping() {
    console.log("checking for bumping");
    for (let i = 0; i < carList.length; i++) {
        for (let j = 0; j < carList.length; j++) {
            if (carList[i].intersects(carList[j]) && i != j) {
                console.log("intersect!");
                carList[i].bumpCar(carList[j]);
            }
        }
    }
}

function checkForCollisions() {
    for (let index = 0; index < carList.length; index++) {
        let element = carList[index];
        if (element.intersects(character)) {
            if (character.lives > 1) {
                score -= levelScore;
                levelScore = 0;

            }
            character.collision();

        }


    }
}



function boundaries() {
    if (character.x >= 800) {
        character.x = 750;
    }
    if (character.y >= 800) {
        character.y = 750;
    }
    if (character.y <= 0) {
        character.y = 0;
    }
    if (character.x <= 0) {
        character.x = 0;
    }
}
var roadY = [];

function addBackground() {
    let image = new Image();

    image.src = "Pictures/background/road.png";
    for (let index = 0; index < Math.floor(Math.random() * 10) + 7; index++) {
        let y = Math.floor((Math.random() * 14) + 1) * 50;
        console.log("y is " + y);
        let s = new Background(image, -10, y, "Road", 820, 50);
        roadY.push(y);
        backgroundList.push(s);
    }
    let chum = new Image();
    chum.src = "Pictures/background/sidewalk.png";
    let s = new Background(chum, -10, 0, "Sidewalk", 820, 40);
    backgroundList.push(s);
    s = new Background(chum, -10, 760, "Sidewalk", 820, 40);
    backgroundList.push(s);


    let badIndex = checkIfArrayIsUnique(roadY);

    while (badIndex != -1) {
        backgroundList[badIndex].y = Math.floor((Math.random() * 14) + 1) * 50;
        roadY[badIndex] = backgroundList[badIndex].y;
        badIndex = checkIfArrayIsUnique(roadY);
    }

}



function populateCars() {
    carList = [];
    let som = new Image();

    let numCars = Math.floor(Math.random() * 15) + 13;
    for (let index = 0; index < numCars; index++) {
        som.src = "";
        let carSrc = Math.floor(Math.random() * 10) + 1;

        const randomElement = roadY[Math.floor(Math.random() * roadY.length)];
        let speed = Math.floor(Math.random() * 7) + 3;
        console.log("speed" + speed);
        carList.push(new Car("Pictures/cars/" + carSrc + "_left.png", Math.floor(Math.random() * 15) * 50, randomElement, false, speed, 100, 50));
    }

}


function checkIfArrayIsUnique(myArray) {
    for (var i = 0; i < myArray.length; i++) {
        for (var j = 0; j < myArray.length; j++) {
            if (i != j) {
                if (myArray[i] == myArray[j]) {
                    return i; // means there are duplicate values
                }
            }
        }
    }
    return -1; // means there are no duplicate values.
}





//save to local storage
function saveScore(key) {
    console.log("saving");
    saveToLS(key, highScores);
}

function loadScore(key) {
    console.log("loading");
    return getFromLS(key);
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
}


canvas.addEventListener('click', function(evt) {


    var mousePos = getMousePos(canvas, evt);
    console.log(mousePos);
    if (isInside(mousePos, rect)) {
        if (gameGoing == false) {
            startGame();
        }
    }
}, false);

//The rectangle should have x,y,width,height properties
var rect = {
    x: 200,
    y: 250,
    width: 400,
    height: 200
};


//Binding the click event on the canvas