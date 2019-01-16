let data;
let model;

let xs, ys;

let lossP;
let labelP;
let rSlider, gSlider, bSlider;

function preload() {
  data = loadJSON('colorData.json');
}

let colorList = [
  'red-ish',
  'green-ish',
  'blue-ish',
  'orange-ish',
  'yellow-ish',
  'pink-ish',
  'purple-ish',
  'brown-ish',
  'grey-ish'
]

function setup() {
  labelP = createP('Label');
  lossP = createP('Loss');
  rSlider = createSlider(0, 255, 255);
  gSlider = createSlider(0, 255, 255);
  bSlider = createSlider(0, 255, 0);

  createCanvas(200, 200);

  let colors = [];
  let labels = [];
  for (let record of data.entries) {
    colors.push([record.r / 255, record.g / 255, record.b / 255]);
    labels.push(colorList.indexOf(record.label));
  }

  xs = tf.tensor2d(colors);

  let labelsTensor = tf.tensor1d(labels, 'int32');
  ys = tf.oneHot(labelsTensor, 9)
  labelsTensor.dispose();

  // xs.print();
  // ys.print();

  model = tf.sequential();

  let hidden = tf.layers.dense({
    units: 16,
    activation: 'sigmoid',
    inputDim: 3
  });
  let output = tf.layers.dense({
    units: 9,
    activation: 'softmax'
  });

  model.add(hidden);
  model.add(output);

  //optimizer function
  const lr = 0.2;
  const optimizer = tf.train.sgd(lr);

  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy'
  });

  train().then(results => {
    console.log(results.history.loss);
  });
  // console.log(xs.shape);
}

async function train() {
  const options = {
    epochs: 10,
    validationSplit: 0.1,
    shuffle: true,
    callbacks: {
      onTrainBegin: () => console.log("Training started"),
      onTrainEnd: () => console.log("Traing End"),
      onBatchEnd: tf.nextFrame,
      onEpochEnd: (num, logs) => {
        console.log('Epoch:' + num);
        lossP.html('Loss: ' + logs.val_loss);
        // console.log('Loss: ' + logs.loss);
      }
    }
  }

  return await model.fit(xs, ys, options);
}


function draw() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  background(r, g, b);

  tf.tidy(() => {
    const xs = tf.tensor2d([
      [r / 255, g / 255, b / 255]
    ]);

    let results = model.predict(xs);
    let index = results.argMax(1).dataSync()[0];

    let label = colorList[index];
    labelP.html(label);
  });
}
