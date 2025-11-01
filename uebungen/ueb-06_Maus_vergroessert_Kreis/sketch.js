function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  fill(0);
  stroke(255);

//

// Distanz des Zentrums der Ellipse zur Maus messen
let distanz = dist(mouseX, mouseY, width/2, height/2); // Abstand zwischen Maus und Mittelpunkt des Canvas
console.log(distanz);
durchmesser = map(distanz, 0, width/2, 10, 500); // je näher die Maus am Mittelpunkt, desto größer der Durchmesser
    ellipse(width/2, height/2, durchmesser, durchmesser);//


   for(let i=0; i<20; i=i+1 ){ // i++ ist das gleiche wie i = i+1
  let distanzNeu = dist(mouseX, mouseY, i*200, height/2); // Abstand zwischen Maus und Mittelpunkt der Ellipse
  let yPos = map(distanzNeu, 0, width, -300, 300); 
  // Plan Durchmesser der Ellipse abhängig von der Mausposition ändern
  // je weiter die Maus von der Ellipse entfernt ist, desto kleiner der Durchmesser
  let d = map(distanzNeu, 0, width, 400, 50);  
  // je näher die Maus an der Ellipse, desto größer der Durchmesser
    ellipse(i * 100, height / 2, 60, 60);
    ellipse(i * 100, height / 2 +yPos, d, d);

// Plan: Durchmesser der Ellipse abhängig von der Mausposition ändern
// wenn sich etwas ändern soll, muss es eine Variabel (let) geben



  }

  

}
