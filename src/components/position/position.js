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
