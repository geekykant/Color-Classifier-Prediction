let r, g, b;

function setup() {
  createCanvas(200, 200);
  setupBackgroundColor();
  let buttons = [];
  buttons.push(createButton('red-ish'));
  buttons.push(createButton('blue-ish'));
  buttons.push(createButton('green-ish'));
  buttons.push(createButton('purple-ish'));
  buttons.push(createButton('white-ish'));
  buttons.push(createButton('black-ish'));

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].mousePressed(sendData);
  }
}

function setupBackgroundColor() {
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r, g, b);
}

function sendData() {
  let data = {
    r: r,
    g: g,
    b: b,
    label: this.html()
  }

  console.log(data);
  setupBackgroundColor();
}
