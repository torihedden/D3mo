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
