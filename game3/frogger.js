/*
make things move on canvas
change things into cars
add background
make frogger move
add hitbox



*/
import Car from "./cars.js";
const carList = [];

var canvas, ctx;
var base_image = new Image();

var dx = 2;
var dy = -2;

function setUpCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // base_image.setAttribute("width", "40px");
    populateCars();
    runAndDrawCars();

}

function runAndDrawCars() {
    for (let index = 0; index < carList.length; index++) {
        const element = carList[index];
        console.log(element);
        base_image.src = element.src;
        if (index < carList.length) {
            const element = carList[index];

            ///  console.log(image.src);
        }
        // draw image at current position

    }
    animate();


}

window.onload = setUpCanvas;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    for (let i = 0; i < carList.length; i++) {
        let element = carList[i];
        //  myCircle.update();
        let image = new Image();
        image.src = element.src;
        ctx.drawImage(image, element.x, element.y, 50, 50);


        element.x += element.speed;
        if (element.x > 2000) {
            element.x = -100;
        }
    }
    requestAnimationFrame(animate) // loop

}

function populateCars() {
    console.log("pop cars");
    let car = new Car("Pictures/car2.png", 0, 0, false, 5);
    carList.push(car);
    car = new Car("Pictures/car2.png", 0, 90, false, 3);
    carList.push(car);
    car = new Car("Pictures/car2.png", 0, 700, false, 1);
    carList.push(car);
    car = new Car("Pictures/car2.png", 0, 240, false, 12);
    carList.push(car);
}