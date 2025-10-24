let durchmesser;
durchmesser=10;
// globale Variable
// let durchmesser = 10;

let farbwert;
farbwert = 0;



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(140,140,255, 60);


  //mouseX
  //mouseY

  fill(0,200,80);
  stroke(155, 255, 0);
  rectMode(CENTER)

  fill(30, 120, 120, 150);

  ellipse(mouseX, 300, durchmesser, durchmesser); //kreis

  durchmesser = durchmesser + 0.9; // vergrößern
  
  if (durchmesser > 200) {
    durchmesser = 10; // zurücksetzen
  }

  fill(10, farbwert, 120, 30); 
  rect(500, 300, 535, 535, 100); //grosses Rechteck

  fill(mouseX, 155);
  noStroke();

  triangle(400, mouseY, 200, 5, 50, 150,50);
}

function mouseClicked() {
  farbwert = farbwert + 40; 

  console.log(farbwert);


}// bei Klick erhöhen 
