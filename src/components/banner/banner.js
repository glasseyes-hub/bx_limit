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
