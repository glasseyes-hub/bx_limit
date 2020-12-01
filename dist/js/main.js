import "./jquery-3.5.1.min.js";
import "../assets/ion-rangeslider-2.3.1/js/ion.rangeSlider.min.js";

$(".js-slider").ionRangeSlider({
  type: "double",
  min: 0,
  max: 1000,
  from: 0,
  to: 1000,
  grid: true,
  skin: "round",
  hide_min_max: true,
  extra_classes: "js-slider_limit",
});
console.log();
