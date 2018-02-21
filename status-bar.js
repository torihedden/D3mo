document.getElementById('status-bar-button').addEventListener('click', runStatusBarDemo);

var statusWidth = window.innerWidth / 2;
var statusHeight = 50;
var statusSvg = d3.select('#svg-status-bar')
  .append('svg')
  .attr('width', statusWidth)
  .attr('height', statusHeight)
  .classed('status-bar', true)
  .style('background-color', 'lightgray');

function runStatusBarDemo () {

  var clearStatusMessage = toggleStatusMessage(0);
  var clearPreviousStatusBar = clearPreviousStatusBar();
  var disableButton = disableDemoButton();
  var statusData = [percentage];
  var percentage = spoofStatus(0);

  function toggleStatusMessage (n) {
    var div = document.getElementById('status-text');
    if (div.innerHTML && n < 100) {
      div.innerHTML = '';
    } else if (!div.innerHTML && n >= 100) {
      div.innerHTML = 'Done!';
    }
  }

  function disableDemoButton () {
    document.getElementById('status-bar-button').setAttribute('disabled', true);
  }

  function reenableDemoButton () {
    document.getElementById('status-bar-button').removeAttribute('disabled');
  }

  function clearPreviousStatusBar () {
    d3.select('.current-status').remove();
  }

  function spoofStatus (n) {
    setTimeout(function() {
      if (n < 100) {
        n += getRandomInt(25);
        createStatusBar(n);
        spoofStatus(n);
      } else {
        reenableDemoButton();
        toggleStatusMessage(n);
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
      .attr('fill', '#2FBF71')
      .attr('height', statusHeight)
      .attr('width', ((percentage /  100) * statusWidth));
  }
}
