var statusData = [percentage];
var percentage = spoofStatus(0);
var statusWidth = window.innerWidth - 15;
var statusHeight = 50;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function spoofStatus (n) {
  setTimeout(function() {
    if (n < 100) {
      // adding randomization to look even more like a loading status bar
      n += getRandomInt(20);
      createStatusBar(n);
      spoofStatus(n);
    }
  }, 1000);
}

var statusSvg = d3.select('body')
  .append('svg')
  .attr('width', statusWidth)
  .attr('height', statusHeight)
  .classed('status-bar', true)
  .style('background-color', 'gray')

function createStatusBar (percentage) {

  // This line here is the secret sauce. You must destroy the old SVG and create a new one in order to see the updated status
  d3.select('.current-status').remove();

  statusSvg.selectAll('rect')
    .data(statusData)
    .enter()
    .append('rect')
    .classed('current-status', true)
    .attr('fill', 'lightgreen')
    .attr('height', statusHeight)
    .attr('width', ((percentage /  100) * statusWidth))
}

statusSvg.selectAll('text')
  .data(statusData)
  .enter()
  .append('text')
  .text(function(d) {
    return 'current status: ' + d + '%';
  })
  .attr('x', 20)
  .attr('y', 20)
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red")
  

  var rectDataset = [ 20, 10, 5, 15, 20, 30, 20, 15, 5, 45, 20, 25, 5, 45, 20, 25 ];
  var rectSvgWidth = 600;
  var rectSvgHeight = 250;
  var barPadding = 5;

  // "With D3, you always have to first select whatever it is you’re about to act on,
  // even if that selection is momentarily empty."

  var rectSvg = d3.select('body')
    .append('svg')
    .attr('width', rectSvgWidth)
    .attr('height', rectSvgHeight)
    .classed('rectangle', true);

  rectSvg.selectAll('rect')
    .data(rectDataset)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return i * (rectSvgWidth / rectDataset.length);
    })
    .attr('y', function(d) {
      return rectSvgHeight - (d * 5);  //Height minus data value
    })
    .attr('width', rectSvgWidth / rectDataset.length - barPadding)
    .attr('height', function(d) {
      return d * 5;
    })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + (d * 10) + ")";
    });

    rectSvg.selectAll("text")
      .data(rectDataset)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })

      .attr("x", function(d, i) {
          return i * (rectSvgWidth / rectDataset.length) + 10;
      })
      .attr("y", rectSvgHeight - 5)
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")

var dataset = [ 25, 27, 5, 6, 11 ];

// D3's chain syntax

d3.select('body').selectAll('p')
  .data(dataset)
  .enter()
  .append('p')
  .text(function(d) { return d; })
  .style('color', function(d) {
    if (d >= 15) {
      return 'red';
    } else {
      return 'black';
    }
  })
  .classed('bar', true)
  .style('height', function(d) {
    return d * 5 + 'px';
});

var circleDataset = [ 20, 10, 15, 20, 25 ];
var svgWidth = 500;
var svgHeight = 50;

var svg = d3.select('body')
	.append('svg')
	.attr('width', 500)
	.attr('height', 100)

var circles = svg.selectAll('circle')
  .data(circleDataset)
  .enter()
  .append('circle');

circles.attr('cx', function(d, i) {
		return (i * 50) + 25;
	})
  .attr('cy', svgHeight/2)
  .attr('r', function(d) {
    return d;
  })

  .attr('fill', 'yellow')
  .attr('stroke', 'orange')
  .attr('stroke-width', function(d) {
    return d/2;
  });

var scatterDataset = [
                [ 5,     20 ],
                [ 480,   90 ],
                [ 250,   50 ],
                [ 100,   33 ],
                [ 330,   95 ],
                [ 410,   12 ],
                [ 475,   44 ],
                [ 25,    67 ],
                [ 85,    21 ],
                [ 220,   88 ]
             ];

var scatterWidth = 600;
var scatterHeight = 100;
var scatterSvg = d3.select("body")
  .append("svg")
  .attr("width", scatterWidth)
  .attr("height", scatterHeight)

scatterSvg.selectAll("circle")
   .data(scatterDataset)
   .enter()
   .append("circle")

   .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d) {
      return d[1];
    })
    .attr("r", function(d) {
      return Math.sqrt(scatterHeight - d[1]);
    });

scatterSvg.selectAll("text")
  .data(scatterDataset)
  .enter()
  .append("text")
  .text(function(d) {
        return d[0] + ", " + d[1];
   })
  .attr("x", function(d) {
    return d[0] + 5;
  })
  .attr("y", function(d) {
    return d[1];
  })

  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red");
