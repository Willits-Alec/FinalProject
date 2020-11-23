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

function setUpCanvas() {
    canvas = document.getElementById("canvas");

    carList = [];
    score = 0;
    ctx = canvas.getContext("2d");

    let characterImage = new Image();
    characterImage.src = "Pictures/frogger/frogger_forward.png";
    character = new Character(characterImage, (canvas.width / 2) - 50, (canvas.height - 50), 5, 50, 50);
    addBackground();
    populateCars();
    animate();
    document.getElementsByTagName("body")[0].addEventListener("keydown", function(e) {
        console.log("key is " + e.key);
        if (e.key === "ArrowUp" || e.key === "w") {
            e.preventDefault();
            characterImage.src = "Pictures/frogger/frogger_forward.png";
            updateScore(10);
            character.y -= 50;

        } else if (e.key === "ArrowDown" || e.key === "s") {
            e.preventDefault();
            updateScore(-10);
            characterImage.src = "Pictures/frogger/frogger_backward.png";

            character.y += 50;

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

}



document.getElementById("start").addEventListener('click', setUpCanvas);

function updateScore(c) {
    if (character.y < 750 && character.y > 0) {
        score += c;
    }
}

function animateBackground() {
    for (let i = 0; i < backgroundList.length; i++) {

        let element = backgroundList[i];
        console.log(backgroundList.length);
        ctx.drawImage(element.image, element.x, element.y, element.width, element.height);

    }
}

function animateCars() {
    for (let i = 0; i < carList.length; i++) {
        let element = carList[i];
        ctx.drawImage(element.image, element.x, element.y, element.width, element.height);


        element.x += element.speed;
        if (element.x > 2000) {
            element.x = -100;
        }
    }
}

function animate() {
    // console.log(character.y);

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("lives").innerText = "Lives: " + character.lives;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    animateBackground();

    ctx.drawImage(character.image, character.x, character.y, character.width, character.height);
    checkForCollisions();
    animateCars();
    boundaries();
    if (character.lives == 0) {
        // score = 0;
        endGame();


        return;
    }
    requestAnimationFrame(animate) // loop


}

function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    document.getElementById("lives").innerText = "Lives: " + character.lives;
    document.getElementById("score").innerText = "Score: " + score;

}

function checkForCollisions() {
    for (let index = 0; index < carList.length; index++) {
        let element = carList[index];
        if (element.intersects(character)) {
            score = 0;
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
var allY = [];

function addBackground() {
    let image = new Image();

    image.src = "Pictures/background/road.png";

    let s = new Background(image, 0, Math.floor(Math.random() * 15) * 50, "Road", 800, 50);
    backgroundList.push(s);

    s = new Background(image, 0, Math.floor(Math.random() * 15) * 50, "Road", 800, 50);
    backgroundList.push(s);

    s = new Background(image, 0, Math.floor(Math.random() * 15) * 50, "Road", 800, 50);
    backgroundList.push(s);

    s = new Background(image, 0, Math.floor(Math.random() * 15) * 50, "Road", 800, 50);
    backgroundList.push(s);
    for (let index = 0; index < backgroundList.length; index++) {
        const element = backgroundList[index];
        allY.push(element.y);
    }
    let badIndex = checkIfArrayIsUnique(allY);
    console.log("badINdex is : " + badIndex);

    while (badIndex != -1) {
        backgroundList[badIndex].y = Math.floor(Math.random() * 15) * 50;
        allY[badIndex] = backgroundList[badIndex].y;
        badIndex = checkIfArrayIsUnique(allY);
    }
    console.log("badINdex is : " + badIndex);

}



function populateCars() {
    let image = new Image();
    image.src = "Pictures/cars/car2.png";
    let car = new Car(image, 0, 0, false, 5, 50, 50);
    carList.push(car);
    car = new Car(image, 0, 90, false, 3, 200, 50);
    carList.push(car);
    car = new Car(image, 0, 400, false, 1, 50, 50);
    carList.push(car);
    car = new Car(image, 0, 240, false, 12, 25, 25);
    carList.push(car);
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