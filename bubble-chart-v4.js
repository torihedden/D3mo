var color = d3.scaleQuantize()
    .range(["#156b87", "#876315", "#543510", "#872815"]);

var size = 500;

var pack = d3.pack()
    .size([size, size])
    .padding(5);

var svg = d3.select("#bubble-chart").append("svg")
    .attr("width", size)
    .attr("height", size);

d3.csv("data/medium_january.csv", type, (error, data) => {
  var posts = data;
  console.log(posts);
  // var planets = data.filter(function(d) { return d.distance === 0; }),
  //     exoplanets = data.filter(function(d) { return d.distance !== 0; });

  // color.domain(d3.extent(data, function(d) { return d.radius; }));
  color.domain(d3.extent(data, d => d.views));

  var root = d3.hierarchy({children: [{children: posts}]})
      .sum(d => d.radius * d.radius)
      .sort(function(a, b) {
        // return !a.children - !b.children
        //     || isNaN(a.data.distance) - isNaN(b.data.distance)
        //     || a.data.distance - b.data.distance;
        function comparator(a, b) {
          return b.value - a.value;
        }
      });

  pack(root);

  svg.selectAll("circle")
    .data(root.descendants().slice(1))
    .enter().append("circle")
      // .attr("r", function(d) { return d.r; })
      // .attr("cx", function(d) { return d.x; })
      // .attr("cy", function(d) { return d.y; })
      .attr("r", (d) => { return d.data.views / 100; })
      .attr("cx", function(d, i) { return 50; })
      .attr("cy", function(d, i) { return 50; })
      .classed("group", function(d) { return d.children; })
    .filter(function(d) { return d.data; })
      .style("fill", function(d) { return color(d.data.radius); })
    .append("title")
      .text(d => {
        return d.data.title + "\nviews: " + d.data.views;
      });
});

function type(d) {
  d.radius = +d.radius;
  d.distance = d.distance ? +d.distance : NaN;
  return d;
}
