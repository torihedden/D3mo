var size = 300;

var pack = d3.pack()
    .size([size, size])
    .padding(3);

var svg = d3.select("#bubble-chart").append("svg")
    .attr("width", size)
    .attr("height", size);

d3.csv("data/medium_january.csv", type, (error, data) => {
  var posts = data;

  var root = d3.hierarchy({children: [{children: posts}]})
      .sum(d => d.radius * d.radius)
      .sort(function(a, b) {
        function comparator(a, b) {
          return b.value - a.value;
        }
      });

  pack(root);

  svg.selectAll("circle")
    .data(root.descendants().slice(1))
    .enter().append("circle")
      .attr("r", d => { return d.r; })
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("class", d => {
        return d.data.category ? d.data.category.toLowerCase().replace(/ /g, '-') : '';
      })
      .filter(d => d.data)
      .style("fill", d => {
        return !d.data.category ? gray : '';
      })
      .append("title")
      .text(d => {
        return !d.data.title && !d.data.views ? '' : `"${d.data.title}"\nviews: ${d.data.views}`;
      });
});

function type(d) {
  d.radius = +d.views / 10;
  return d;
}
