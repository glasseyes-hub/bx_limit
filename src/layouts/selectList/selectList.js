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
