(function () {

var donutData = [
	{name: 'Complete', value: 25},
	{name: 'In progress', value: 32},
  {name: 'Blocked', value: 5},
	{name: 'Backlog', value: 38}
];

var colors = [green, blue, yellow, gray];

var text = '';

var width = 260;
var height = 260;
var thickness = 60;
var duration = 750;

var radius = Math.min(width, height) / 2;

function darkenColor(color, percent) {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

var svg = d3.select('#donut-chart')
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);

var g = svg.append('g')
           .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

var pie = d3.pie()
            .value(d => {
              return d.value;
            })
            .sort(null);

var path = g.selectAll('path')
            .data(pie(donutData))
            .enter()
            .append('g')
            .on('mouseover', function(d) {
              let g = d3.select(this)
                .style("cursor", "pointer")
                .style("fill", "black")
                .append("g")
                .attr("class", "text-group");

              g.append("text")
                .attr("class", "name-text")
                .text(`${d.data.name}`)
                .attr('text-anchor', 'middle')
                .attr('dy', '-1.2em');

              g.append("text")
                .attr("class", "value-text")
                .text(`${d.data.value}%`)
                .attr('text-anchor', 'middle')
                .attr('dy', '.6em');
              })
            .on("mouseout", function(d, i) {
              d3.select(this)
                .select(".text-group").remove();
              })
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => colors[i])
						.attr('class', 'donut-chart-segment')
            .on("mouseover", function(d, i) {
              d3.select(this)
                .style("cursor", "pointer")
                .style("fill", darkenColor(colors[i], -0.3));
              })
            .on("mouseout", function(d, i) {
              d3.select(this)
                .style("fill", colors[i]);
              })
            .each(function(d, i) { this._current = i; });


g.append('text')
  .attr('text-anchor', 'middle')
  .attr('dy', '.35em')
  .text(text);

} ())
