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
