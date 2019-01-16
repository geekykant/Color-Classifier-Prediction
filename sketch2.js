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

  console.log(labels);
}
