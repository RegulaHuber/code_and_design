let posX = 0;
let posY = 0;

let threshold = 120; // windowWidth ist eine vordefinierte Variable in p5.js

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

// Bubble Welle

   for(let i=0; i<20; i=i+1 ){ // i++ ist das gleiche wie i = i+1
  let distanzNeu = dist(mouseX, mouseY, i*200, height/2); // Abstand zwischen Maus und Mittelpunkt der Ellipse
  let yPos = map(distanzNeu, 0, width, -300, 300); 
  // Plan Durchmesser der Ellipse abhängig von der Mausposition ändern
  // je weiter die Maus von der Ellipse entfernt ist, desto kleiner der Durchmesser
  let d = map(distanzNeu, 0, width, 400, 50);  
  // je näher die Maus an der Ellipse, desto größer der Durchmesser
    ellipse(i * 100, height / 2, 60, 60);
    ellipse(i * 100, height / 2 +yPos, d, d);



// Bubble Welle Ende








  fill(255, 0, mouseY); 

     //ansonsten

// Zufallswert für y-Position
// frameCount ist eine vordefinierte Variable in p5.js
// % ist der Modulo-Operator (Rest einer Division)
// frameCount % 10 == 0 bedeutet also: "Jedes 10. Frame"
if(frameCount % 20 == 0)
  {posY += random(-40, 40);
}




ellipse(posX, posY, 100, 100,);


posX = posX + 0.15; //posX wird um 1 erhöht


//  exakt gleich          posX === 350 
//  grösser oder gleich   posX >= 350
//  kleiner oder gleich   posX <= 350
//  gleich                posX == 350 
//  ungleich              posX != 350 (trifft immer zu, außer posX hat den Wert 350)


if (posX < 500) { //falls Bedingung wahr ist, wird der Code ausgeführt
  posX = posX + 0.15; //stoppt die draw Schleife
} else {
  noLoop(); //stoppt die draw Schleife  

}}  




