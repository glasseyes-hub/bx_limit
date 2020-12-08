class Banner {
  start = 0;
  intervalTimeout = 3000;
  animationSpeed = 1500;

  constructor(element) {
    this.container = $(element);
    this.descriptions = this.container
      .find($(".banner-descriptions"))
      .children();
    this.images = this.container.find($(".banner-images")).children();
    this.points = this.container.find($(".banner-points"));

    this.init();
  }

  set position(position) {
    this._position = position >= this.bannersAmount ? 0 : position;
  }
  get position() {
    return this._position;
  }

  set nextPosition(position) {
    this._nextPosition = position >= this.bannersAmount ? 0 : position;
  }
  get nextPosition() {
    return this._nextPosition;
  }

  init() {
    this.descriptions.each((index, element) => $(element).hide());
    this.images.each((index, element) => $(element).hide());
    this.bannersAmount = this.images.length;
    this.nextPosition = this.start;
    this.position = this.nextPosition + 1;

    this.addPoints();
    this.addHandlers();
    this.switch();
    this.setInterval();
  }

  addPoints() {
    for (let index = 0; index < this.bannersAmount; index++) {
      const point = document.createElement("div");
      $(point).addClass("banner-point");

      this.points.append(point);
    }
  }

  addHandlers() {
    this.points.children().each((index, point) => {
      $(point).on("click", () => {
        this.nextPosition = index;

        clearInterval(this.interval);
        this.switch();
        this.setInterval();
      });
    });
  }

  setInterval() {
    this.interval = setInterval(() => this.switch(), this.intervalTimeout);
  }

  switch() {
    this.switchBanner();
    this.switchPoint();

    this.position = this.nextPosition;
    this.nextPosition++;
  }

  switchBanner() {
    this.hideBanner(this.position);
    this.showBanner(this.nextPosition);
  }

  switchPoint() {
    this.unselectPoint(this.position);
    this.selectPoint(this.nextPosition);
  }

  selectPoint(index) {
    this.points.children().eq(index).addClass("banner-point_selected");
  }

  unselectPoint(index) {
    this.points.children().eq(index).removeClass("banner-point_selected");
  }

  showBanner(index) {
    this.descriptions.eq(index).slideDown({ duration: this.animationSpeed });
    this.images.eq(index).fadeIn({ duration: this.animationSpeed });
  }

  hideBanner(index) {
    this.descriptions.eq(index).slideUp({ duration: this.animationSpeed / 2 });
    this.images.eq(index).fadeOut({ duration: this.animationSpeed / 2 });
  }
}

$(".banner").each((index, banner) => {
  new Banner(banner);
});

class Cart {
  animationSpeed = 300;

  constructor(container) {
    this.container = container;
    this.details = this.container.find($(".cart-details"));

    this.details.hide();

    this.container.hover(
      () => {
        this.container.addClass("cart_open");
        this.details.show(this.animationSpeed);
      },
      () => {
        this.container.removeClass("cart_open");
        this.details.hide(this.animationSpeed);
      }
    );
  }
}

new Cart($(".cart"));


class Position {
  constructor(container) {
    this.container = container;
    this.links = this.container.children();

    this.setSeparators();
  }

  setSeparators() {
    this.links.each((index, link) => {
      if (index < this.links.length - 1) {
        const separator = document.createElement("span");

        $(separator).addClass("position-separator").text("/").insertAfter(link);
      }
    });
  }
}

new Position($(".position"));

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

