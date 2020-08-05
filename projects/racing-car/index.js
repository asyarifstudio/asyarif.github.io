class Game {
    constructor(){
        this.canvas = document.getElementById("main-canvas");
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.context = this.canvas.getContext('2d');
        this.car = new Car(this.context, 40, 700 ,0,0.5);
    }

    update(){   
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.car.draw();
    }
}

class Car{
    constructor(context,x,y,angle,speed){
        this.context = context;
        this.height = 40;
        this.width = 30;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        document.addEventListener('keydown',(event)=>{
            this.move(event);
        })
    }

    draw(){
        this.context.save();
        this.context.translate(this.x,this.y)
        this.context.rotate(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        this.x += this.speed * Math.sin(this.angle);
        this.context.fillStyle = "#FF0000";
        this.context.fillRect(-this.width/2,-this.height/2,this.width, this.height);
        this.context.restore();
    }

    move(e){
        e = e || window.event;
        var move = [0,0];
        switch(e.keyCode){
            case 38: // up
                if(this.speed < 2.0) this.speed += 0.1;
                break;
            case 39: //right
                this.angle += Math.PI / 36;
                break;
            case 37: //left
                this.angle -= Math.PI / 36;
                break;
            case 40: //down
                if(this.speed > 0.0) this.speed -= 0.1;
                break;
        }
        
        
    }

}

var game = new Game();

setInterval(function(){game.update()},12);