/*
make things move on canvas
change things into cars
add background
make frogger move
add hitbox



*/
import Car from "./cars.js";
import Character from "./character.js";
var carList = [];

var canvas, ctx;
var character;
var score;

function setUpCanvas() {
    carList = [];
    score = 0;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    let characterImage = new Image();
    characterImage.src = "Pictures/frogger/frogger_forward.png";
    character = new Character(characterImage, (canvas.width / 2) - 50, (canvas.height - 50), 5, 50, 50);
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

function animate() {
    // console.log(character.y);

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("lives").innerText = "Lives: " + character.lives;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.drawImage(character.image, character.x, character.y, character.width, character.height);
    checkForCollisions();
    for (let i = 0; i < carList.length; i++) {
        let element = carList[i];
        ctx.drawImage(element.image, element.x, element.y, element.width, element.height);


        element.x += element.speed;
        if (element.x > 2000) {
            element.x = -100;
        }
    }
    boundaries();
    if (character.lives == 0) {
        endGame();


        return;
    }
    requestAnimationFrame(animate) // loop


}

function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    document.getElementById("lives").innerText = "Lives: " + character.lives;
}

function checkForCollisions() {
    for (let index = 0; index < carList.length; index++) {
        let element = carList[index];
        if (element.intersects(character)) {
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

function populateCars() {
    let image = new Image();
    image.src = "Pictures/cars/car2.png";
    let car = new Car(image, 0, 0, false, 5, 50, 50);
    carList.push(car);
    car = new Car(image, 0, 90, false, 3, 200, 50);
    carList.push(car);
    car = new Car(image, 0, 700, false, 1, 300, 300);
    carList.push(car);
    car = new Car(image, 0, 240, false, 12, 25, 25);
    carList.push(car);
}