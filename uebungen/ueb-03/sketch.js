let posX = 0;
let posY = 0;

let threshold = 120; // windowWidth ist eine vordefinierte Variable in p5.js

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220, 1);

  if (posX < threshold) { //solange posX kleiner ist als threshold
    fill(255, 0, 0);  
  } else {               //ansonsten
    fill(0, 0, 255);  
    }             //ansonsten

// Zufallswert für y-Position
// frameCount ist eine vordefinierte Variable in p5.js
// % ist der Modulo-Operator (Rest einer Division)
// frameCount % 10 == 0 bedeutet also: "Jedes 10. Frame"
if(frameCount % 50 == 0)
  {posY += random(-80, 80);
}


rect(posX, height/2 +posY, 100, 100,);

posX = posX + 0.1; //posX wird um 1 erhöht


//  exakt gleich          posX === 350
//  grösser oder gleich   posX >= 350
//  kleiner oder gleich   posX <= 350
//  gleich                posX == 350 
//  ungleich              posX != 350 (trifft immer zu, außer posX hat den Wert 350)


if (posX < 350) { //falls Bedingung wahr ist, wird der Code ausgeführt
  posX = posX + 0.1; //stoppt die draw Schleife
} else {
  noLoop(); //stoppt die draw Schleife  

}}  

