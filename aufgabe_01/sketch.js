let valueSlider;  // hier ausserhalb von setup klebt es in der Javascript-Welt // globale Variable
let newValueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // erster Slider

valueSlider = createSlider(0, 400, 400); // min, max, start 
valueSlider.position(width/2-70,height/2-70,);

// zweiter Slider

newValueSlider = createSlider(0, 400, 400); // min, max, start
newValueSlider.position(width/2-70,height/2-10,);

// dritter Slider

thirdValueSlider = createSlider(0, 400, 400); // min, max, start
thirdValueSlider.position(width/2-70,height/2+50,);


}


function draw() {

// Wert vom Slider holen und umrechnen (Farbe von 0 bis 255)

let inputValue = valueSlider.value(); // 0 bis 400
let inputMin= 0; // min Wert
let inputMax = 400; // max Wert

let outputMin = 0; // min Wert
let outputMax = 255;// max Wert

let outputValue= map(inputValue, inputMin, inputMax, outputMin, outputMax); // umrechnen von einem Bereich in einen anderen Bereich
console.log(outputValue); //

// Wert vom zweiten Slider holen und umrechnen (Strichstärke von 0 bis 100)

let newInputValue = newValueSlider.value(); // 0 bis 400
let newInputMin= 0; // min Wert
let newInputMax = 400; // max Wert

let newOutputMin = 0; // min Wert
let newOutputMax = 20;// max Wert

let newOutputValue= map(newInputValue, newInputMin, newInputMax, newOutputMin, newOutputMax); // umrechnen von einem Bereich in einen anderen Bereich
console.log(newOutputValue); // 



  background(50);


  fill(255-outputValue,); // Kreisfarbe von weiss zu schwarz je nach Mausposition
  strokeWeight(0+newOutputValue);
  stroke(200,0,200)

  ellipse(width/2,height/2,300,300);
  arc(width/2,height/2-250, 100, 100, 120, PI + HALF_PI);
  triangle(width/2, height/2+100, width/2+280, height/2+280, width/2-280, height/2+280);







}
