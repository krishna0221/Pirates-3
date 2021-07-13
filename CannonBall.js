class CannonBall{
    constructor(x,y){
  var options ={
      restitution:0.8,
      friction:0.1,
      density:0.4,
      isStatic:true
     
  }
  this.radius = 40
  this.body=Bodies.circle(x,y,this.radius,options)
  this.image = loadImage("assets/cannonball.png")
  this.trajectory = []
  World.add(world,this.body)
    }
    
    shoot(){
        var velocity = p5.Vector.fromAngle(cannon.angle)
        velocity.mult(15)
        Matter.Body.setStatic(this.body,false)
      Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y});
    }

    display(){
        var angle = this.body.angle
        var pos = this.body.position
        push();
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.image,0,0,this.radius,this.radius)
        pop();

//console.log(this.body.position)

       if (this.body.velocity.x>0 || this.body.position.x>300){
          var position = [this.body.position.x,this.body.position.y]
          this.trajectory.push(position)

        }
        for (var i = 0; i<this.trajectory.length; i++)
        {
          image(this.image, this.trajectory[i][0],this.trajectory[i][1],5,5)
        }

    }
}