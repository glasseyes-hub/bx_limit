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
