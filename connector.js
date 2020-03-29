import Multipole from "./multipole.js";

export default class Connector extends Multipole{
    constructor(index, board, imageIndex, sides){
        super(index, board, imageIndex, sides);
        this.sides[0].isColor1 = true;
        if(this.sides[0].connectTo.length===1){
            if(this.sides[0].connectTo[0]===3&&this.sides[1].connectTo[0]===2){
                this.sides[1].isColor2 = true;
                this.shape.selectColor2("color2");
            }else if(this.sides[0].connectTo[0]===2&&this.sides[1].connectTo[0]===3){
                this.sides[1].isColor2 = true;
                this.shape.selectColor2("color3");
            }
        }
    }
    pluged(side, color){
        // plug me---------------1
        // get pluged side 
        const plugedSide = this.sides[side];
        //check if it a pole and if it color is diffirent to new color and the new color is light
        if(!plugedSide.isPole || plugedSide.color===color || color==="000")return;
        const newColor = this._getColor(plugedSide.color, color);
        //change the color of the side and the other conected sides 
        plugedSide.color = newColor;
        for (const c of plugedSide.connectTo) {
            this.sides[c].color = newColor;
        }
        // set colors to shape 
        for (const s of this.sides) {
            if(s.isColor1){
                this.shape.setColor1(this.board.getColor(s.color));
            }else if(s.isColor2){
                this.shape.setColor2(this.board.getColor(s.color));
            }
        }
        // plug my neighbors ----------2
        // get neighbors
        const neighbors = this.board.getNeighbors(this.index);
        // for every side it connect to pluged side 
        for (const c of plugedSide.connectTo) {
            if(neighbors[c])
                neighbors[c].pluged((c+2)%4, newColor);
        }


        // if(this.test){
        //     console.log("pluged one", side);
        //     console.log("isPole", plugedSide.isPole);
        //     console.log("color", plugedSide.color);
        //     console.log("isColor1", plugedSide.isColor1);
        //     console.log("isColor2", plugedSide.isColor2);
        //     console.log("connectTo");
        //     console.log("........+++++..........");
        // }
        // for (const connectTo of plugedSide.connectTo) {
        //     if(this.sides[connectTo].isPole){
        //         this.sides[connectTo].color = newColor;
        //         
        //     }
        // }
        // let i = 0;
       
        //     if(this.test){
        //         console.log("side", i);
        //         console.log("isPole", s.isPole);
        //         console.log("color", s.color);
        //         console.log("isColor1", s.isColor1);
        //         console.log("isColor2", s.isColor2);
        //         console.log("connectTo");
        //         for (const c of s.connectTo) {
        //             console.log(c);
        //         }
        //     }
        //     i++;
            
        //     if(this.test)
        //     console.log("..................");
        // }













        

        // for (const connectTo of this.sides[0].connectTo) {
        //     if(neighbors[connectTo])
        // }
        // for (let i = 0; i < .length; i++) {
        //     const element = array[i];
            
        // }
    }
    _getColor(oldColor, newColor){
        let color = "";
        for (let i = 0; i < newColor.length; i++) {
            if(newColor[i]==="1"){
                color+=1;
            }else{
                color+=oldColor[i];
            }
        }
        return color;
    }
    show(){
        console.log(this.index);
        console.log(this.sides);
    }
}