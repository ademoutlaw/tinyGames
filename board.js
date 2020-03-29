import Connector from "./connector.js";
import Generator from "./generator.js";
import Lamp from "./lamp.js";
// import { Signer } from "crypto";

export default class Board{
    constructor(image, multipoles, size){
        this.multipoles = [];
        this.generators = [];
        this.lamps = [];
        this.size = size.board;
        this.multipoleSize = size.multipole;
        this.image = image;
        this.colors = {
            "000":"#c1c1c1",
            "001":"red",
            "010":"yellow",
            "100":"blue",
            "011":"orange",
            "101":"rebeccapurple",
            "110":"greenyellow",
            "111":"aqua",
        };
        let isGrey = true;
        console.log(multipoles);
        for (let i = 0; i < multipoles.length; i++) {
            const model = multipoles[i].model;
            let multipole;
            if(model.type === "connector"){
                multipole = new Connector(i, this, model.imageIndex, model.sides);
            }else if(model.type === "generator"){
                multipole = new Generator(i, this, model.imageIndex, model.sides, multipoles[i].color);
                this.generators.push(multipole);
            }else{
                multipole = new Lamp(i, this, model.imageIndex, multipoles[i].color);
                this.lamps.push(multipole);
            }
            multipole.setAngle(multipoles[i].angle);
            // multipole.setShape(image, multipoles[i].imageIndex, isGrey);
            this.multipoles.push(multipole);
            isGrey = !isGrey;
        }
        this.endRotate();
    }
    getColor(color){
        return this.colors[color];
    }
    draw(ctx){
        if(this.currentMultipole)this.currentMultipole.draw(ctx, true);
        for (const multipole of this.multipoles) {
            multipole.draw(ctx);
        }
    }
    click(x, y){
        if(this.busy)return;
        const nbrW = Math.floor(this.size.width/this.multipoleSize.width);
        const i = Math.floor(x/this.multipoleSize.width)+Math.floor(y/this.multipoleSize.height)*nbrW;
        this.currentMultipole = this.multipoles[i];
        this.multipoles[i].rotate();
        this.busy = true;
    }
    show(x, y){
        if(this.busy)return;
        const nbrW = Math.floor(this.size.width/this.multipoleSize.width);
        const i = Math.floor(x/this.multipoleSize.width)+Math.floor(y/this.multipoleSize.height)*nbrW;
        this.multipoles[i].show();
    }
    endRotate(){
        this.busy = false;
        for (const multipole of this.multipoles) {
            multipole.unplug();
        }
        for (const generator of this.generators) {
            generator.plug();
        }
        this.currentMultipole = null;
    }
    getNeighbors(index){
        const neighbors = [];
        const nbrW = Math.floor(this.size.width/this.multipoleSize.width);
        neighbors.push(index-nbrW>=0?this.multipoles[index-nbrW]:null);
        neighbors.push((index+1)%nbrW>0?this.multipoles[index+1]:null);
        neighbors.push(index+nbrW<this.multipoles.length?this.multipoles[index+nbrW]:null);
        neighbors.push((index)%nbrW>0?this.multipoles[index-1]:null);
        return neighbors;
    }
}