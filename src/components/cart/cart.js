class Cart {
  animationSpeed = 300;
  isOpen = false;
  autoCloseSpeed = 1000;

  constructor(container) {
    this.container = container;
    this.header = this.container.find($(".cart-info"));
    this.details = this.container.find($(".cart-details"));

    // this.details.hide();
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
    this.header.fadeOut(this.animationSpeed);
    this.details.fadeIn(this.animationSpeed);
    this.isOpen = true;
  }

  close() {
    this.closeTimeout = setTimeout(() => {
      this.container.removeClass("cart_open");
      this.header.fadeIn(this.animationSpeed);
      this.details.fadeOut(this.animationSpeed);
      this.isOpen = false;
    }, this.autoCloseSpeed);
  }
}

new Cart($(".cart"));
