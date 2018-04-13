var size = 300;

var pack = d3.pack()
    .size([size, size])
    .padding(3);

var svg = d3.select('#bubble-chart').append('svg')
    .attr('width', size)
    .attr('height', size);

function type(d) {
  d.radius = +d.views / 10;
  return d;
}

d3.csv('data/medium_january.csv', type, (error, data) => {
  if (error) {
    console.error('Error getting or parsing the data.');
    throw error;
  } else {
    makeBubbleChart(data);
  }
});

function makeBubbleChart(data) {
  var posts = data;

  var root = d3.hierarchy({children: [{children: posts}]})
      .sum(d => d.radius * d.radius)
      .sort(function(a, b) {
        function comparator(a, b) {
          return b.value - a.value;
        }
      });

  pack(root);

  svg.selectAll('circle')
    .data(root.descendants().slice(1))
    .enter().append('circle')
      .attr('r', d => { return d.r; })
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('class', d => {
        return d.data.category ? d.data.category.toLowerCase().replace(/ /g, '-') : '';
      })

      .on('mouseover', d => {
        if (d.data.title) {
          svg.append('text')
          .attr('class', 'hover-text')
          .text(() => {
            // TODO add formatting here
            return `${(d.data.title.slice(0, 40)).trim()}...`;
          })
          .style('cursor', 'none')
          .style('fill', 'black')
          .attr('text-anchor', 'middle')
          .attr('dy', '90%')
          .attr('dx', '50%')
          .attr('font-size', '15px')
          .attr('height', '50px')
        }
      })

      .on('mouseout', d => {
        d3.select('.hover-text').remove();
      })

      .filter(d => d.data)
      .style('fill', d => {
        return !d.data.category ? gray : '';
      })
}
