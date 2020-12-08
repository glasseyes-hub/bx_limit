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
