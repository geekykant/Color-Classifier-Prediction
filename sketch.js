let r, g, b;

function setup() {
  createCanvas(200, 200);
	setupBackgroundColor();
}

function setupBackgroundColor() {
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r, g, b);
}
