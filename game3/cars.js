//
/*










*/


//var cars;
class Car {
    constructor(image, x, y, isLeft, speed, width, height) {
        this.image = image;
        this.x = x
        this.y = y;
        this.isLeft = isLeft;
        this.speed = speed;
        this.width = width;
        this.height = height;

    }
    intersects(character) {
        return !(character.x > (this.x + this.width) ||
            (character.x + character.width) < this.x ||
            character.y > (this.y + this.height) ||
            (character.y + character.height) < this.y);
    }
}




export default Car;