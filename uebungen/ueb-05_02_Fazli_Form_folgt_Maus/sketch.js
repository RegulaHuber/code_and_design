

//Slider für Hintergrundfarbe
let sliderFarbe;

//Slider für Eckenradius
let sliderEcken;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  //Slider mit Bereich und Startwert
  sliderFarbe = createSlider(0, 100, 0);
  sliderFarbe.position(20, 50);

  sliderEcken = createSlider(0, 15, 0);
  sliderEcken.position(20, 100);

}

function draw() {

  //Aktuelle Werte der Slider lesen
  let farbe = sliderFarbe.value();
  let radius = sliderEcken.value();

  //Hintergrundfarbe von Schwarz zu Weiss mappen
  let grau = map(farbe, 0, 100, 0, 255);
  background(grau);

  //Abstand der Maus zur Mitte
  let abstandX = (mouseX - width / 2) / 10;
  let abstandY = (mouseY - height / 2) / 10;

  //Farben der Formen definieren
  let blau = color(0, 200, 255);
  let pink = color(230, 0, 130);
  let white = color(255);


//

  fill(white);
  rect(width / 2, height / 2, 500, 500, radius);
  fill(blau);


//  for(let i=0; i<5; i=i+1 ){ // i++ ist das gleiche wie i = i+1

//  rect(width / 2 + abstandX * 1, height / 2 + abstandY * i, 250, 250, radius);

  for(let i=0; i<6; i=i+1){ 
    let faktor = 6-i// i++ ist das gleiche wie i = i+1  
    if (i % 2 == 0){
      fill(blau);
    } else {
      fill(pink);
    } 
    rect(width / 2 + abstandX * i, height / 2 + abstandY * i, faktor*50, faktor*50, radius);
  }


/*

// Schelifen-Zähler und Werte:

i - Faktor Breite Quadrat

0 - 6   -> 6-0  = 6
1 - 5   -> 6-1  = 5
2 - 4   -> 6-2  = 4
3 - 3   -> 6-3  = 3
4 - 2   -> 6-4  = 2 
5 - 1   -> 6-5  = 1

Modulo-Rechnung bei 2 (Restwert bei Division):

0 % 2 = 0, Rest 0
1 % 2 = 0, Rest 1
2 % 2 = 1, Rest 0
3 % 2 = 1, Rest 1
4 % 2 = 2, Rest 0
5 % 2 = 2, Rest 1
  


  //Formen in wechselnder Farbe gelistet
  fill(black);
  rect(width / 2, + abstand * 0, height / 2 + abstandY * 0, 6*50, 300, radius);

  fill(pink);
  rect(width / 2 + abstandX * 1, height / 2 + abstandY * 1, 5*50, 250, radius);

  fill(blau);
  rect(width / 2 + abstandX * 2, height / 2 + abstandY * 2, 4*50, 200, radius);

  fill(pink);
  rect(width / 2 + abstandX * 3, height / 2 + abstandY * 3, 3*50, 150, radius);

  fill(blau);
  rect(width / 2 + abstandX * 4, height / 2 + abstandY * 4, 2*50, 100, radius);

  fill(pink);
  rect(width / 2 + abstandX * 5, height / 2 + abstandY * 5, 1*50, 50, radius);

  */

  //Beschriftungen der Slider
  if (grau < 128) {
    fill(255); // heller Text auf dunklem Hintergrund
  } else {
    fill(0);   // dunkler Text auf hellem Hintergrund
  }

  textSize(12);
  text('Hintergrundfarbe', 160, 62);
  text('Eckenradius', 160, 112);


}
//Canvas an die Fenstergrösse anpassen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
