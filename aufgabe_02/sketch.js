let size = 100; // Startgrösse

let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
    fill(100,100,100);

    
    // Sternenhimmel
for (let i = 0; i < 300; i++) {         // Anzahl Sterne 
    stars.push({                        // Objekt für jeden Stern
      x: random(width),                 // Zufällige Position
      y: random(height),                
      size: random(1, 3),               // Zufällige Grösse
      baseBrightness: random(100, 255), // Grundhelligkeit
      twinkleSpeed: random(0.01, 0.1),  // Funkelgeschwindigkeit
    });
}
}

function draw() {
  background(10,20,80);

    push();

  // Sternenhimmel
   for (let s of stars) {
    // Funkeln durch Sinus
    let b = s.baseBrightness + 50 * sin(frameCount * s.twinkleSpeed);
    fill(b);
    circle(s.x, s.y, s.size);
  }
    pop();

  fill(255,230,150); // hellgelb
  ellipse(width/2, height/2+100, 200, 200); // Mond 

  fill(0,0,0); // schwarz
  rect(0, height/3*2, width, height); // Boden


// Katze

  push();                

  let zoom = size / 100;
  scale(zoom);
  translate(width/2-500,height/3*2-260);  


 // Schwanz
  stroke(255);
  strokeWeight(18);
  noFill();
  arc(260, 250, 100, 80, 0, PI / 1.5);

  // Fellfarbe
  fill(255);
  noStroke();
  strokeWeight(1);

  // Körper
  ellipse(200, 260, 150, 100);

  // Kopf
  ellipse(200, 170, 120, 100);

  // Ohren
  fill(255, 180, 200);
  noStroke();
  triangle(168+40, 128, 185+40+10, 104, 188+40, 128+5);
  triangle(232-40, 128, 215-40-10, 104, 212-40, 128+5);

  // Augen
  fill(255);
  stroke(0);
  ellipse(180, 165, 25, 20);
  ellipse(220, 165, 25, 20);

  // Pupillen
  fill(0);
  ellipse(180, 165, 8, 15);
  ellipse(220, 165, 8, 15);

  // Nase
  fill(255, 150, 150);
  noStroke();
  triangle(195, 180, 205, 180, 200, 190);

  // Mund
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(195, 190, 10, 10, 0, PI / 2);
  arc(205, 190, 10, 10, PI / 2, PI);

  // Schnurrhaare
  stroke(0);
  strokeWeight(1);
  line(160, 185, 120, 180);
  line(160, 190, 120, 190);
  line(160, 195, 120, 200);
  line(240, 185, 280, 180);
  line(240, 190, 280, 190);
  line(240, 195, 280, 200);

  pop();  

}

function mouseClicked() {
  size += 2; // 
}

