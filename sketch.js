// Initialize Firebase
var config = {
  apiKey: "AIzaSyBWjFsIIjpmicV8Ku9EyCBGNNWaGQlGqV8",
  authDomain: "colorclassifier-aabae.firebaseapp.com",
  databaseURL: "https://colorclassifier-aabae.firebaseio.com",
  projectId: "colorclassifier-aabae",
  storageBucket: "colorclassifier-aabae.appspot.com",
  messagingSenderId: "1017706919204"
};
firebase.initializeApp(config);
var database = firebase.database();

let r, g, b;

function setup() {
  createCanvas(200, 200);
  setupBackgroundColor();
  let buttons = [];
  buttons.push(createButton('red-ish'));
  buttons.push(createButton('blue-ish'));
  buttons.push(createButton('green-ish'));
  buttons.push(createButton('violet-ish'));
  buttons.push(createButton('orange-ish'));
  buttons.push(createButton('yellow-ish'));
  buttons.push(createButton('pink-ish'));
  buttons.push(createButton('brown-ish'));

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].mousePressed(sendData);
  }

  // var ref2 = database.ref("colors");
  // ref2.on("value", gotData, errData);

  var count = {
    'red-ish': 0,
    'blue-ish': 0,
    'green-ish': 0,
    'violet-ish': 0,
    'orange-ish': 0,
    'yellow-ish': 0,
    'pink-ish': 0,
    'brown-ish': 0
  }

  function errData() {
    console.log("error");
  }

  function gotData(data) {
    var colors = data.val();
    // Grab the keys to iterate over the object
    var keys = Object.keys(colors);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var color = colors[key];
      count[color['label']]++;
    }
    console.log(count);
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

  var ref = database.ref('colors');
  ref.push(data, finished);

  console.log(data);

  function finished(error) {
    if (error) {
      console.log('ooops');
    } else {
      console.log('data saved!');
    }
  }

  setupBackgroundColor();
}
