import Game from "./game.js";

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
const game = new Game(canvas);
window.game = game;
window.shoIMG = true;
window.shoC1 = true;
window.shoC2 = true;
window.shoC3 = true;

function draw() {
    game.draw();
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
let isRed = true;
canvas.addEventListener('click', e=>{
    if(isRed){
        game.click(e.offsetX, e.offsetY);
    }else{
        game.show(e.offsetX, e.offsetY);
    }
})
document.body.addEventListener('keypress', ()=>{
    isRed = ! isRed;
    document.body.style.backgroundColor = isRed?"red":"green";
})
fetch('data.json').then(data=>data.json()).then(data=>{
    // console.error(data);
    data.level = 1;
    const image = new Image;
    image.onload = ()=>{
        game.init(data, image);
    }
    image.src = "multipoles.png";
});