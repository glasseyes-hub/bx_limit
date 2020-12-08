class Cart {
  animationSpeed = 300;
  isOpen = false;
  autoCloseSpeed = 1000;

  constructor(container) {
    this.container = container;
    this.details = this.container.find($(".cart-details"));

    this.details.hide();
    this.setHandler();
  }

  setHandler() {
    this.container.hover(
      () => {
        if (!this.isOpen) {
          this.container.addClass("cart_open");
          this.details.fadeIn(this.animationSpeed);
          this.isOpen = true;
        } else {
          clearTimeout(this.closeTimeout);
        }
      },
      () => {
        this.setCloseTimeout();
      }
    );
  }

  setCloseTimeout() {
    this.closeTimeout = setTimeout(() => {
      this.container.removeClass("cart_open");
      this.details.fadeOut(this.animationSpeed);
      this.isOpen = false;
    }, this.autoCloseSpeed);
  }
}

new Cart($(".cart"));
