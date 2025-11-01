
function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(0, 50);
  noFill();
  stroke(255);


  for(let i=0; i<5; i=i+1 ){ // i++ ist das gleiche wie i = i+1
  console.log(i)
  ellipse(i * 200, height / 2, 200, 200);
  }
 
  /*
  
  let i = 0;

  //Studiere mal den Code ab hier. Welche Blöcke wiederholen sich?
  //Welche Werte verändern sich?

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);

  */

}
