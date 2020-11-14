/*
make things move on canvas
change things into cars
add background
make frogger move
add hitbox



*/

var canvas, ctx, x, y;
var base_image = new Image();

var dx = 2;
var dy = -2;

function setUpCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    x = 0;
    y = 0;
    base_image.setAttribute("width", "40px");
    //  base_image.height = 40 px;
    base_image.onload = animate;
    base_image.src = 'Pictures/car2.png';
}

setInterval(draw, 100);

window.onload = setUpCanvas;



function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // base_image.onload = function() {
    //     ctx.drawImage(base_image, x, y);
    // }
    //     ctx.beginPath();
    //     ctx.arc(x, y, 10, 0, Math.PI * 2);
    //     ctx.fillStyle = "#0095DD";
    //     ctx.fill();
    //     ctx.closePath();
    //     x += dx;
    //     y -= dy;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.drawImage(base_image, x, y); // draw image at current position
    x += 8;
    requestAnimationFrame(animate) // loop
}