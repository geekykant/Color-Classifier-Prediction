let data;
let model;

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
  let colors = [];
  let labels = [];
  for (let record of data.entries) {
    colors.push([record.r / 255, record.g / 255, record.b / 255]);
    labels.push(colorList.indexOf(record.label));
  }

  let xs = tf.tensor2d(colors);

  let labelsTensor = tf.tensor1d(labels, 'int32');
  let ys = tf.oneHot(labelsTensor, 9)
  labelsTensor.dispose();

  xs.print();
  ys.print();

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

  const options = {
    epochs: 3
  }

  model.fit(xs, ys, options).then(results => {
    console.log(results.history.loss);
  });

  // console.log(xs.shape);
}
