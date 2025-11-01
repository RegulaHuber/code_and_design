let drehwinkel = 0;
let bild; // Variable für das Bild

function preload() { // preload wird vor setup ausgeführt
  bild = loadImage("/lernjournal/lernjournal_aufgabe_01/Pacman.png"); // Bild wird geladen
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let ratio = width / bild.width; // Verhältnis berechnen, um das Bild proportional zu skalieren
  image(bild, 0, 0, bild.width*ratio, bild.height*ratio); // Bild als Hintergrund zeichnen

  //clear(); // Bildschirm löschen
  
  noStroke();
  push    ();
  rectMode(CENTER); // um die Mitte des Rechtecks als Bezugspunkt zu verwenden
  // Koordinatensystem verschoben und rotiert
  translate(width / 2-300, height / 2);
  rotate(drehwinkel);
  fill(200, 240, 0 );
  rect(0, 0, 200, 200);
stroke('magenta');
  strokeWeight(5);

  line(30, 20, 85, 75);

  pop     ();


  push    ();
  // Koordinatensystem verschoben und rotiert
  translate(width / 2, height / 2);
  rotate(-drehwinkel*2);
  fill(0, 240, 200);
  circle(50, 0, 200, 200);
  pop();

  push    ();
  rectMode(CENTER); // um die Mitte des Rechtecks als Bezugspunkt zu verwenden
  // Koordinatensystem verschoben und rotiert
  translate(width / 2+200, height / 2-50);
  rotate(-drehwinkel);
  fill(0, 200, 240);
  triangle(150, 150, 150, 0, 0, 150);

  pop     ();

  // Koordinatenszystem nach dem pop-Befehl wiederhergestellt



    drehwinkel = drehwinkel + 0.005;

}

function keyPressed() {
  if (key === 's' ) {
    saveCanvas('meinBild.png'); // Speichert das aktuelle Canvas als PNG-Datei
  }
  }

