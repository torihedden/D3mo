var bubbleData = null;

d3.csv('data/medium_january.csv', function(error, data) {
  if (error) {
    console.error('Error getting or parsing the data.');
    throw error;
  } else {
    bubbleData = data;
    console.log(bubbleData);
    createBubbleChart(data);
  }
});

var width = 960,
    height = 960,
    maxRadius = 6,
    columnForColors = 'category',
    columnForRadius = 'views';

function createBubbleChart (data) {
  // d3.select('#bubble-chart')
  //   .selectAll('div')
  //   .data(data)
  //   .enter().append('div')
  //   .style('width', 200)
  //   .style('border', 'solid 1px blue')
  //   .text((d) => d.title)

    var svg = d3.select('#bubble-chart')
      // .selectAll('svg')
      // .data(bubbleData)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500)
      .attr('style', 'border: solid 1px red;')

      var circle = svg.selectAll('circle')
                      .data(bubbleData, function(d, i) { return d; });

      circle.enter().append('circle')
                    .attr('cy', function (d, i) { return 150 + (i * 25); })
                    .attr('cx', function (d, i) { return 150 + (i * 25); })
                    .attr('r', function(d, i) { return d.views / 100; })
                    .attr('text', function(d, i) {
                      // console.log(i);
                      return d.title;
                    })
                    .attr('fill', function(d, i) {
                      console.log(d[i]);
                      return 'rgb(0, 0, ' + (i * 20) + ')';
                    });
}
// ----
// var data = selection.enter().data();
//         var div = selection,
//             svg = div.selectAll('svg');
//         svg.attr('width', width).attr('height', height);

// var svg = d3.select('#bubbles')
//             .append('svg')
//             .attr('width', 200)
//             .attr('height', 200)
//             .attr('style', 'border: solid 1px red;')

// var circle = svg.selectAll('circle')
//                 .data(circleData, function(d) { return d; });

// circle.enter().append('circle')
//               .attr('cy', 50)
//               .attr('cx', 25)
//               .attr('r', 25);

              // .attr('cx', function(d, i) { return d; })
              // .attr('r', function(d) { return d / 5; });
