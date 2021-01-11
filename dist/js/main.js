class Banner {
  start = 0;
  intervalTimeout = 7000;
  animationSpeed = 2000;

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
  isOpen = false;
  autoCloseSpeed = 1000;

  constructor(container) {
    this.container = container;
    this.header = this.container.find($(".cart-info"));
    this.detail = this.container.find($(".cart-detail"));

    this.detail.hide();
    this.setHandler();
  }

  setHandler() {
    this.container.hover(
      () => {
        if (!this.isOpen) this.open();
        else clearTimeout(this.closeTimeout);
      },
      () => this.close()
    );
  }

  open() {
    this.container.addClass("cart_open");
    this.header
      .fadeOut(this.animationSpeed)
      .find($(".cart-itemsAmount"))
      .fadeOut(this.animationSpeed);
    this.detail.fadeIn(this.animationSpeed);
    this.isOpen = true;
  }

  close() {
    this.closeTimeout = setTimeout(() => {
      this.container.removeClass("cart_open");
      this.header
        .fadeIn(this.animationSpeed)
        .find($(".cart-itemsAmount"))
        .fadeIn(this.animationSpeed);
      this.detail.fadeOut(this.animationSpeed);
      this.isOpen = false;
    }, this.autoCloseSpeed);
  }
}

new Cart($(".cart"));

class ItemFilter {
  constructor(container) {
    this.container = container;

    this.addHandlers();
  }

  addHandlers() {
    this.container.on("click", () => {
      this.container.toggleClass("itemFilter_selected");
    });
  }
}

$(".itemFilter").each((i, filter) => {
  new ItemFilter($(filter));
});


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

$(function () {
  const doorSize = new DoorSize($(".doorSize"));

  doorSize.select(0);
});

class DoorSize {
  radioBlocks = [];

  constructor(container) {
    this.container = container;

    container.find(".doorSize-radio").each((index, el) => {
      const radioBlock = new RadioBlock($(el));
      radioBlock.onSelect(this.unselectAll);

      this.radioBlocks.push(radioBlock);
    });
  }

  select(index) {
    this.radioBlocks[index].select();
  }

  unselectAll = (currentRadioBlock) => {
    this.radioBlocks.forEach((radioBlock) => {
      if (radioBlock.isSelected() && currentRadioBlock != radioBlock)
        radioBlock.unselect();
    });
  };
}

class RadioBlock {
  SELECTED_TEXT = "Выбрано";
  UNSELECTED_TEXT = "Выбрать";
  listeners = [];
  selected = false;

  constructor(container) {
    this.container = container;
    this.icon = this.container.find(".doorSize-radio-icon");
    this.content = this.container.find(".doorSize-radio-content");
    this.button = this.container.find(".doorSize-radio-button");

    this.addHandlers();
  }

  addHandlers() {
    $(this.button).on("click", (event) => {
      if (!this.selected) this.select();
    });

    $(this.content).on("click", (event) => {
      if (!this.selected) this.select();
    });
  }

  isSelected() {
    return this.selected;
  }

  select() {
    this.container.addClass("doorSize-radio_selected");
    this.button.text(this.SELECTED_TEXT);

    this.selected = true;

    this.listeners.forEach((callback) => callback(this));
  }

  unselect() {
    this.container.removeClass("doorSize-radio_selected");
    this.button.text(this.UNSELECTED_TEXT);

    this.selected = false;
  }

  onSelect(callback) {
    this.listeners.push(callback);
  }
}

class Dropdown {
  constructor(container) {
    this.container = container;
    this.header = this.container.find($(".dropdown-header"));
    this.body = this.container.find($(".dropdown-body"));

    this.addHandlers();
  }

  addHandlers() {
    this.header.on("click", (event) => {
      this.body.slideToggle();
      this.container.toggleClass("dropdown_open");
    });
  }
}

$(function () {
  $(".dropdown").each((index, dropdown) => {
    new Dropdown($(dropdown));
  });
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

$(function () {
  const selectList = new SelectList($(".selectList"));

  selectList.select(0);
});

class SelectList {
  multiSelect = false;

  constructor(container) {
    this.container = container;
    this.items = this.container.find(".selectList-item");

    this.addHandlers();
  }

  addHandlers() {
    this.items.each((index, item) => {
      $(item).on("click", (event) => {
        if ($(item).hasClass("selectList-item_selected")) this.unselect(index);
        else this.select(index);
      });
    });
  }

  select(index) {
    if (!this.multiSelect) this.unselectAll();

    $(this.items[index]).addClass("selectList-item_selected");
  }

  unselect(index) {
    $(this.items[index]).removeClass("selectList-item_selected");
  }

  unselectAll() {
    this.items.each((index, item) => {
      this.unselect(index);
    });
  }
}

class ShowAll {
  isShowed = false;
  hideHeight = "150px";
  openHeight = null;

  constructor(container) {
    this.container = container;
    this.body = this.container.find($(".showAll-body"));
    this.button = this.container.find($(".showAll-button"));
    this.openHeight = this.body.height();

    this.addHandlers();
    this.hide();
  }

  addHandlers() {
    this.button.on("click", () => {
      if (this.isShowed) this.hide();
      else this.show();
    });
  }

  hide() {
    this.body.animate({ height: this.hideHeight });
    this.button.text("Показать все");
    this.isShowed = false;
  }

  show() {
    this.body.animate({ height: this.openHeight });
    this.button.text("Свернуть");
    this.isShowed = true;
  }
}

$(function () {
  $(".showAll").each((index, showAll) => {
    new ShowAll($(showAll));
  });
});

