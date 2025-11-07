let posX = 0;

let threshold = 120; // windowWidth ist eine vordefinierte Variable in p5.js

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  fill(0);
  noStroke();



  

fill(255,200,0); //gelb
let sonnengroesse = map(mouseX, 0, width, 50, 300);
ellipse(width/2, height/2+100, sonnengroesse, sonnengroesse); //Sonne 
//  ellipse(width / 2, height / 2, 190, 190);

fill(0,0,0);
rect(0, height/3*2, width, height); // Boden
fill(255);

  fill(255,20);
// rect(50, 50, 30, 30);
 


fill(255,50);
//ellipse(posX, mouseY, 10, 10,);
if(frameCount % 10 === 0){
wolke(posX, mouseY);
}
posX = posX + 0.2; //posX wird um 1 erhöht
}
function wolke(x,y){
  fill(255,20);
  stroke(0,0,255, 5);
  ellipse(x, y, 80, 80);
  ellipse(x+random(30), y-random(20), 100, 100);
  ellipse(x+random(60), y, 50, 50);
}


