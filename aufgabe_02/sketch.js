// Sound laden und abspielen
let sound;

function preload() {
  sound = loadSound('cat.mp3');
}

function draw() {}

function mousePressed() {
  sound.play();
}

// Katze und Fisch mit interaktiver Grösse
let size = 100; // Startgrösse der Katze
let newSize = 80; // Startgrösse des Fisches

// Sternenhimmel
let stars = [];
const originStars = {x: 200, y: 200};

function setup() {
  createCanvas(windowWidth, windowHeight);
    noCursor(); // Versteckt den normalen Mauszeiger
    fill(100,100,100);
  
    const radius = (width ** 2 + height ** 2) ** 0.5 * 0.7;
  
    // Sternenhimmel
    for (let i = 0; i < 400; i++) {                  // Anzahl Sterne 
    stars.push({                                      // Objekt für jeden Stern
      x: random(radius * 2) - radius + originStars.x, // Zufällige Position
      y: random(radius * 2) - radius + originStars.y,                
      size: random(2, 5),                             // Zufällige Grösse
      baseBrightness: random(100, 255),               // Grundhelligkeit
      twinkleSpeed: random(0.005, 0.25),              // Funkeln
    });
    } 
}

// Rotationsgeschwindigkeit des Sternenhimmels
const rotationSpeed = 0.0005;

// Zeichnen der Szene
function draw() {
  background(10,20,80);

  //  Polarstern
  fill(255); // weiss
  circle(originStars.x, originStars.y, 4);

  // Sternenhimmel
   for (let s of stars) {
    // Funkeln durch Sinus
    push();
    let b = s.baseBrightness + 50 * sin(frameCount * s.twinkleSpeed); 
    translate(originStars.x, originStars.y);
    rotate(frameCount * -rotationSpeed);
    translate(-originStars.x, -originStars.y);
    fill(b);
    noStroke()
    circle(s.x, s.y, s.size);
    pop();
  }

  // Mausposition auf kleineren Bereich mappen
  let x = map(mouseX, 0, width, 150, 300);  // nur zwischen 150 und 250
  let y = map(mouseY, 0, height, 150, 300); // nur zwischen 150 und 250
  
  fill(255,230,150); // hellgelb
  circle(x, y, 150); // Mond

  fill(0,0,0); // schwarz
  rect(0, height/3*2, width, height); // Boden

  // KATZE
  push();                
  let zoom = size / 100;
  scale(zoom);
  translate(width/2-350,height/3*2-260);  

  // Schwanz
  stroke(255);
  strokeWeight(18);
  noFill();
  arc(260, 250, 100, 80, 0, PI / 1.5);

  // Farbe
  fill(255);
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

  stroke(0);
  let eyeY = 160, d = 30;     // Augenhöhe & Durchmesser
  let left = 180, right = 220; // Augenpositionen
  let r = 9;                 // Pupillenbewegungsradius

  // Augen
  fill(255);
  ellipse(left, eyeY, d);
  ellipse(right, eyeY, d);

  // Richtung zur Maus
  let dx = map(mouseX, 0, width, -r, r);
  let dy = map(mouseY, 0, height, -r, r);

  // Pupillen
  fill(0);
  ellipse(left + dx, eyeY + dy, 7,10);
  ellipse(right + dx, eyeY + dy, 7,10);

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
  

  // Fisch folgt Maus
  push();
  translate(mouseX, mouseY); // bewegt die ganze Gruppe
  drawFish(); // zeichnet den Fisch an der neuen Position
  pop();

}

function mouseClicked() {
  // Katze vergrössern
  size += 3;

  // Fisch verkleinern
  newSize -= 3;
  if (newSize < 5) {
    newSize = 5; // Mindestgröße
  }
}

function drawFish() {
  noStroke()

    push();                
  let zoomFish = newSize / 70;
  scale(zoomFish); // verkleinern

  // Schwanzflosse hinten
  fill(255, 120, 0);
  triangle(-20, 0, -60, -20, -60, 20); // triangel(x1, y1, x2, y2, x3, y3)
  
  // Schwanzflosse oben
  triangle(-30, 0, 0, -40, 30, 10); // triangel(x1, y1, x2, y2, x3, y3)

  // Körper

  fill(255, 150, 0);
  ellipse(0, 0, 75, 50);
  
  // Auge
  fill(255);
  circle(18, -10, 15); //circle(x, y, d)
  fill(0);
  circle(18, -10, 5);

  pop();
}
