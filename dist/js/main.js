class Banner {
  position = 0;
  intervalTimeout = 3000;
  animationSpeed = 1500;

  constructor(element) {
    this.container = $(element);
    this.info = this.container.find($(".banner-info"));
    this.images = this.container.find($(".banner-img"));
    this.points = this.container.find($(".banner-points"));
    this.bannersAmount = this.images.length;

    this.init();
  }

  init() {
    this.info.each((index, element) => $(element).hide());
    this.images.each((index, element) => $(element).hide());
    this.addPoints();

    this.swap();
    this.setInterval();
  }

  setInterval() {
    this.interval = setInterval(() => this.swap(), this.intervalTimeout);
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  swap() {
    if (this.position === this.bannersAmount) this.position = 0;

    this.unselectData(this.position - 1);
    this.selectData(this.position);
    this.selectPoint(this.position);

    this.position++;
  }

  handlers() {
    this.points.each((index, point) => {
      $(point).on("click", () => {
        this.position = index;

        this.clearInterval();
        this.swap();
        this.setInterval();
      });
    });
  }

  addPoints() {
    for (let index = 0; index < this.bannersAmount; index++) {
      const point = document.createElement("div");
      $(point).addClass("banner-point");

      if (index === 0) $(point).addClass("banner-point_selected");

      this.points.append(point);
    }
  }

  selectPoint(index) {
    this.points.children().each((i, point) => {
      if (index === i) $(point).addClass("banner-point_selected");
      else $(point).removeClass("banner-point_selected");
    });
  }

  unselectData(index) {
    index = index < 0 ? this.bannersAmount - 1 : index;

    $(this.info[index]).slideUp({ duration: this.animationSpeed / 2 });
    $(this.images[index]).fadeOut({ duration: this.animationSpeed / 2 });
  }

  selectData(index) {
    $(this.info[index]).slideDown({ duration: this.animationSpeed });
    $(this.images[index]).fadeIn({ duration: this.animationSpeed });
  }
}

$(".banner").each((index, banner) => {
  new Banner(banner);
});


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

