import Shape from "./shape.js";

export default class Multipole{
    constructor(index, board, imageIndex, sides){
        // console.error(sides);
        this.index = index;
        this.board = board;
        this.width = board.multipoleSize.width;
        this.height = board.multipoleSize.height;
        this.angleIndex = 0;
        this.angle = 0;
        this.angleStep = Math.PI/20;
        this.sides = null;
        const nbrW = Math.floor(board.size.width/this.width);
        this.x = (index%nbrW)*this.width;
        this.y = Math.floor(index/nbrW)*this.width;
        this.isGrey = index%2;
        if(nbrW%2===0&&Math.floor(index/nbrW)%2){
            this.isGrey = ! this.isGrey;
        }
        this.shape = new Shape(board.image, imageIndex, this.isGrey);
        if(!sides)return;
        this.sides = [];
        for (let i = 0; i < 4; i++) {
            this.sides.push({isPole:false, connectTo:[], color:"000"})
        }
        for (let i = 0; i < sides.length; i++) {
            // console.log(" ------------------------------ ");
            const side = sides[i];
            if(side.length){
                this.sides[i].isPole = true;
                this.sides[i].connectTo.push(...side);
            }
        }
    }
    setAngle(angle){
        this.angleIndex = angle;
        this.angle = this.angleIndex*0.5*Math.PI;
        for (let i = 0; i < angle; i++) {
            const temp = this.sides[3];
            for (let i = 3; i >0; i--) {
                this.sides[i] = this.sides[i-1];
            }
            this.sides[0] = temp;
            for (const side of this.sides) {
                for (let j = 0; j < side.connectTo.length; j++) {
                    side.connectTo[j]=(side.connectTo[j]+1)%4;
                }
            }
        }
    }
    update(){
        if(!this.toRotate)return;
        this.angle+=this.angleStep;
        if(this.step++>10){
            this.toRotate = false;
            this._rotate();
        }
    }
    draw(ctx, rotate=false){
        if(rotate){
            this.update();
            ctx.save();
            ctx.translate(this.x, this.y);
            this.shape.fill(ctx);
            ctx.translate(this.width/2, this.height/2);
            ctx.rotate(this.angle);
            ctx.translate(-(this.width/2), -(this.height/2));
            this.shape.draw(ctx, true);
            ctx.restore();
            return;
        }
        if(this.toRotate)return;
        ctx.save();
        ctx.translate(this.x+(this.width/2), this.y+(this.height/2));
        ctx.rotate(this.angle);
        ctx.translate(-(this.width/2), -(this.height/2));
        this.shape.draw(ctx);
        ctx.restore();
    }
    rotate(){
        if(this.toRotate)return;
        this.toRotate = true;
        this.step = 0;
        this.test = true;
    }
    _rotate(){
        this.angleIndex = (this.angleIndex+1)%4;
        this.angle = this.angleIndex*0.5*Math.PI;
        const temp = this.sides[3];
        for (let i = 3; i >0; i--) {
            this.sides[i] = this.sides[i-1];
        }
        this.sides[0] = temp;
        for (const side of this.sides) {
            for (let j = 0; j < side.connectTo.length; j++) {
                side.connectTo[j]=(side.connectTo[j]+1)%4;
            }
        }
        this.board.endRotate();
    }
    unplug(){
        for (const side of this.sides) {
            side.color = "000";
        }
        this.shape.unplug();
    }
    show(){

    }
}