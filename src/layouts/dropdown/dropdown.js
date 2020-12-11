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
