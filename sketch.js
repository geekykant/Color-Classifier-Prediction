let r, g, b;

function setup() {
  createCanvas(200, 200);
	setupBackgroundColor();
	buttons = ['red-ish','blue-ish','yellow-ish','purple-ish','white-ish','green-ish'];
	button = createButton('submit');
	button.mousePressed(buttonClicked);
}

function setupBackgroundColor() {
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r, g, b);
}

function buttonClicked(){
	setupBackgroundColor();
}
