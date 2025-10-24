let valueSlider;  // hier ausserhalb von setup klebt es in der Javascript-Welt // globale Variable
let newValueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);

valueSlider = createSlider(0, 400,400); // min, max, start  // Slider erstellen
valueSlider.position(width/2-70,height/2,);

newValueSlidervalueSlider = createSlider(0, 400,400); // min, max, start  // Slider erstellen
newValueSlidervalueSlider.position(width/2-70,height/2+50,);
}

function draw() {

// Variablen eigentlich immer ausserhalb der draw Funktion definieren (dass sie global sind und weiter benutzt werden können)

let inputValue = valueSlider.value(); // 0 bis 400
let inputMin= 0; // min Wert
let inputMax = 400; // max Wert

let outputMin = 0; // min Wert
let outputMax = 255;// max Wert

let outputValue= map(inputValue, inputMin, inputMax, outputMin, outputMax); // umrechnen von einem Bereich in einen anderen Bereich
console.log(outputValue); //



  background(outputValue); //Hintergrundfarbe von schwarz zu weiss je nach Mausposition

  let kreisoutputValue = map(inputValue, inputMin, inputMax, outputMin, outputMax); // umgekehrt für den Kreis
// background 0, kreis 255
// background 255, kreis 0
// background 125, kreis 125
// background 100, kreis 155

  fill(255-outputValue,); // Kreisfarbe von weiss zu schwarz je nach Mausposition
  strokeWeight(0+outputValue/10);
  stroke(200,0,200)
  ellipse(width/2,height/2,400,400)





}
