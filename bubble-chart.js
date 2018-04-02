var bubbleData = null;

d3.csv('data/medium_january.csv', (error, data) => {
  if (error) {
    console.error('Error getting or parsing the data.');
    throw error;
  } else {
    bubbleData = data;
    createBubbleChart(data);
  }
});

var width = 960,
    height = 960,
    maxRadius = 6,
    columnForColors = 'category',
    columnForRadius = 'views';

function createBubbleChart (data) {

  var svg = d3.select('#bubble-chart')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .attr('style', 'border: solid 1px red;')

    var circle = svg.selectAll('circle')
                    .data(bubbleData, (d, i) => d);

    circle.enter().append('circle')
                  .attr('cy', (d, i) => 70 + (i * 25))
                  .attr('cx', (d, i) => 80)
                  .attr('r',  (d, i) => d.views / 100)
                  .attr('text', (d, i) => d.title)
                  .attr('class', d => d.category.toLowerCase().replace(/ /g, '-'))
}
