import Multipole from "./multipole.js";

export default class Lamp extends Multipole{
    constructor(index, board, imageIndex, color){
        super(index, board, imageIndex, null);
        this.side = 0;
        this.color = color;
        this.imageIndex = imageIndex;
        this.shape.setColor1(this.board.getColor(color));
        this.shape.setUnplugColor(this.board.getColor(color));
        this.shape.setOpacity(true);
    }
    unplug(){
        this.shape.setImageIndex(this.imageIndex);
        this.shape.setOpacity(true);
    }
    pluged(side, color){
        if(this.side!==side)return
        if(color===this.color){
            this.shape.setImageIndex(this.imageIndex+1);
            this.shape.setOpacity(false);
        }else{
            this.unplug();
        }
    }
    _rotate(){
        this.angleIndex = (this.angleIndex+1)%4;
        this.angle = this.angleIndex*0.5*Math.PI;
        this.side=(this.side+1)%4;
        this.board.endRotate();
    }
    setAngle(angle){
        this.angleIndex = angle;
        this.angle = this.angleIndex*0.5*Math.PI;
        for (let i = 0; i < angle; i++) {
            this.side=(this.side+1)%4;
        }
    }
    show(){
        console.log(this.side, this.color);
    }
}