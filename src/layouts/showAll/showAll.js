class ShowAll {
  isShowed = false;
  constructor(container) {
    this.container = container;
    this.body = this.container.find($(".showAll-body"));
    this.button = this.container.find($(".showAll-button"));

    this.addHandlers();
  }

  addHandlers() {
    this.button.on("click", () => {
      if (this.isShowed) this.hide();
      else this.show();
    });
  }

  hide() {
    this.body.animate({ height: "150px" });
    this.isShowed = false;
  }

  show() {
    this.body.animate({ height: "auto" });
    this.isShowed = true;
  }
}

$(function () {
  $(".showAll").each((index, showAll) => {
    new ShowAll($(showAll));
  });
});
