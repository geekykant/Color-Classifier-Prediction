let data;

function preload() {
  data = loadJSON('colorData.json');
}

function setup() {
  let colors = [];
  console.log(data.entries.length);
}
