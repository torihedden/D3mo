document.getElementById('status-bar-button').addEventListener('click', runStatusBarDemo);

var statusWidth = window.innerWidth - 15;
var statusHeight = 50;
var statusSvg = d3.select('body')
  .append('svg')
  .attr('width', statusWidth)
  .attr('height', statusHeight)
  .classed('status-bar', true)
  .style('background-color', 'gray');

function runStatusBarDemo () {

  var disableButton = disableDemoButton();
  var statusData = [percentage];
  var percentage = spoofStatus(0);

  function disableDemoButton () {
    document.getElementById('status-bar-button').setAttribute('disabled', true);
  }

  function reenableDemoButton () {
    document.getElementById('status-bar-button').removeAttribute('disabled');
  }

  function spoofStatus (n) {
    setTimeout(function() {
      if (n < 100) {
        n += getRandomInt(20);
        createStatusBar(n);
        spoofStatus(n);
      } else {
        reenableDemoButton();
      }
    }, 1000);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function createStatusBar (percentage) {
    d3.select('.current-status').remove();
    statusSvg.selectAll('rect')
      .data(statusData)
      .enter()
      .append('rect')
      .classed('current-status', true)
      .attr('fill', 'lightgreen')
      .attr('height', statusHeight)
      .attr('width', ((percentage /  100) * statusWidth));
  }
}
