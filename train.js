class Train {
    constructor(){
        this.r = 75;
        this.x = width;
        this.y = height - this.r;
        this.crossed = false;
    }
    move() {
        this.x -= 11;
    }
    show(){
        image(tImg, this.x, this.y, this.r, this.r)
        //fill(255, 50);
        //ellipseMode(CORNER);
        //ellipse(this.x, this.y, this.r, this.r );
    }
}