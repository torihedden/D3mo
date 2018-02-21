var value = null;

$("#slider").slider({
  slide: function(event,ui) {
    setSliderValue(ui.value);
  }
});

function setSliderValue (val) {
  $("#slider-value").html(val);
  return val;
};
