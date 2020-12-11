const inputs = $(".priceFilter-input");
const updateInputs = (data) => {
  $(".priceFilter-input_from").val(data.from);
  $(".priceFilter-input_to").val(data.to);
};
const priceFilter = $(".priceFilter-slider")
  .ionRangeSlider({
    type: "double",
    min: 0,
    max: 20000,
    from: 0,
    to: 20000,
    grid: true,
    skin: "round",
    hide_min_max: true,
    onStart: updateInputs,
    onChange: updateInputs,
    onUpdate: updateInputs,
  })
  .data("ionRangeSlider");

Inputmask({ regex: "\\d*" }).mask(inputs);

inputs.on("input", (event) => {
  if (event.target.classList.contains("priceFilter-input_from")) {
    priceFilter.update({
      from: event.target.value,
    });
  } else {
    priceFilter.update({
      to: event.target.value,
    });
  }
});
