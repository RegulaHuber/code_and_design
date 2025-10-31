let drehwinkel = 0;


function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);

  push    ();
  rectMode(CENTER); // um die Mitte des Rechtecks als Bezugspunkt zu verwenden
  // Koordinatensystem verschoben und rotiert
  translate(width / 2, height / 2);
  rotate(drehwinkel);
  fill(0, 0, 255);
  rect(0, 0, 200, 200);
  pop     ();


    push    ();
  // Koordinatensystem verschoben und rotiert
  translate(width / 2, height / 2);
  rotate(-drehwinkel*2);
  fill(0, 255, 255);
  circle(100, 0, 200, 200);
  pop     ();

  // Koordinatenszystem nach dem pop-Befehl wiederhergestellt



    drehwinkel = drehwinkel + 0.005;

}
