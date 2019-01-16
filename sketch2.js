let data;

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

  let labelsTensor = tf.tensor1d(labels,'int32');
  let ys = tf.oneHot(labelsTensor,9)
  labelsTensor.dispose();

  xs.print();
  ys.print();

  // console.log(xs.shape);
}
