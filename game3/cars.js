//
/*










*/


//var cars;
class Car {
    constructor(src, x, y, isLeft, speed, width, height) {
        this.src = src;
        this.x = x
        this.y = y;
        this.isLeft = isLeft;
        this.speed = speed;
        this.width = width;
        this.height = height;

    }
    intersects(character) {
        return !(character.x + 1 > (this.x + this.width) ||
            (character.x + character.width - 1) < this.x ||
            character.y + 1 > (this.y + this.height) ||
            (character.y + character.height - 1) < this.y);
    }
    bumpCar(otherCar) {
        this.speed = otherCar.speed;
        if (this.x < otherCar.x) {
            this.x = this.x - otherCar.x - 3;
        } else {
            otherCar.x = otherCar.x - this.x - 3;

        }
        //   console.log("x: " + this.x);
    }
}




export default Car;