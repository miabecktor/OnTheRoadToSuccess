var bgcolor;
var button;
var slider;
var input;

function setup() {
  canvas = createCanvas(400, 300);
  bgcolor = color(200);
  //nameP = createP('Hvad ville du give af råd til de nyuddannede designere, som ikke ved hvad de skal tage sig til eller som føler sig usikre på deres muligheder og hvilken retning de skal gå?');
  button = createButton("go");
  button.mousePressed(changeColor);

  nameP.mouseOver(hello1);
  nameP.mouseOut(hello2);

  slider = createSlider(10, 100, 47);
  input = createInput('hello, whats up?')
}

function hello1(){
  nameP.html('your mouse is sexy')
}

function hello2(){
  nameP.html('your mouse is weird')
}

function changeColor() {
  bgcolor = color(random(255));
}

function draw() {
  background(bgcolor);
  fill (255, 0, 175);
  ellipse(100, 100, slider.value(), slider.value())
  text(input.value(), 10, 30);
}
