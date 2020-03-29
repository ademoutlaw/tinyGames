export default class Shape{
    constructor(image, imageIndex, isGrey){
        this.imgX = imageIndex*100;
        this.imgY = isGrey?100:0;
        this.img = image;
        this.bgColor = isGrey?"grey":"white";
        
        this.unPlugColor = "#c1c1c1";
        this.color1 = "#c1c1c1";
        this.color2 = null;
        this.color3 = null;
    }
    setImageIndex(imageIndex){
        this.imgX = imageIndex*100;
    }
    setOpacity(opacity){
        this.opacity = opacity;
    }
    setUnplugColor(color){
        this.unPlugColor = color;
    }
    selectColor2(color){
        if(color==="color2"){
            this.color2 = this.unPlugColor;
        }else{
            this.color3 = this.unPlugColor;
        }
    }
    setColor1(color){
        this.color1 = color;
    }
    setColor2(color){
        if (this.color2) {
            this.color2 = color;
        }else if (this.color3) {
            this.color3 = color;
        }
    }
    fill(ctx){
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, 100, 100);
    }
    draw(ctx, rotate=false){
        if(this.opacity){
         ctx.globalAlpha = 0.7;
        }
        if(!rotate){
            ctx.fillStyle = this.color1;
            // ctx.fillRect(0, 40, 100, 20);
            // ctx.fillRect(40, 0, 20, 100);
            // ctx.fillStyle = this.bgColor;
            if(window.shoC1)
            ctx.fillRect(0, 0, 100, 100);
            // ctx.lineWidth = 5;
            // ctx.strokeRect(0, 0, 100, 100);
            if(this.color2){
                if(window.shoC2){
                ctx.fillStyle = this.color2;
                ctx.beginPath();
                ctx.moveTo(100, 0);
                ctx.lineTo(100, 100);
                ctx.lineTo(0, 100);
                ctx.lineTo(100, 0);
                ctx.fill();
                }
            }else if(this.color3){
                if(window.shoC3){

                    ctx.fillStyle = this.color3;
                    // ctx.beginPath();
                    ctx.fillRect(0, 40, 44, 20);
                    ctx.fillRect(56, 40, 44, 20);
                    ctx.fillRect(40, 40, 20, 10);
                }
            }
            
        }else{
            // ctx.fillStyle = "red";
            ctx.fillStyle = this.unPlugColor;
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, 2*Math.PI);
            ctx.fill();
            ctx.strokeStyle = this.bgColor;
            ctx.strokeRect(0, 0, 100, 100);
        }
        ctx.globalAlpha = 1;
        if(window.shoIMG)
        ctx.drawImage(this.img, this.imgX, this.imgY,100, 100, 0, 0, 100, 100);
    }
    unplug(){
        this.color1 = this.unPlugColor;
        if(this.color2){
            this.color2 = this.unPlugColor;
        }else if(this.color3){
            this.color3 = this.unPlugColor;
        }
    }

}