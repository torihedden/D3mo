var value = null;
var initialSliderValue = 25;

var sliderStatusData = [
  {name : 'full', value : initialSliderValue, color : blue},
  {name : 'empty', value : 100 - initialSliderValue, color : gray}
];

setSliderValue(initialSliderValue);
buildDonutChart(sliderStatusData, initialSliderValue);

$('#slider').slider({
  slide : function(event, ui) {
    setSliderValue(ui.value);
    sliderStatusData[0].value = ui.value;
    sliderStatusData[1].value = 100 - ui.value;
    buildDonutChart(sliderStatusData, ui.value);
  },
  value : initialSliderValue
});

function setSliderValue(val) {
  $('#slider-value').html(`${val}%`);
  return val;
};

function buildDonutChart(sliderDonutData, val) {

  d3.select('.slider-pie').remove();

  var width = 260;
  var height = 260;
  var thickness = 60;
  var duration = 750;

  var radius = Math.min(width, height) / 2;

  var svg = d3.select('#slider-donut-chart')
              .append('svg')
              .attr('class', 'slider-pie')
              .attr('width', width)
              .attr('height', height);

  var g = svg.append('g')
             .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  var arc = d3.arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius);

  var pie = d3.pie()
              .value(d => d.value)
              .sort(null);

  var path = g.selectAll('path')
              .data(pie(sliderStatusData))
              .enter()
              .append('g')
              .append('path')
              .attr('d', arc)
              .attr('fill', d => d.data.color)
  						.attr('class', d => { return 'slider-segment-' + d.data.name })
              // I don't know what this line is for and I don't know why it made it's way into here
              // I don't seem to need it
              // .each(function(d, i) { this._current = i; });

  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
}
