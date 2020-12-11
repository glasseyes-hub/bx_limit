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
