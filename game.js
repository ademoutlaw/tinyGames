import Board from "./board.js";

export default class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.loading = true;
    }
    init(data, image){
        this.data = data;
        this.image = image;
        this.setLevel(data.level);
        this.loading = false;
    }
    setLevel(level){
        this.level = level;
        const multipoles = [];
        for (const multipole of this.data.maps[level]) {
            multipoles.push({
                model:this.data.multipoles[multipole.model],
                angle:multipole.angle,
                color:multipole.color
            });
        }
        console.log(multipoles);
        const size = {board:{width:500,height:500},multipole:{width:100,height:100}};
        this.board = new Board(this.image, multipoles, size);
    }
    draw(){
        if(this.loading)return;
        this.canvas.width = this.canvas.width
        // this.ctx.save();
        // this.ctx.scale();
        this.board.draw(this.ctx);
        // this.ctx.restore();
    }
    click(x, y){
        this.board.click(x, y);
    }
    show(x, y){
        this.board.show(x, y);
    }
}