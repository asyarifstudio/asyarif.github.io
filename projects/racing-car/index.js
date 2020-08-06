class Game {
    constructor(){
        this.canvas = document.getElementById("main-canvas");
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.context = this.canvas.getContext('2d');
        this.car = new Car(this.context, 40, 700 ,Math.PI/4,4);
        this.track = new Track(this.context);
        
    }

    update(){   
        //check everything here
        this.car.update();


        //do the drawing
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        this.car.draw();
        this.track.draw();
    }

    draw(){
        this.context.beginPath();
        for(var x = 10;x<this.canvas.width;x+=10){
            this.context.moveTo(x,0);
            this.context.lineTo(x,this.canvas.height);
        }
        for(var y = 10;y<this.canvas.height;y+=10){
            this.context.moveTo(0,y);
            this.context.lineTo(this.canvas.width,y);
        }
        
        this.context.strokeStyle = "#ddd";
        this.context.stroke();
    }

}

class Track{
    constructor(context){
        this.context = context;
        this.outerLines = [{x:200,y:500},{x:200,y:400},{x:400,y:200},{x:800,y:200},{x:1000,y:400},{x:1000,y:500},{x:800,y:700},{x:400,y:700},{x:200,y:500}];
        this.innerLines = [{x:300,y:500},{x:300,y:400},{x:400,y:300},{x:800,y:300},{x:900,y:400},{x:900,y:500},{x:800,y:600},{x:400,y:600},{x:300,y:500}];
    }

    isImpact(car){
        //we need to create car line of the square

    }

    draw(){
        this.context.save();
        this.context.beginPath();
        for(var i =0;i<this.innerLines.length;i++){
            if(i==0){
                this.context.moveTo(this.innerLines[i].x,this.innerLines[i].y);
            }
            else{
                this.context.lineTo(this.innerLines[i].x,this.innerLines[i].y);
            }
        }

        for(var i =0;i<this.outerLines.length;i++){
            if(i==0){
                this.context.moveTo(this.outerLines[i].x,this.outerLines[i].y);
            }
            else{
                this.context.lineTo(this.outerLines[i].x,this.outerLines[i].y);
            }
        }
        this.context.strokeStyle = "#000";
        this.context.stroke();

        this.context.restore();
    }

   
}

class Car{
    constructor(context,x,y,angle,maxSpeed){
        this.context = context;
        this.height = 40;
        this.width = 30;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.maxSpeed = maxSpeed;
        this.speed = 0;
        document.addEventListener('keydown',(event)=>{
            this.move(event);
        })
        this.update();

    }

    update(){
        this.y -= this.speed * Math.cos(this.angle);
        this.x += this.speed * Math.sin(this.angle);

        this.point = [];
        var s = Math.sin(this.angle);
        var c = Math.cos(this.angle);
        var h = this.height/2;
        var w = this.width/2;
        var x1,y1,x2,y2;
        
        //top right
        x1 = h*s;
        y1 = h*c;
        x2 = w*c;
        y2 = w*s;

        //top right
        this.point.push({x:this.x + x1+x2,y:this.y-y1+y2});
        //bottom right;
        this.point.push({x:this.x-x1+x2,y:this.y+y1+y2});
        //bottom left
        this.point.push({x:this.x-x1-x2,y:this.y+y1-y2});
        //top left
        this.point.push({x:this.x+x1-x2,y:this.y-y1-y2});

    }

    draw(){
        
        console.log(this.point);
        console.log(this.angle*180/Math.PI);

        this.context.save();
        this.context.translate(this.x,this.y)
        this.context.rotate(this.angle);
        this.context.fillStyle = "#FF0000";
        this.context.fillRect(-this.width/2,-this.height/2,this.width, this.height);
        this.context.restore();

        this.context.beginPath();
        this.context.moveTo(this.point[0].x,this.point[0].y);
        this.context.lineTo(this.point[1].x,this.point[1].y);
        this.context.lineTo(this.point[2].x,this.point[2].y);
        this.context.lineTo(this.point[3].x,this.point[3].y);
        this.context.closePath();
        this.context.strokeStyle = "#000";
        this.context.stroke();

        
    }
    /**
     * steer to x degree relative to current orientation
     * @param {number} degree degree in radian
     */
    steer(degree){
        this.angle += degree;
    }

    /**
     * accelerate the speed by 0.1
     */
    accelerate(){
        if(this.speed < this.maxSpeed){
            this.speed += 0.1;
        }
    }
    
    /**
     * decrease the speed by 0.5
     */
    brake(){
        if(this.speed > 0.5 ){
            this.speed -= 0.5
        }
        else{
            this.speed = 0;
        }
    }

    move(e){
        e = e || window.event;
        var move = [0,0];
        switch(e.keyCode){
            case 38: // up
                this.accelerate()
                break;
            case 39: //right
                this.steer(Math.PI / 36);
                break;
            case 37: //left
                this.steer(-Math.PI / 36);
                break;
            case 40: //down
                this.brake();
                break;
        }
        
        
    }

}

const game = new Game();
const run = function(){
    game.update();
    window.requestAnimationFrame(run);
}

window.requestAnimationFrame(run);