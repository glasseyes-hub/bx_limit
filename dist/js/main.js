const inputs = $(".priceFilter-input");
const updateInputs = (data) => {
  $(".priceFilter-input_from").val(data.from);
  $(".priceFilter-input_to").val(data.to);
};
const priceFilter = $(".priceFilter-slider")
  .ionRangeSlider({
    type: "double",
    min: 0,
    max: 1000,
    from: 0,
    to: 1000,
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

class FilterItem {
  maxShowElements = 5;
  bodyHidden = false;
  listHidden = false;

  constructor(filter) {
    this.filter = $(filter);
    this.title = this.filter.find($(".filterItem-title"));
    this.body = this.filter.find($(".filterItem-body"));
    this.list = this.filter.find($(".filterItem-list"));
    this.button = this.filter.find($(".filterItem-showAll"));

    this.title.on("click", this.toggleBody);
    this.button.on("click", this.toggleList);

    this.prepareList();
  }

  toggleBody = () => {
    if (this.bodyHidden) this.body.show();
    else this.body.hide();

    this.bodyHidden = !this.bodyHidden;
  };

  toggleList = () => {
    if (this.listHidden) this.hideExcessElements();
    else this.showExcessElements();

    this.listHidden = !this.listHidden;
  };

  prepareList() {
    this.button.hide();

    if (this.list.children().length > this.maxShowElements) {
      this.hideExcessElements();
    }
  }

  hideExcessElements() {
    this.list.children().each((index, element) => {
      if (index >= this.maxShowElements) $(element).hide();
    });

    this.button.show();
    this.button.text("Показать все");
  }

  showExcessElements() {
    this.list.children().each((index, element) => {
      $(element).show();
    });

    this.button.text("Свернуть");
  }
}

$(".filterItem").each((index, element) => {
  const filter = new FilterItem(element);
});

