import Multipole from "./multipole.js";

export default class Generator extends Multipole{
    constructor(index, board, imageIndex, sides, color){
        super(index, board, imageIndex, sides);
        this.color = color;
        this.shape.setColor1(this.board.getColor(color));
        this.shape.setUnplugColor(this.board.getColor(color));
    }
    plug(){
        const neighbors = this.board.getNeighbors(this.index);
        for (let i = 0; i < this.sides.length; i++) {
            if(this.sides[i].isPole){
                if(neighbors[i])
                neighbors[i].pluged((i+2)%4, this.color);
            }
            
        }
    }
    pluged(){
        
    }
    unplug(){
    }
}