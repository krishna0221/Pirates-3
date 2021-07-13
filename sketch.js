
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
 var tower,boat;
var ground,cannon;
var backgroundImg;
var ball;
var balls = [];
var boats = [];


function preload(){
backgroundImg=loadImage("assets/background.gif")
}

function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle=-PI/4;
  tower=new Tower(150,350,160,350);
  ground = new Ground(600,590,1200,20);
  cannon = new Cannon(180,110,110,50,angle)
  //ball = new CannonBall(cannon.x,cannon.y)

  boat = new Boat(width,height-100,200,200,-100);
}


function draw() {
background(0);
image(backgroundImg,0,0,width,height)
Engine.update(engine);
tower.display();
ground.display();
cannon.display();

showBoat();
//Matter.Body.setVelocity(boat.body,{x:-0.9,y:0});

for (var i=0;i<balls.length;i++){
  showCannonBalls(balls[i],i);
  for(var j=0;j<boats.length;j++){
    if(balls[i]!==undefined && boats[j]!==undefined){
      var collision = Matter.SAT.collides(balls[i].body,boats[j].body);
      if(collision.collided){
      boats[j].remove(j)
      World.remove(world,balls[i].body)
      balls.splice(i,1)
      
      i--;
      }
      
    }
  }
}

}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}
 function keyPressed(){
if (keyCode === DOWN_ARROW){
var cannonBall = new CannonBall(cannon.x,cannon.y)
cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
balls.push(cannonBall);
}
 }

 function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height -50 ) {
    World.remove(world, ball.body);
    balls.splice(index, 1);
    }
  
}

function showBoat(){
if(boats.length>0){
  if(boats.length<4 && boats[boats.length-1].body.position.x<width-300){
    var positions = [-130,-100,-120,-80];
    var position = random(positions)
    var boat = new Boat(width,height-100,200,200,position)
    boats.push(boat)
  }
  for(var i = 0;i<boats.length;i++){
    Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0});
    boats[i].display()
  }
  }
  else{
    var boat=new Boat(width,height-100,200,200,-100)
    boats.push(boat)
  }
}