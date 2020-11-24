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

var carList = [];
var backgroundList = [];

var canvas, ctx;
var character;
var score;
var levelScore;
var currentLevel;
var characterImage = new Image();

function setUpCanvas() {
    canvas = document.getElementById("canvas");
    currentLevel = 1;
    carList = [];
    backgroundList = [];
    roadY = [];
    score = 0;
    levelScore = 0;
    ctx = canvas.getContext("2d");

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


document.getElementById("start").addEventListener('click', setUpCanvas);

function updateScore(c) {
    if (character.y <= 750 && character.y >= 0) {
        levelScore += c;
        score += c;
    }
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
        if (element.x > 2000) {
            element.x = -100;
        }
    }
}

function animate() {

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("lives").innerText = "Lives: " + character.lives;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    animateBackground();

    ctx.drawImage(character.image, character.x, character.y, character.width, character.height);
    checkForCollisions();
    animateCars();
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
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    // game over screen
    document.getElementById("lives").innerText = "Lives: " + character.lives;
    document.getElementById("score").innerText = "Score: " + score;

}

function checkForCollisions() {
    for (let index = 0; index < carList.length; index++) {
        let element = carList[index];
        if (element.intersects(character)) {
            score -= levelScore;
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
    for (let index = 0; index < Math.floor(Math.random() * 10) + 3; index++) {
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
        backgroundList[badIndex].y = Math.floor(Math.random() * 15) * 50;
        roadY[badIndex] = backgroundList[badIndex].y;
        badIndex = checkIfArrayIsUnique(roadY);
    }

}



function populateCars() {
    carList = [];
    let som = new Image();

    let numCars = Math.floor(Math.random() * 15) + 3;
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

// function getMousePos(canvas, event) {
//     var rect = canvas.getBoundingClientRect();
//     return {
//         x: event.clientX - rect.left,
//         y: event.clientY - rect.top
//     };
// }
// //Function to check whether a point is inside a rectangle
// function isInside(pos, rect) {
//     return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
// }


// //The rectangle should have x,y,width,height properties
// var rect = {
//     x: 250,
//     y: 350,
//     width: 200,
//     height: 100
// };
// //Binding the click event on the canvas
// canvas.addEventListener('click', function(evt) {
//     var mousePos = getMousePos(canvas, evt);
//     console.log(mousePos);
//     if (isInside(mousePos, rect)) {
//         setUpCanvas();
//     }
// }, false);