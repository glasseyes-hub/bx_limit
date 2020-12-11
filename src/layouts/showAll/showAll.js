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
